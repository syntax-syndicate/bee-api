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
  MessageCreateBody,
  MessageCreateParams,
  messageCreateBodySchema,
  messageCreateParamsSchema,
  messageCreateResponseSchema
} from './dtos/message-create.js';
import {
  createMessage,
  deleteMessage,
  listMessages,
  readMessage,
  updateMessage
} from './messages.service.js';
import {
  MessageReadParams,
  messageReadParamsSchema,
  messageReadResponseSchema
} from './dtos/message-read.js';
import {
  MessagesListParams,
  MessagesListQuery,
  messagesListParamsSchema,
  messagesListQuerySchema,
  messagesListResponseSchema
} from './dtos/messages-list.js';
import {
  MessageUpdateBody,
  MessageUpdateParams,
  messageUpdateBodySchema,
  messageUpdateParamsSchema,
  messageUpdateResponseSchema
} from './dtos/message-update.js';
import { MessageDeleteParams, messageDeleteParamsSchema } from './dtos/message-delete.js';

import { Tag } from '@/swagger.js';
import { createDeleteSchema } from '@/schema.js';

export const messagesModule: FastifyPluginAsyncJsonSchemaToTs = async (app) => {
  app.post<{ Params: MessageCreateParams; Body: MessageCreateBody }>(
    '/threads/:thread_id/messages',
    {
      schema: {
        params: messageCreateParamsSchema,
        body: messageCreateBodySchema,
        response: { [StatusCodes.OK]: messageCreateResponseSchema },
        tags: [Tag.OPENAI_ASSISTANTS_API]
      },
      preHandler: app.auth()
    },
    async (req) => {
      return createMessage({ ...req.body, ...req.params });
    }
  );

  app.get<{ Params: MessageReadParams }>(
    '/threads/:thread_id/messages/:message_id',
    {
      schema: {
        params: messageReadParamsSchema,
        response: { [StatusCodes.OK]: messageReadResponseSchema },
        tags: [Tag.OPENAI_ASSISTANTS_API]
      },
      preHandler: app.auth()
    },
    async (req) => {
      return readMessage(req.params);
    }
  );

  app.post<{ Params: MessageUpdateParams; Body: MessageUpdateBody }>(
    '/threads/:thread_id/messages/:message_id',
    {
      schema: {
        params: messageUpdateParamsSchema,
        body: messageUpdateBodySchema,
        response: { [StatusCodes.OK]: messageUpdateResponseSchema },
        tags: [Tag.OPENAI_ASSISTANTS_API]
      },
      preHandler: app.auth()
    },
    async (req) => {
      return updateMessage({ ...req.params, ...req.body });
    }
  );

  app.get<{ Querystring: MessagesListQuery; Params: MessagesListParams }>(
    '/threads/:thread_id/messages',
    {
      schema: {
        params: messagesListParamsSchema,
        querystring: messagesListQuerySchema,
        response: { [StatusCodes.OK]: messagesListResponseSchema },
        tags: [Tag.OPENAI_ASSISTANTS_API]
      },
      preHandler: app.auth()
    },
    async (req) => {
      return listMessages({ ...req.params, ...req.query });
    }
  );

  app.delete<{ Params: MessageDeleteParams }>(
    '/threads/:thread_id/messages/:message_id',
    {
      preHandler: app.auth(),
      schema: {
        params: messageDeleteParamsSchema,
        response: {
          [StatusCodes.OK]: createDeleteSchema('thread.message')
        },
        tags: [Tag.OPENAI_ASSISTANTS_API]
      }
    },
    async (req) => deleteMessage(req.params)
  );
};
