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

import { vectorStoreExpirationAfterSchema } from '@/vector-stores/dtos/vector-store-expiration-after.js';
import { metadataSchema } from '@/schema.js';

export const vectorStoreSchema = {
  type: 'object',
  title: 'Vector store',
  description:
    'A vector store is a collection of processed files can be used by the `file_search` tool.',
  properties: {
    id: {
      description: 'The identifier, which can be referenced in API endpoints.',
      type: 'string'
    },
    object: {
      description: 'The object type, which is always `vector_store`.',
      type: 'string',
      enum: ['vector_store']
    },
    created_at: {
      description: 'The Unix timestamp (in seconds) for when the vector store was created.',
      type: 'integer'
    },
    name: {
      description: 'The name of the vector store.',
      type: 'string'
    },
    usage_bytes: {
      description: 'The total number of bytes used by the files in the vector store.',
      type: 'integer'
    },
    file_counts: {
      type: 'object',
      properties: {
        in_progress: {
          description: 'The number of files that are currently being processed.',
          type: 'integer'
        },
        completed: {
          description: 'The number of files that have been successfully processed.',
          type: 'integer'
        },
        failed: {
          description: 'The number of files that have failed to process.',
          type: 'integer'
        },
        cancelled: {
          description: 'The number of files that were cancelled.',
          type: 'integer'
        },
        total: {
          description: 'The total number of files.',
          type: 'integer'
        }
      },
      required: ['in_progress', 'completed', 'failed', 'cancelled', 'total']
    },
    status: {
      description:
        'The status of the vector store, which can be either `expired`, `in_progress`, or `completed`. A status of `completed` indicates that the vector store is ready for use.',
      type: 'string',
      enum: ['expired', 'in_progress', 'completed']
    },
    expires_after: vectorStoreExpirationAfterSchema,
    expires_at: {
      description: 'The Unix timestamp (in seconds) for when the vector store will expire.',
      type: 'integer',
      nullable: true
    },
    last_active_at: {
      description: 'The Unix timestamp (in seconds) for when the vector store was last active.',
      type: 'integer',
      nullable: true
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
    },
    metadata: metadataSchema
  },
  required: [
    'id',
    'object',
    'usage_bytes',
    'created_at',
    'status',
    'last_active_at',
    'name',
    'file_counts',
    'metadata'
  ]
} as const satisfies JSONSchema;

export type VectorStore = FromSchema<typeof vectorStoreSchema>;
