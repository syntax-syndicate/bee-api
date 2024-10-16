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

import { eventSchema } from '@/streaming/dtos/event.js';
import { toolUsageSchema } from '@/tools/dtos/tools-usage.js';
import { metadataSchema } from '@/schema.js';

export const runCreateParamsSchema = {
  type: 'object',
  required: ['thread_id'],
  additionalProperties: false,
  properties: {
    thread_id: { type: 'string' }
  }
} as const satisfies JSONSchema;
export type RunCreateParams = FromSchema<typeof runCreateParamsSchema>;

export const runCreateBodySchema = {
  type: 'object',
  required: ['assistant_id'],
  additionalProperties: false,
  properties: {
    assistant_id: { type: 'string' },
    stream: { type: 'boolean', nullable: true },
    tools: {
      type: 'array',
      uniqueItems: true,
      items: toolUsageSchema,
      nullable: true
    },
    tool_approvals: {
      type: 'object',
      patternProperties: {
        '.*': {
          type: 'object',
          required: ['require'],
          additionalProperties: false,
          properties: {
            require: {
              type: 'string',
              enum: ['always', 'never']
            }
          }
        }
      },
      nullable: true
    },
    instructions: {
      type: 'string',
      nullable: true
    },
    additional_instructions: {
      type: 'string',
      nullable: true
    },
    model: {
      type: 'string',
      nullable: true
    },
    top_p: {
      type: 'number',
      nullable: true,
      maximum: 1,
      minimum: 0,
      multipleOf: 0.01
    },
    temperature: {
      type: 'number',
      nullable: true,
      maximum: 2,
      minimum: 0,
      multipleOf: 0.01
    },
    metadata: metadataSchema
  }
} as const satisfies JSONSchema;
export type RunCreateBody = FromSchema<typeof runCreateBodySchema>;

export const runCreateResponseSchema = runSchema;
export type RunCreateResponse = FromSchema<typeof runCreateResponseSchema>;

export const runCreateStreamSchema = eventSchema;
export type RunCreateStream = FromSchema<typeof runCreateStreamSchema>;
