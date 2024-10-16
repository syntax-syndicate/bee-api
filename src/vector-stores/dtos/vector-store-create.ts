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

import { FromSchema, JSONSchema } from 'json-schema-to-ts';

import { vectorStoreSchema } from './vector-store.js';
import { vectorStoreExpirationAfterSchema } from './vector-store-expiration-after.js';

import { chunkingStrategyRequestParamSchema } from '@/vector-store-files/dtos/chunking-strategy.js';
import { metadataSchema } from '@/schema.js';

export const vectorStoreCreateBodySchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    file_ids: {
      description:
        'A list of File IDs that the vector store should use. Useful for tools like `file_search` that can access files.',
      type: 'array',
      maxItems: 500,
      items: { type: 'string' },
      uniqueItems: true
    },
    name: {
      description: 'The name of the vector store.',
      type: 'string'
    },
    expires_after: vectorStoreExpirationAfterSchema,
    chunking_strategy: chunkingStrategyRequestParamSchema,
    depends_on: {
      type: 'object',
      required: ['thread'],
      properties: {
        thread: {
          type: 'object',
          required: ['id'],
          properties: {
            id: {
              type: 'string'
            }
          }
        }
      }
    },
    metadata: metadataSchema
  }
} as const satisfies JSONSchema;

export type VectorStoreCreateBody = FromSchema<typeof vectorStoreCreateBodySchema>;

export const vectorStoreCreateResponseSchema = vectorStoreSchema;
export type VectorStoreCreateResponse = FromSchema<typeof vectorStoreCreateResponseSchema>;
