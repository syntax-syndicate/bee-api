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

import { threadCreateBodySchema } from '@/threads/dtos/thread-create.js';
import { eventSchema } from '@/streaming/dtos/event.js';
import { toolUsageSchema } from '@/tools/dtos/tools-usage.js';

export const threadRunCreateBodySchema = {
  type: 'object',
  required: ['assistant_id'],
  additionalProperties: false,
  properties: {
    assistant_id: { type: 'string' },
    thread: threadCreateBodySchema,
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
    }
  }
} as const satisfies JSONSchema;
export type ThreadRunCreateBody = FromSchema<typeof threadRunCreateBodySchema>;

export const threadRunCreateResponseSchema = runSchema;
export type ThreadRunCreateResponse = FromSchema<typeof threadRunCreateResponseSchema>;

export const threadRunCreateStreamSchema = eventSchema;
export type ThreadRunCreateStream = FromSchema<typeof threadRunCreateStreamSchema>;
