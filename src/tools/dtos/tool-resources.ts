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

const fileSearchToolResourcesSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    vector_store_ids: {
      type: 'array',
      description: 'The vector_store attached to this object.',
      maxItems: 1,
      items: { type: 'string' },
      uniqueItems: true
    }
  }
} as const satisfies JSONSchema;

export const toolResourcesSchema = {
  type: 'object',
  nullable: true,
  additionalProperties: false,
  properties: {
    [ToolType.CODE_INTERPRETER]: {
      type: 'object',
      additionalProperties: false,
      properties: {
        file_ids: { type: 'array', items: { type: 'string' }, uniqueItems: true, default: [] }
      }
    },
    [ToolType.FILE_SEARCH]: fileSearchToolResourcesSchema
  },
  patternProperties: {
    '^(?!.*(file_search|code_interpreter))': {
      type: 'object',
      additionalProperties: false,
      properties: {
        file_ids: { type: 'array', items: { type: 'string' }, uniqueItems: true, default: [] }
      }
    }
  }
} as const satisfies JSONSchema;
export type ToolResources = FromSchema<typeof toolResourcesSchema>;
