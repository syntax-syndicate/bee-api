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

import { projectUserSchema } from './project-user';

import { createPaginationQuerySchema, withPagination } from '@/schema.js';
import { JSONSchema } from '@/ajv';

export const projectUsersListQuerySchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    ...createPaginationQuerySchema().properties,
    search: {
      type: 'string',
      minLength: 3,
      nullable: true
    }
  }
} as const satisfies JSONSchema;
export type ProjectUsersListQuery = FromSchema<typeof projectUsersListQuerySchema>;

export const projectUsersListResponseSchema = withPagination(projectUserSchema);
export type ProjectUsersListResponse = FromSchema<typeof projectUsersListResponseSchema>;

export const projectUsersListParamsSchema = {
  type: 'object',
  required: ['project_id'],
  additionalProperties: false,
  properties: {
    project_id: { type: 'string' }
  }
} as const satisfies JSONSchema;
export type ProjectUsersListParams = FromSchema<typeof projectUsersListParamsSchema>;
