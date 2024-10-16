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
  AssistantCreateBody,
  assistantCreateBodySchema,
  assistantCreateResponseSchema
} from './dtos/assistant-create.js';
import {
  AssistantsListQuery,
  assistantsListQuerySchema,
  assistantsListResponseSchema
} from './dtos/assistants-list.js';
import {
  createAssistant,
  deleteAssistant,
  listAssistants,
  readAssistant,
  updateAssistant
} from './assistants.service.js';
import {
  AssistantReadParams,
  assistantReadParamsSchema,
  assistantReadResponseSchema
} from './dtos/assistant-read.js';
import {
  AssistantUpdateBody,
  AssistantUpdateParams,
  assistantUpdateBodySchema,
  assistantUpdateParamsSchema,
  assistantUpdateResponseSchema
} from './dtos/assistant-update.js';
import { AssistantDeleteParams, assistantDeleteParamsSchema } from './dtos/assistant-delete.js';

import { Tag } from '@/swagger.js';
import { createDeleteSchema } from '@/schema.js';

export const assistantsModule: FastifyPluginAsyncJsonSchemaToTs = async (app) => {
  app.post<{ Body: AssistantCreateBody }>(
    '/assistants',
    {
      schema: {
        body: assistantCreateBodySchema,
        response: { [StatusCodes.OK]: assistantCreateResponseSchema },
        tags: [Tag.OPENAI_ASSISTANTS_API]
      },
      preHandler: app.auth()
    },
    async (req) => createAssistant(req.body)
  );

  app.get<{ Params: AssistantReadParams }>(
    '/assistants/:assistant_id',
    {
      schema: {
        params: assistantReadParamsSchema,
        response: { [StatusCodes.OK]: assistantReadResponseSchema },
        tags: [Tag.OPENAI_ASSISTANTS_API]
      },
      preHandler: app.auth()
    },
    async (req) => {
      const { assistant_id } = req.params;
      return readAssistant({ assistant_id });
    }
  );

  app.post<{ Params: AssistantUpdateParams; Body: AssistantUpdateBody }>(
    '/assistants/:assistant_id',
    {
      schema: {
        params: assistantUpdateParamsSchema,
        body: assistantUpdateBodySchema,
        response: { [StatusCodes.OK]: assistantUpdateResponseSchema },
        tags: [Tag.OPENAI_ASSISTANTS_API]
      },
      preHandler: app.auth()
    },
    async (req) => {
      return updateAssistant({ ...req.params, ...req.body });
    }
  );

  app.get<{ Querystring: AssistantsListQuery }>(
    '/assistants',
    {
      schema: {
        querystring: assistantsListQuerySchema,
        response: { [StatusCodes.OK]: assistantsListResponseSchema },
        tags: [Tag.OPENAI_ASSISTANTS_API]
      },
      preHandler: app.auth()
    },
    async (req) => {
      return listAssistants(req.query);
    }
  );

  app.delete<{ Params: AssistantDeleteParams }>(
    '/assistants/:assistant_id',
    {
      preHandler: app.auth(),
      schema: {
        params: assistantDeleteParamsSchema,
        response: {
          [StatusCodes.OK]: createDeleteSchema('assistant')
        },
        tags: [Tag.OPENAI_ASSISTANTS_API]
      }
    },
    async (req) => deleteAssistant(req.params)
  );
};
