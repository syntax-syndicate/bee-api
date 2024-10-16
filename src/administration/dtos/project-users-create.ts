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

import { ProjectRole } from '../entities/constants';

import { projectUserSchema } from './project-user';
import { projectUsersListParamsSchema } from './project-users-list';

export const projectUserCreateBodySchema = {
  type: 'object',
  additionalProperties: false,
  required: ['role', 'user_id'],
  properties: {
    role: { type: 'string', enum: Object.values(ProjectRole) },
    user_id: { type: 'string' }
  }
} as const satisfies JSONSchema;
export type ProjectUserCreateBody = FromSchema<typeof projectUserCreateBodySchema>;

export const projectUserCreateResponseSchema = projectUserSchema;
export type ProjectUserCreateResponse = FromSchema<typeof projectUserCreateResponseSchema>;

export const projectUserCreateParamsSchema = projectUsersListParamsSchema;
export type ProjectUserCreateParams = FromSchema<typeof projectUserCreateParamsSchema>;
