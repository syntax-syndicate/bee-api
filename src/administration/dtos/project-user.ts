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

export const projectUserSchema = {
  type: 'object',
  required: ['object', 'id', 'name', 'email', 'role', 'added_at'],
  properties: {
    object: { const: 'organization.project.user' },
    id: { type: 'string' },
    name: { type: 'string' },
    email: { type: 'string' },
    role: { type: 'string', enum: Object.values(ProjectRole) },
    added_at: { type: 'number' }
  }
} as const satisfies JSONSchema;
export type ProjectUser = FromSchema<typeof projectUserSchema>;
