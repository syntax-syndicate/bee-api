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

import { messageSchema } from './message.js';

import { metadataSchema } from '@/schema.js';

export const messageUpdateParamsSchema = {
  type: 'object',
  required: ['thread_id', 'message_id'],
  additionalProperties: false,
  properties: {
    thread_id: { type: 'string' },
    message_id: { type: 'string' }
  }
} as const satisfies JSONSchema;
export type MessageUpdateParams = FromSchema<typeof messageUpdateParamsSchema>;

export const messageUpdateBodySchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    metadata: metadataSchema
  }
} as const satisfies JSONSchema;
export type MessageUpdateBody = FromSchema<typeof messageUpdateBodySchema>;

export const messageUpdateResponseSchema = messageSchema;
export type MessageUpdateResponse = FromSchema<typeof messageUpdateResponseSchema>;
