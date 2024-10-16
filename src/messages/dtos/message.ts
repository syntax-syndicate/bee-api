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

import { metadataSchema } from '@/schema.js';
import { ToolType } from '@/tools/entities/tool/tool.entity.js';

export const messageSchema = {
  type: 'object',
  required: ['id', 'role', 'content', 'metadata', 'created_at', 'object'],
  properties: {
    id: { type: 'string' },
    object: { const: 'thread.message' },
    role: {
      type: 'string',
      enum: Object.values(MessageRole)
    },
    content: {
      type: 'array',
      items: {
        type: 'object',
        required: ['type', 'text'],
        properties: {
          type: { const: 'text' },
          text: {
            type: 'object',
            required: ['value'],
            properties: {
              value: { type: 'string' }
            }
          }
        }
      }
    },
    run_id: { type: 'string' },
    metadata: metadataSchema,
    created_at: { type: 'number' },
    attachments: {
      type: 'array',
      nullable: true,
      items: {
        type: 'object',
        required: ['file_id', 'tools'],
        properties: {
          file_id: {
            type: 'string'
          },
          tools: {
            type: 'array',
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
    }
  }
} as const satisfies JSONSchema;
export type Message = FromSchema<typeof messageSchema>;
