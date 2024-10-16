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

import { JSONSchema } from 'json-schema-to-ts';

import { VectorStoreExpirationAfterAnchor } from '@/vector-stores/entities/vector-store-expiration-after.entity.js';

export const vectorStoreExpirationAfterSchema = {
  type: 'object',
  title: 'Vector store expiration policy',
  description: 'The expiration policy for a vector store.',
  properties: {
    anchor: {
      description:
        'Anchor timestamp after which the expiration policy applies. Supported anchors: `last_active_at`.',
      type: 'string',
      enum: Object.values(VectorStoreExpirationAfterAnchor)
    },
    days: {
      description: 'The number of days after the anchor time that the vector store will expire.',
      type: 'integer',
      minimum: 1,
      maximum: 365
    }
  },
  required: ['anchor', 'days']
} as const satisfies JSONSchema;
