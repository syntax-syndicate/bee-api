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

import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import multipart from '@fastify/multipart';

export const multipartPlugin: FastifyPluginAsync = fp.fastifyPlugin(async (app) => {
  app.register(multipart, {
    limits: {
      fieldNameSize: 1024, // Max field name size in bytes
      fieldSize: 1024, // Max field value size in bytes
      fields: 10, // Max number of non-file fields
      fileSize: Infinity, // For multipart forms, the max file size in bytes
      files: 1, // Max number of file fields
      headerPairs: 2000 // Max number of header key=>value pairs
    }
  });
  app.addHook('preValidation', async (req) => {
    if (!req.isMultipart()) {
      return;
    }
    const data = await req.file();
    if (!data) return;

    // Modification of https://github.com/fastify/fastify-multipart/blob/469b3e56dd5dad529973c8a3c845e19772630bfe/index.js#L92
    req.body = data.fields;
    const body = {} as Record<string, unknown>;
    const reqBodyKeys = Object.keys(req.body as any);
    for (let i = 0; i < reqBodyKeys.length; ++i) {
      const key = reqBodyKeys[i];
      const field = (req.body as any)[key];

      if (field.value !== undefined) {
        body[key] = field.value;
      } else if (field.type === 'file') {
        body[key] = field;
      }
    }
    req.body = body;
  });
});
