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

import { MessageRole } from '../message.entity.js';

import { messageSchema } from './message.js';

import { metadataSchema } from '@/schema.js';
import { ToolType } from '@/tools/entities/tool/tool.entity.js';

export const messageCreateParamsSchema = {
  type: 'object',
  required: ['thread_id'],
  additionalProperties: false,
  properties: {
    thread_id: { type: 'string' }
  }
} as const satisfies JSONSchema;
export type MessageCreateParams = FromSchema<typeof messageCreateParamsSchema>;

export const messageCreateBodySchema = {
  type: 'object',
  required: ['role', 'content'],
  additionalProperties: false,
  properties: {
    role: {
      type: 'string',
      enum: Object.values(MessageRole)
    },
    content: {
      type: 'string'
    },
    attachments: {
      type: 'array',
      nullable: true,
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['file_id'],
        properties: {
          file_id: {
            type: 'string'
          },
          tools: {
            type: 'array',
            minItems: 1,
            items: {
              type: 'object',
              oneOf: [
                {
                  additionalProperties: false,
                  required: ['type'],
                  properties: {
                    type: {
                      const: ToolType.CODE_INTERPRETER
                    }
                  }
                },
                {
                  additionalProperties: false,
                  required: ['type'],
                  properties: {
                    type: {
                      const: ToolType.FILE_SEARCH
                    }
                  }
                },
                {
                  additionalProperties: false,
                  required: ['type', 'id'],
                  properties: {
                    type: {
                      const: ToolType.SYSTEM
                    },
                    id: {
                      type: 'string'
                    }
                  }
                },
                {
                  additionalProperties: false,
                  required: ['type', 'id'],
                  properties: {
                    type: {
                      const: ToolType.USER
                    },
                    id: {
                      type: 'string'
                    }
                  }
                }
              ]
            }
          }
        }
      }
    },
    metadata: metadataSchema
  }
} as const satisfies JSONSchema;
export type MessageCreateBody = FromSchema<typeof messageCreateBodySchema>;

export const messageCreateResponseSchema = messageSchema;
export type MessageCreateResponse = FromSchema<typeof messageCreateResponseSchema>;
