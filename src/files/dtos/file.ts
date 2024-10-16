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

import { FilePurpose } from '../entities/file.entity.js';

export const fileSchema = {
  type: 'object',
  required: ['id', 'bytes', 'created_at', 'filename', 'object', 'purpose'],
  properties: {
    id: { type: 'string' },
    bytes: { type: 'integer' },
    created_at: { type: 'number' },
    filename: { type: 'string' },
    object: { const: 'file' },
    purpose: {
      type: 'string',
      enum: Object.values(FilePurpose)
    },
    depends_on: {
      type: 'object',
      required: ['thread'],
      properties: {
        thread: {
          type: 'object',
          required: ['id'],
          properties: {
            id: {
              type: 'string'
            }
          }
        }
      }
    }
  }
} as const satisfies JSONSchema;
export type File = FromSchema<typeof fileSchema>;
