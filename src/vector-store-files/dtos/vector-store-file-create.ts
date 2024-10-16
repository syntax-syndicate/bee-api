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

import { vectorStoreFileSchema } from './vector-store-file.js';
import { chunkingStrategyRequestParamSchema } from './chunking-strategy.js';

export const vectorStoreFileCreateParamsSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['vector_store_id'],
  properties: { vector_store_id: { type: 'string' } }
} as const satisfies JSONSchema;
export type VectorStoreFileCreateParams = FromSchema<typeof vectorStoreFileCreateParamsSchema>;

export const vectorStoreFileCreateBodySchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    file_id: {
      description:
        'A File ID that the vector store should use. Useful for tools like `file_search` that can access files.',
      type: 'string'
    },
    chunking_strategy: chunkingStrategyRequestParamSchema
  },
  required: ['file_id']
} as const satisfies JSONSchema;

export type VectorStoreFileCreateBody = FromSchema<typeof vectorStoreFileCreateBodySchema>;

export const vectorStoreFileCreateResponseSchema = vectorStoreFileSchema;
export type VectorStoreFileCreateResponse = FromSchema<typeof vectorStoreFileCreateResponseSchema>;
