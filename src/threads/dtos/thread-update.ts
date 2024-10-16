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

import { FromSchema } from 'json-schema-to-ts';

import { threadSchema } from './thread.js';
import { threadReadParamsSchema } from './thread-read.js';

import { metadataSchema } from '@/schema.js';
import { toolResourcesSchema } from '@/tools/dtos/tool-resources.js';
import { JSONSchema } from '@/ajv.js';

export const threadUpdateBodySchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    metadata: metadataSchema,
    tool_resources: toolResourcesSchema
  }
} as const satisfies JSONSchema;
export type ThreadUpdateBody = FromSchema<typeof threadUpdateBodySchema>;

export const threadUpdateResponseSchema = threadSchema;
export type ThreadUpdateResponse = FromSchema<typeof threadUpdateResponseSchema>;

export const threadUpdateParamsSchema = threadReadParamsSchema;
export type ThreadUpdateParams = FromSchema<typeof threadUpdateParamsSchema>;
