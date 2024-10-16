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

import { threadSchema } from './thread.js';

import { messageCreateBodySchema } from '@/messages/dtos/message-create.js';
import { metadataSchema } from '@/schema.js';
import { toolResourcesSchema } from '@/tools/dtos/tool-resources.js';

export const threadCreateBodySchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    messages: {
      type: 'array',
      items: messageCreateBodySchema
    },
    metadata: metadataSchema,
    tool_resources: toolResourcesSchema
  }
} as const satisfies JSONSchema;
export type ThreadCreateBody = FromSchema<typeof threadCreateBodySchema>;

export const threadCreateResponseSchema = threadSchema;
export type ThreadCreateResponse = FromSchema<typeof threadCreateResponseSchema>;
