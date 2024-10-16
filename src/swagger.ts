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

import fp from 'fastify-plugin';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { unique } from 'remeda';

import { GIT_TAG } from './config.js';
import { errorSchema } from './errors/dtos/error.js';
import { errorResponseSchema } from './errors/dtos/error-response.js';

export const Tag = {
  OPENAI_API: 'OpenAI API',
  OPENAI_ASSISTANTS_API: 'OpenAI Assistants API',
  BEE_API: 'Bee API'
};
export type Tag = (typeof Tag)[keyof typeof Tag];

export const swaggerPlugin = fp.default(async (app) => {
  app.register(swagger, {
    openapi: {
      info: {
        title: 'Bee',
        version: GIT_TAG
      },
      openapi: '3.1.0',
      tags: unique([
        Tag.OPENAI_ASSISTANTS_API,
        Tag.OPENAI_API,
        Tag.BEE_API,
        ...Object.values(Tag)
      ]).map((tag) => ({ name: tag })),
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer'
          }
        },
        schemas: {
          Error: errorSchema,
          ErrorResponse: errorResponseSchema
        } as any // Bypass type error
      },
      security: [
        {
          bearerAuth: []
        }
      ]
    }
  });
  app.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false
    }
  });
});
