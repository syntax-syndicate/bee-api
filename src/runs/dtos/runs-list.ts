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

import { runSchema } from './run.js';

import { createPaginationQuerySchema, withPagination } from '@/schema.js';

export const runsListParamsSchema = {
  type: 'object',
  required: ['thread_id'],
  properties: {
    thread_id: { type: 'string' }
  }
} as const satisfies JSONSchema;
export type RunsListParams = FromSchema<typeof runsListParamsSchema>;

export const runsListQuerySchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    ...createPaginationQuerySchema().properties,
    // Stupid name to stay compatible with OpenAI (an undocumented query param in their API)
    'ids[]': {
      type: 'array',
      uniqueItems: true,
      /*
       Our id has 24 characters, so the limit is keeping this under 2000 chars per recommendation:
       https://stackoverflow.com/a/417184
      */
      maxItems: 50,
      items: { type: 'string' }
    }
  }
} as const satisfies JSONSchema;
export type RunsListQuery = FromSchema<typeof runsListQuerySchema>;

export const runsListResponseSchema = withPagination(runSchema);
export type RunsListResponse = FromSchema<typeof runsListResponseSchema>;
