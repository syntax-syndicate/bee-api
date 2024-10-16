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

import { messageDeltaSchema } from '../../messages/dtos/message-delta.js';

import { threadSchema } from '@/threads/dtos/thread.js';
import { runSchema } from '@/runs/dtos/run.js';
import { messageSchema } from '@/messages/dtos/message.js';
import { errorSchema } from '@/errors/dtos/error.js';
import { runStepSchema } from '@/run-steps/dtos/run-step.js';
import { runStepDeltaSchema } from '@/run-steps/dtos/run-step-delta.js';

export const eventSchema = {
  type: 'object',
  required: ['event', 'data'],
  oneOf: [
    {
      properties: {
        event: { const: 'thread.created' },
        data: threadSchema
      }
    },
    {
      properties: {
        event: {
          type: 'string',
          enum: [
            'thread.run.created',
            'thread.run.queued',
            'thread.run.in_progress',
            'thread.run.requires_action',
            'thread.run.requires_approve',
            'thread.run.completed',
            'thread.run.incomplete',
            'thread.run.failed',
            'thread.run.cancelling',
            'thread.run.cancelled',
            'thread.run.expired'
          ]
        },
        data: runSchema
      }
    },
    {
      properties: {
        event: {
          type: 'string',
          enum: [
            'thread.run.step.created',
            'thread.run.step.in_progress',
            'thread.run.step.completed',
            'thread.run.step.failed',
            'thread.run.step.cancelled',
            'thread.run.step.expired'
          ]
        },
        data: runStepSchema
      }
    },
    {
      properties: {
        event: { const: 'thread.run.step.delta' },
        data: runStepDeltaSchema
      }
    },
    {
      properties: {
        event: {
          type: 'string',
          enum: [
            'thread.message.created',
            'thread.message.in_progress',
            'thread.message.completed',
            'thread.message.incomplete'
          ]
        },
        data: messageSchema
      }
    },
    {
      properties: {
        event: { const: 'thread.message.delta' },
        data: messageDeltaSchema
      }
    },
    {
      properties: {
        event: { const: 'done' },
        data: {
          const: '[DONE]'
        }
      }
    },
    {
      properties: {
        event: { const: 'error' },
        data: errorSchema
      }
    }
  ]
} as const satisfies JSONSchema;
export type Event = FromSchema<typeof eventSchema>;
