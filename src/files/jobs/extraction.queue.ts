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

import { randomUUID } from 'node:crypto';

import { Job } from 'bullmq';
import { RequestContext } from '@mikro-orm/core';

import { File } from '../entities/file.entity.js';
import { s3Client } from '../files.service.js';
import { Extraction } from '../entities/extraction.entity.js';
import { extract } from '../extraction/extract.js';

import { ORM } from '@/database.js';
import { createQueue } from '@/jobs/bullmq.js';
import { QueueName } from '@/jobs/constants.js';
import { S3_BUCKET_FILE_STORAGE } from '@/config.js';

async function jobHandler(job: Job<{ fileId: string }>) {
  return RequestContext.create(ORM.em, async () => {
    const file = await ORM.em.getRepository(File).findOneOrFail(
      { id: job.data.fileId },
      {
        filters: { deleted: false }
      }
    );

    const extraction = await extract(
      file.filename,
      s3Client
        .getObject({
          Bucket: S3_BUCKET_FILE_STORAGE,
          Key: file.storageId
        })
        .createReadStream()
    );
    const extractionObject = await s3Client
      .upload({
        Bucket: S3_BUCKET_FILE_STORAGE,
        Key: randomUUID(),
        Body: extraction
      })
      .promise();
    file.extraction = new Extraction({ jobId: job.id, storageId: extractionObject.Key });

    await ORM.em.flush();
  });
}

export const { queue, worker } = createQueue({
  name: QueueName.FILES_EXTRACTION,
  jobHandler,
  jobsOptions: { attempts: 5 },
  workerOptions: {
    concurrency: 100
  }
});
