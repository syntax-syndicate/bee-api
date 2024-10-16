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

import { ToolType } from '../entities/tool/tool.entity.js';
import { SystemTools } from '../entities/tool-calls/system-call.entity.js';

export const toolCallDeltaSchema = {
  oneOf: [
    {
      type: 'object',
      required: ['index', 'id', 'type', ToolType.CODE_INTERPRETER],
      properties: {
        index: { type: 'integer' },
        id: { type: 'string' },
        type: { const: ToolType.CODE_INTERPRETER },
        [ToolType.CODE_INTERPRETER]: {
          type: 'object',
          required: ['input', 'outputs'],
          properties: {
            input: { type: 'string' },
            outputs: {
              type: 'array',
              items: {
                oneOf: [
                  {
                    type: 'object',
                    required: ['index', 'type', 'logs'],
                    properties: {
                      index: { type: 'integer' },
                      type: { const: 'logs' },
                      logs: { type: 'string' }
                    }
                  },
                  {
                    type: 'object',
                    required: ['index', 'type', 'image'],
                    properties: {
                      index: { type: 'integer' },
                      type: { const: 'image' },
                      image: {
                        type: 'object',
                        required: ['file_id'],
                        properties: { file_id: { type: 'string' } }
                      }
                    }
                  },
                  {
                    type: 'object',
                    required: ['index', 'type', 'resource'],
                    properties: {
                      index: { type: 'integer' },
                      type: { const: 'resource' },
                      resource: {
                        type: 'object',
                        required: ['file_id'],
                        properties: { file_id: { type: 'string' } }
                      }
                    }
                  }
                ]
              }
            }
          }
        }
      }
    },
    {
      type: 'object',
      required: ['index', 'id', 'type'],
      properties: {
        index: { type: 'integer' },
        id: { type: 'string' },
        type: { const: ToolType.FILE_SEARCH }
      }
    },
    {
      type: 'object',
      required: ['index', 'id', 'type', ToolType.FUNCTION],
      properties: {
        index: { type: 'integer' },
        id: { type: 'string' },
        type: { const: ToolType.FUNCTION },
        [ToolType.FUNCTION]: {
          type: 'object',
          required: ['name', 'arguments', 'output'],
          properties: {
            name: { type: 'string' },
            arguments: { type: 'string' },
            output: { type: 'string', nullable: true }
          }
        }
      }
    },
    {
      type: 'object',
      required: ['index', 'id', 'type', ToolType.USER],
      properties: {
        index: { type: 'integer' },
        id: { type: 'string' },
        type: { const: ToolType.USER },
        [ToolType.USER]: {
          type: 'object',
          required: ['tool', 'arguments', 'output'],
          properties: {
            tool: {
              type: 'object',
              required: ['id'],
              properties: {
                id: { type: 'string' }
              }
            },
            arguments: { type: 'string', nullable: true },
            output: { type: 'string', nullable: true }
          }
        }
      }
    },
    {
      type: 'object',
      required: ['index', 'id', 'type', ToolType.SYSTEM],
      properties: {
        index: { type: 'integer' },
        id: { type: 'string' },
        type: { const: ToolType.SYSTEM },
        [ToolType.SYSTEM]: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string', enum: Object.values(SystemTools) },
            input: {},
            output: {}
          }
        }
      }
    }
  ]
} as const satisfies JSONSchema;
export type ToolCallDelta = FromSchema<typeof toolCallDeltaSchema>;
