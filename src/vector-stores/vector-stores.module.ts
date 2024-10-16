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
  createVectorStore,
  deleteVectorStore,
  readVectorStore,
  listVectorStores,
  updateVectorStore
} from './vector-stores.service.js';

import {
  VectorStoreCreateBody,
  vectorStoreCreateBodySchema,
  vectorStoreCreateResponseSchema
} from '@/vector-stores/dtos/vector-store-create.js';
import {
  VectorStoreUpdateBody,
  VectorStoreUpdateParams,
  vectorStoreUpdateBodySchema,
  vectorStoreUpdateParamsSchema,
  vectorStoreUpdateResponseSchema
} from '@/vector-stores/dtos/vector-store-update.js';
import {
  VectorStoresListQuery,
  vectorStoresListQuerySchema,
  vectorStoresListResponseSchema
} from '@/vector-stores/dtos/vector-store-list.js';
import {
  VectorStoreReadParams,
  vectorStoreReadParamsSchema,
  vectorStoreReadResponseSchema
} from '@/vector-stores/dtos/vector-store-read.js';
import {
  VectorStoreDeleteParams,
  vectorStoreDeleteParamsSchema
} from '@/vector-stores/dtos/vector-store-delete.js';
import { Tag } from '@/swagger.js';
import { createDeleteSchema } from '@/schema.js';

export const vectorStoresModule: FastifyPluginAsyncJsonSchemaToTs = async (app) => {
  app.post<{ Body: VectorStoreCreateBody }>(
    '/vector_stores',
    {
      preHandler: app.auth(),
      schema: {
        body: vectorStoreCreateBodySchema,
        response: {
          [StatusCodes.OK]: vectorStoreCreateResponseSchema
        },
        tags: [Tag.OPENAI_ASSISTANTS_API]
      }
    },
    async (req) => createVectorStore(req.body)
  );

  app.post<{ Body: VectorStoreUpdateBody; Params: VectorStoreUpdateParams }>(
    '/vector_stores/:vector_store_id',
    {
      preHandler: app.auth(),
      schema: {
        body: vectorStoreUpdateBodySchema,
        params: vectorStoreUpdateParamsSchema,
        response: {
          [StatusCodes.OK]: vectorStoreUpdateResponseSchema
        },
        tags: [Tag.OPENAI_ASSISTANTS_API]
      }
    },
    async (req) => updateVectorStore({ ...req.body, ...req.params })
  );

  app.get<{ Querystring: VectorStoresListQuery }>(
    '/vector_stores',
    {
      preHandler: app.auth(),
      schema: {
        querystring: vectorStoresListQuerySchema,
        response: {
          [StatusCodes.OK]: vectorStoresListResponseSchema
        },
        tags: [Tag.OPENAI_ASSISTANTS_API]
      }
    },
    async (req) => listVectorStores(req.query)
  );

  app.get<{ Params: VectorStoreReadParams }>(
    '/vector_stores/:vector_store_id',
    {
      preHandler: app.auth(),
      schema: {
        params: vectorStoreReadParamsSchema,
        response: {
          [StatusCodes.OK]: vectorStoreReadResponseSchema
        },
        tags: [Tag.OPENAI_ASSISTANTS_API]
      }
    },
    async (req) => readVectorStore(req.params)
  );

  app.delete<{ Params: VectorStoreDeleteParams }>(
    '/vector_stores/:vector_store_id',
    {
      preHandler: app.auth(),
      schema: {
        params: vectorStoreDeleteParamsSchema,
        response: {
          [StatusCodes.OK]: createDeleteSchema('vector_store')
        },
        tags: [Tag.OPENAI_ASSISTANTS_API]
      }
    },
    async (req) => deleteVectorStore(req.params)
  );
};
