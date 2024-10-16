/**
 * Copyright 2024 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { randomUUID, UUID } from 'node:crypto';
import { pipeline } from 'node:stream/promises';
import path from 'node:path';
import fs from 'node:fs';

import {
  PythonDownloadFile,
  PythonFile,
  PythonStorage,
  PythonUploadFile
} from 'bee-agent-framework/tools/python/storage';
import { Loaded } from '@mikro-orm/mongodb';

import { LoadedRun } from '../types.js';

import { File, FilePurpose } from '@/files/entities/file.entity.js';
import { ORM } from '@/database.js';
import { s3Client } from '@/files/files.service.js';
import {
  BEE_CODE_INTERPRETER_BUCKET_FILE_STORAGE,
  BEE_CODE_INTERPRETER_FILE_STORAGE_PATH,
  BEE_CODE_INTERPRETER_STORAGE_BACKEND,
  S3_BUCKET_FILE_STORAGE
} from '@/config.js';
import { CodeInterpreterResource } from '@/tools/entities/tool-resources/code-interpreter-resource.entity.js';
import { CodeInterpreterStorageBackend } from '@/runs/execution/constants';

async function ensureFiles(
  run: LoadedRun,
  files: { file: PythonDownloadFile; storageId: UUID }[]
): Promise<PythonFile[]> {
  const newFiles = await Promise.all(
    files.map(async ({ file, storageId }) => {
      const { ContentLength } = await s3Client
        .headObject({ Bucket: S3_BUCKET_FILE_STORAGE, Key: storageId })
        .promise();
      if (!ContentLength) throw new Error(`Missing content length of file ${storageId}`);

      return new File({
        project: run.project,
        createdBy: run.createdBy,
        filename: file.filename,
        dependsOn: run.thread,
        storageId,
        bytes: ContentLength,
        purpose: FilePurpose.ASSISTANTS_OUTPUT,
        contentHash: file.pythonId
      });
    })
  );

  if (newFiles.length > 0) {
    ORM.em.persist(newFiles);
    const thread = await run.thread.loadOrFail({ populate: ['toolResources'] });
    if (!thread.toolResources) {
      thread.toolResources = [];
    }
    thread.toolResources.push(new CodeInterpreterResource({ files: newFiles }));
    await ORM.em.flush();
  }

  return newFiles.map((file) => ({
    id: file.id,
    pythonId: file.contentHash,
    filename: file.filename
  }));
}

export class S3Storage extends PythonStorage {
  constructor(
    public readonly files: Loaded<File>[],
    public readonly run: LoadedRun | null
  ) {
    super();
  }

  get codeInterpreterBucket() {
    if (!BEE_CODE_INTERPRETER_BUCKET_FILE_STORAGE) throw new Error('Missing bucket');
    return BEE_CODE_INTERPRETER_BUCKET_FILE_STORAGE;
  }

  createSnapshot(): unknown {
    return { files: this.files, run: this.run };
  }
  loadSnapshot(snapshot: ReturnType<this['createSnapshot']>): void {
    Object.assign(this, snapshot);
  }

  async list(): Promise<PythonFile[]> {
    return this.files.map((file) => ({
      id: file.id,
      pythonId: file.contentHash,
      filename: file.filename
    }));
  }
  async upload(files: PythonUploadFile[]): Promise<PythonFile[]> {
    const uloadedFiles = await Promise.all(
      files.map(async (file) => {
        const dbFile = this.files.find((dbFile) => dbFile.id === file.id);
        if (!dbFile) throw new Error('Missing file');
        await s3Client
          .copyObject({
            CopySource: `/${S3_BUCKET_FILE_STORAGE}/${dbFile.storageId}`,
            Bucket: this.codeInterpreterBucket,
            Key: dbFile.contentHash
          })
          .promise();

        return dbFile;
      })
    );

    return uloadedFiles.map((file) => ({
      id: file.id,
      pythonId: file.contentHash,
      filename: file.filename
    }));
  }
  async download(files: PythonDownloadFile[]): Promise<PythonFile[]> {
    const run = this.run;
    if (!run) {
      throw new Error(`Missing run.`);
    }
    const newFiles = await Promise.all(
      files.map(async (file) => {
        const storageId = randomUUID();
        await s3Client
          .copyObject({
            CopySource: `/${this.codeInterpreterBucket}/${file.pythonId}`,
            Bucket: S3_BUCKET_FILE_STORAGE,
            Key: storageId
          })
          .promise();
        return { file, storageId };
      })
    );
    return await ensureFiles(run, newFiles);
  }
}

export class FileSystemStorage extends PythonStorage {
  constructor(
    public readonly files: Loaded<File>[],
    public readonly run: LoadedRun | null
  ) {
    super();
  }

  get codeInterpreterDir() {
    if (!BEE_CODE_INTERPRETER_FILE_STORAGE_PATH) throw new Error('Missing directory');
    return BEE_CODE_INTERPRETER_FILE_STORAGE_PATH;
  }

  createSnapshot(): unknown {
    return { files: this.files, run: this.run };
  }

  loadSnapshot(snapshot: ReturnType<this['createSnapshot']>): void {
    Object.assign(this, snapshot);
  }

  async list(): Promise<PythonFile[]> {
    return this.files.map((file) => ({
      id: file.id,
      pythonId: file.contentHash,
      filename: file.filename
    }));
  }

  async upload(files: PythonUploadFile[]): Promise<PythonFile[]> {
    return await Promise.all(
      files.map(async (file) => {
        const dbFile = this.files.find((dbFile) => dbFile.id === file.id);
        if (!dbFile) throw new Error('Missing file');
        const getObjectRequest = { Bucket: S3_BUCKET_FILE_STORAGE, Key: dbFile.storageId };
        const readStream = s3Client.getObject(getObjectRequest).createReadStream();
        const writeStream = fs.createWriteStream(
          path.join(this.codeInterpreterDir, dbFile.contentHash)
        );
        await pipeline(readStream, writeStream);
        return { id: dbFile.id, pythonId: dbFile.contentHash, filename: dbFile.filename };
      })
    );
  }

  async download(files: PythonDownloadFile[]): Promise<PythonFile[]> {
    const run = this.run;
    if (!run) {
      throw new Error(`Missing run.`);
    }
    const newFiles = await Promise.all(
      files.map(async (file) => {
        const storageId = randomUUID();
        const readStream = fs.createReadStream(path.join(this.codeInterpreterDir, file.pythonId));
        await s3Client
          .upload({
            Body: readStream,
            Bucket: S3_BUCKET_FILE_STORAGE,
            Key: storageId
          })
          .promise();
        return { file, storageId };
      })
    );
    return await ensureFiles(run, newFiles);
  }
}

export function createPythonStorage(
  files: Loaded<File>[],
  run: LoadedRun | null,
  backend = BEE_CODE_INTERPRETER_STORAGE_BACKEND
) {
  switch (backend) {
    case CodeInterpreterStorageBackend.S3:
      return new S3Storage(files, run);
    case CodeInterpreterStorageBackend.FILESYSTEM:
      return new FileSystemStorage(files, run);
  }
}
