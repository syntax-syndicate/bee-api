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

import { runParamsSchema, runSchema } from './run.js';

import { eventSchema } from '@/streaming/dtos/event.js';

export const runSubmitToolOutputsParamsSchema = runParamsSchema;
export type RunSubmitToolOutputsParams = FromSchema<typeof runSubmitToolOutputsParamsSchema>;

export const runSubmitToolOutputsBodySchema = {
  type: 'object',
  required: ['tool_outputs'],
  additionalProperties: false,
  properties: {
    tool_outputs: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['tool_call_id', 'output'],
        properties: {
          tool_call_id: { type: 'string' },
          output: { type: 'string' }
        }
      }
    },
    stream: {
      type: 'boolean',
      nullable: true
    }
  }
} as const satisfies JSONSchema;
export type RunSubmitToolOutputsBody = FromSchema<typeof runSubmitToolOutputsBodySchema>;

export const runSubmitToolOutputsResponseSchema = runSchema;
export type RunSubmitToolOutputsResponse = FromSchema<typeof runSubmitToolOutputsResponseSchema>;

export const runSubmitToolOutputsStreamSchema = eventSchema;
export type RunSubmitToolOutputsStream = FromSchema<typeof runSubmitToolOutputsStreamSchema>;
