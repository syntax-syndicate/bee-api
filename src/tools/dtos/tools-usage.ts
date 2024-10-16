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

export const toolUsageSchema = {
  oneOf: [
    {
      type: 'object',
      required: ['type', ToolType.USER],
      properties: {
        type: { const: ToolType.USER },
        [ToolType.USER]: {
          type: 'object',
          required: ['tool'],
          properties: {
            tool: {
              type: 'object',
              required: ['id'],
              properties: {
                id: { type: 'string' }
              }
            }
          }
        }
      }
    },
    {
      type: 'object',
      required: ['type', ToolType.FUNCTION],
      properties: {
        type: { const: ToolType.FUNCTION },
        [ToolType.FUNCTION]: {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            parameters: { type: 'object', additionalProperties: true }
          }
        }
      }
    },
    {
      type: 'object',
      required: ['type'],
      properties: {
        type: { const: ToolType.CODE_INTERPRETER }
      }
    },
    {
      type: 'object',
      title: 'FileSearch tool',
      required: ['type'],
      properties: {
        type: { const: ToolType.FILE_SEARCH },
        [ToolType.FILE_SEARCH]: {
          type: 'object',
          properties: {
            max_num_results: {
              type: 'integer',
              minimum: 1,
              maximum: 50,
              description:
                'The maximum number of results the file search tool should output. This number should be between 1 and 50 inclusive.\n\nNote that the file search tool may output fewer than `max_num_results` results.'
            }
          }
        }
      }
    },
    {
      type: 'object',
      required: ['type', ToolType.SYSTEM],
      properties: {
        type: { const: ToolType.SYSTEM },
        [ToolType.SYSTEM]: {
          type: 'object',
          required: ['id'],
          properties: {
            id: { type: 'string', enum: Object.values(SystemTools) }
          }
        }
      }
    }
  ]
} as const satisfies JSONSchema;
export type ToolUsage = FromSchema<typeof toolUsageSchema>;
