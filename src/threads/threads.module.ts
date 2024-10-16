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
  createThread,
  deleteThread,
  listThreads,
  readThread,
  updateThread
} from './threads.service.js';
import {
  ThreadCreateBody,
  threadCreateBodySchema,
  threadCreateResponseSchema
} from './dtos/thread-create.js';
import {
  ThreadsListQuery,
  threadsListQuerySchema,
  threadsListResponseSchema
} from './dtos/threads-list.js';
import {
  ThreadReadParams,
  threadReadParamsSchema,
  threadReadResponseSchema
} from './dtos/thread-read.js';
import {
  ThreadUpdateBody,
  ThreadUpdateParams,
  threadUpdateBodySchema,
  threadUpdateParamsSchema,
  threadUpdateResponseSchema
} from './dtos/thread-update.js';
import {
  ThreadDeleteParams,
  threadDeleteParamsSchema,
  threadDeleteResponseSchema
} from './dtos/thread-delete.js';

import { Tag } from '@/swagger.js';

export const threadsModule: FastifyPluginAsyncJsonSchemaToTs = async (app) => {
  app.post<{ Body: ThreadCreateBody }>(
    '/threads',
    {
      schema: {
        body: threadCreateBodySchema,
        response: { [StatusCodes.OK]: threadCreateResponseSchema },
        tags: [Tag.OPENAI_ASSISTANTS_API]
      },
      preHandler: app.auth()
    },
    async (req) => createThread(req.body)
  );

  app.post<{ Body: ThreadUpdateBody; Params: ThreadUpdateParams }>(
    '/threads/:thread_id',
    {
      schema: {
        body: threadUpdateBodySchema,
        params: threadUpdateParamsSchema,
        response: { [StatusCodes.OK]: threadUpdateResponseSchema },
        tags: [Tag.OPENAI_ASSISTANTS_API]
      },
      preHandler: app.auth()
    },
    async (req) => updateThread({ ...req.body, ...req.params })
  );

  app.get<{ Params: ThreadReadParams }>(
    '/threads/:thread_id',
    {
      schema: {
        params: threadReadParamsSchema,
        response: { [StatusCodes.OK]: threadReadResponseSchema },
        tags: [Tag.OPENAI_ASSISTANTS_API]
      },
      preHandler: app.auth()
    },
    async (req) => {
      const { thread_id } = req.params;
      return readThread({ thread_id });
    }
  );

  app.get<{ Querystring: ThreadsListQuery }>(
    '/threads',
    {
      schema: {
        querystring: threadsListQuerySchema,
        response: { [StatusCodes.OK]: threadsListResponseSchema },
        tags: [Tag.BEE_API]
      },
      preHandler: app.auth()
    },
    async (req) => listThreads(req.query)
  );

  app.delete<{ Params: ThreadDeleteParams }>(
    '/threads/:thread_id',
    {
      preHandler: app.auth(),
      schema: {
        params: threadDeleteParamsSchema,
        response: {
          [StatusCodes.OK]: threadDeleteResponseSchema
        },
        tags: [Tag.BEE_API]
      }
    },
    async (req) => deleteThread(req.params)
  );
};
