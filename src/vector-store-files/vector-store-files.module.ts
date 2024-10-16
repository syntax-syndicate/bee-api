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
  createVectorStoreFile,
  deleteVectorStoreFile,
  listVectorStoreFiles,
  readVectorStoreFile
} from './vector-store-files.service.js';

import {
  VectorStoreFileCreateBody,
  vectorStoreFileCreateBodySchema,
  VectorStoreFileCreateParams,
  vectorStoreFileCreateParamsSchema,
  vectorStoreFileCreateResponseSchema
} from '@/vector-store-files/dtos/vector-store-file-create.js';
import {
  VectorStoreFilesListParams,
  vectorStoreFilesListParamsSchema,
  VectorStoreFilesListQuery,
  vectorStoreFilesListQuerySchema,
  vectorStoreFilesListResponseSchema
} from '@/vector-store-files/dtos/vector-store-file-list.js';
import {
  VectorStoreFileReadParams,
  vectorStoreFileReadParamsSchema,
  vectorStoreFileReadResponseSchema
} from '@/vector-store-files/dtos/vector-store-file-read.js';
import {
  VectorStoreFileDeleteParams,
  vectorStoreFileDeleteParamsSchema
} from '@/vector-store-files/dtos/vector-store-file-delete.js';
import { Tag } from '@/swagger.js';
import { createDeleteSchema } from '@/schema.js';

export const vectorStoreFilesModule: FastifyPluginAsyncJsonSchemaToTs = async (app) => {
  app.post<{ Body: VectorStoreFileCreateBody; Params: VectorStoreFileCreateParams }>(
    '/vector_stores/:vector_store_id/files',
    {
      preHandler: app.auth(),
      schema: {
        body: vectorStoreFileCreateBodySchema,
        params: vectorStoreFileCreateParamsSchema,
        response: {
          [StatusCodes.OK]: vectorStoreFileCreateResponseSchema
        },
        tags: [Tag.OPENAI_ASSISTANTS_API]
      }
    },
    async (req) => createVectorStoreFile({ ...req.params, ...req.body })
  );

  app.get<{ Querystring: VectorStoreFilesListQuery; Params: VectorStoreFilesListParams }>(
    '/vector_stores/:vector_store_id/files',
    {
      preHandler: app.auth(),
      schema: {
        querystring: vectorStoreFilesListQuerySchema,
        params: vectorStoreFilesListParamsSchema,
        response: {
          [StatusCodes.OK]: vectorStoreFilesListResponseSchema
        },
        tags: [Tag.OPENAI_ASSISTANTS_API]
      }
    },
    async (req) => listVectorStoreFiles({ ...req.params, ...req.query })
  );

  app.get<{ Params: VectorStoreFileReadParams }>(
    '/vector_stores/:vector_store_id/files/:file_id',
    {
      preHandler: app.auth(),
      schema: {
        params: vectorStoreFileReadParamsSchema,
        response: {
          [StatusCodes.OK]: vectorStoreFileReadResponseSchema
        },
        tags: [Tag.OPENAI_ASSISTANTS_API]
      }
    },
    async (req) => readVectorStoreFile(req.params)
  );

  app.delete<{ Params: VectorStoreFileDeleteParams }>(
    '/vector_stores/:vector_store_id/files/:file_id',
    {
      preHandler: app.auth(),
      schema: {
        params: vectorStoreFileDeleteParamsSchema,
        response: {
          [StatusCodes.OK]: createDeleteSchema('vector_store')
        },
        tags: [Tag.OPENAI_ASSISTANTS_API]
      }
    },
    async (req) => deleteVectorStoreFile(req.params)
  );
};
