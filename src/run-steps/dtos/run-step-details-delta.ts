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

import { RunStepDetailsType } from '../entities/details/run-step-details.entity.js';

import { toolCallDeltaSchema } from '@/tools/dtos/tool-call-delta.js';

export const runStepDetailsDeltaSchema = {
  oneOf: [
    {
      type: 'object',
      required: ['type', RunStepDetailsType.MESSAGE_CREATION],
      properties: {
        type: { const: RunStepDetailsType.MESSAGE_CREATION },
        [RunStepDetailsType.MESSAGE_CREATION]: {
          type: 'object',
          required: ['message_id'],
          properties: { message_id: { type: 'string' } }
        }
      }
    },
    {
      type: 'object',
      required: ['type', RunStepDetailsType.TOOL_CALLS],
      properties: {
        type: { const: RunStepDetailsType.TOOL_CALLS },
        [RunStepDetailsType.TOOL_CALLS]: {
          type: 'array',
          items: toolCallDeltaSchema
        }
      }
    },
    {
      type: 'object',
      required: ['type', RunStepDetailsType.THOUGHT],
      properties: {
        type: { const: RunStepDetailsType.THOUGHT },
        [RunStepDetailsType.THOUGHT]: {
          type: 'object',
          required: ['content'],
          properties: { content: { type: 'string', nullable: true } }
        }
      }
    }
  ]
} as const satisfies JSONSchema;
export type RunStepDetailsDelta = FromSchema<typeof runStepDetailsDeltaSchema>;
