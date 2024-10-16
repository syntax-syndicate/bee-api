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

import { createTool, deleteTool, readTool, listTools, updateTool } from './tools.service.js';
import {
  ToolCreateBody,
  toolCreateBodySchema,
  toolCreateResponseSchema
} from './dtos/tool-create.js';
import {
  ToolUpdateBody,
  ToolUpdateParams,
  toolUpdateBodySchema,
  toolUpdateParamsSchema,
  toolUpdateResponseSchema
} from './dtos/tool-update.js';
import {
  ToolsListQuery,
  toolsListQuerySchema,
  toolsListResponseSchema
} from './dtos/tools-list.js';
import { ToolReadParams, toolReadParamsSchema, toolReadResponseSchema } from './dtos/tool-read.js';
import {
  ToolDeleteParams,
  toolDeleteParamsSchema,
  toolDeleteResponseSchema
} from './dtos/tool-delete.js';

import { Tag } from '@/swagger.js';

export const toolsModule: FastifyPluginAsyncJsonSchemaToTs = async (app) => {
  app.post<{ Body: ToolCreateBody }>(
    '/tools',
    {
      preHandler: app.auth(),
      schema: {
        body: toolCreateBodySchema,
        response: {
          [StatusCodes.OK]: toolCreateResponseSchema
        },
        tags: [Tag.BEE_API]
      }
    },
    async (req) => createTool(req.body)
  );

  app.post<{ Body: ToolUpdateBody; Params: ToolUpdateParams }>(
    '/tools/:tool_id',
    {
      preHandler: app.auth(),
      schema: {
        body: toolUpdateBodySchema,
        params: toolUpdateParamsSchema,
        response: {
          [StatusCodes.OK]: toolUpdateResponseSchema
        },
        tags: [Tag.BEE_API]
      }
    },
    async (req) => updateTool({ ...req.body, ...req.params })
  );

  app.get<{ Querystring: ToolsListQuery }>(
    '/tools',
    {
      preHandler: app.auth(),
      schema: {
        querystring: toolsListQuerySchema,
        response: {
          [StatusCodes.OK]: toolsListResponseSchema
        },
        tags: [Tag.BEE_API]
      }
    },
    async (req) => listTools(req.query)
  );

  app.get<{ Params: ToolReadParams }>(
    '/tools/:tool_id',
    {
      preHandler: app.auth(),
      schema: {
        params: toolReadParamsSchema,
        response: {
          [StatusCodes.OK]: toolReadResponseSchema
        },
        tags: [Tag.BEE_API]
      }
    },
    async (req) => readTool(req.params)
  );

  app.delete<{ Params: ToolDeleteParams }>(
    '/tools/:tool_id',
    {
      preHandler: app.auth(),
      schema: {
        params: toolDeleteParamsSchema,
        response: {
          [StatusCodes.OK]: toolDeleteResponseSchema
        },
        tags: [Tag.BEE_API]
      }
    },
    async (req) => deleteTool(req.params)
  );
};
