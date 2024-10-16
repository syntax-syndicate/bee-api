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

import { FromSchema } from 'json-schema-to-ts';

import { ToolType } from '../entities/tool/tool.entity.js';

import { toolSchema } from './tool.js';

import { createPaginationQuerySchema, withPagination } from '@/schema.js';
import { JSONSchema } from '@/ajv.js';

export const toolsListQuerySchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    ...createPaginationQuerySchema(['type', 'name'] as const).properties,
    type: {
      type: 'array',
      uniqueItems: true,
      items: { type: 'string', enum: Object.values(ToolType) }
    },
    search: {
      type: 'string',
      minLength: 1,
      nullable: true
    }
  }
} as const satisfies JSONSchema;
export type ToolsListQuery = FromSchema<typeof toolsListQuerySchema>;

export const toolsListResponseSchema = withPagination(toolSchema);
export type ToolsListResponse = FromSchema<typeof toolsListResponseSchema>;
