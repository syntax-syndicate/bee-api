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

import { FilePurpose } from '../entities/file.entity.js';

import { fileSchema } from './file.js';

import { FromSchema, JSONSchema } from '@/ajv.js';

export const fileCreateBodySchema = {
  type: 'object',
  required: ['purpose', 'file'],
  additionalProperties: false,
  properties: {
    purpose: {
      type: 'string',
      enum: [FilePurpose.ASSISTANTS]
    },
    file: {
      isFile: true
    },
    depends_on_thread_id: {
      type: 'string'
    }
  }
} as const satisfies JSONSchema;
export type FileCreateBody = FromSchema<typeof fileCreateBodySchema>;

export const FileCreateResponseSchema = fileSchema;
export type FileCreateResponse = FromSchema<typeof FileCreateResponseSchema>;
