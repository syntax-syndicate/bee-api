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

export const runSubmitToolApprovalsParamsSchema = runParamsSchema;
export type RunSubmitToolApprovalsParams = FromSchema<typeof runSubmitToolApprovalsParamsSchema>;

export const runSubmitToolApprovalsBodySchema = {
  type: 'object',
  required: ['tool_approvals'],
  additionalProperties: false,
  properties: {
    tool_approvals: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['tool_call_id', 'approve'],
        properties: {
          tool_call_id: { type: 'string' },
          approve: { type: 'boolean' }
        }
      }
    },
    stream: {
      type: 'boolean',
      nullable: true
    }
  }
} as const satisfies JSONSchema;
export type RunSubmitToolApprovalsBody = FromSchema<typeof runSubmitToolApprovalsBodySchema>;

export const runSubmitToolApprovalsResponseSchema = runSchema;
export type RunSubmitToolApprovalsResponse = FromSchema<
  typeof runSubmitToolApprovalsResponseSchema
>;

export const runSubmitToolApprovalsStreamSchema = eventSchema;
export type RunSubmitToolApprovalsStream = FromSchema<typeof runSubmitToolApprovalsStreamSchema>;
