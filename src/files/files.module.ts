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

import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { StatusCodes } from 'http-status-codes';

import {
  FileCreateBody,
  FileCreateResponseSchema,
  fileCreateBodySchema
} from './dtos/file-create.js';
import { FileReadParams, fileReadParamsSchema, fileReadResponseSchema } from './dtos/file-read.js';
import {
  FilesListQuery,
  filesListQuerySchema,
  filesListResponseSchema
} from './dtos/files-list.js';
import { FileDeleteParams, fileDeleteParamsSchema } from './dtos/file-delete.js';
import {
  FileContentReadParams,
  fileContentReadParamsSchema,
  fileContentReadResponseSchema
} from './dtos/file-content-read.js';
import { createFile, deleteFile, listFiles, readFile, readFileContent } from './files.service.js';

import { Tag } from '@/swagger.js';
import { createDeleteSchema } from '@/schema.js';

export const filesModule: FastifyPluginAsyncJsonSchemaToTs = async (app) => {
  app.post<{ Body: FileCreateBody }>(
    '/files',
    {
      schema: {
        consumes: ['multipart/form-data'],
        body: fileCreateBodySchema,
        response: { [StatusCodes.OK]: FileCreateResponseSchema },
        tags: [Tag.OPENAI_API]
      },
      preHandler: app.auth()
    },
    async (req) => {
      return createFile(req.body);
    }
  );

  app.get<{ Params: FileReadParams }>(
    '/files/:file_id',
    {
      schema: {
        params: fileReadParamsSchema,
        response: { [StatusCodes.OK]: fileReadResponseSchema },
        tags: [Tag.OPENAI_API]
      },
      preHandler: app.auth()
    },
    async (req) => {
      return readFile(req.params);
    }
  );

  app.delete<{ Params: FileDeleteParams }>(
    '/files/:file_id',
    {
      schema: {
        params: fileDeleteParamsSchema,
        response: { [StatusCodes.OK]: createDeleteSchema('file') },
        tags: [Tag.OPENAI_API]
      },
      preHandler: app.auth()
    },
    async (req) => deleteFile(req.params)
  );

  app.get<{ Querystring: FilesListQuery }>(
    '/files',
    {
      schema: {
        querystring: filesListQuerySchema,
        response: { [StatusCodes.OK]: filesListResponseSchema },
        tags: [Tag.OPENAI_API]
      },
      preHandler: app.auth()
    },
    async (req) => {
      return listFiles(req.query);
    }
  );

  app.get<{ Params: FileContentReadParams }>(
    '/files/:file_id/content',
    {
      schema: {
        params: fileContentReadParamsSchema,
        response: {
          [StatusCodes.OK]: { 'application/octet-stream': fileContentReadResponseSchema }
        },
        tags: [Tag.OPENAI_API]
      },
      preHandler: app.auth()
    },
    async (req) => {
      return readFileContent(req.params);
    }
  );
};
