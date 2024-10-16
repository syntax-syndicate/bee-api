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

import { RunStepDetailsType } from '../entities/details/run-step-details.entity.js';
import { RunStepStatus } from '../entities/run-step.entity.js';

import { runStepDetailsSchema } from './run-step-details.js';

import { errorSchema } from '@/errors/dtos/error.js';
import { metadataSchema } from '@/schema.js';

export const runStepSchema = {
  type: 'object',
  required: [
    'id',
    'object',
    'thread_id',
    'assistant_id',
    'run_id',
    'type',
    'step_details',
    'metadata',
    'created_at'
  ],
  properties: {
    id: { type: 'string' },
    object: { const: 'thread.run.step' },
    thread_id: { type: 'string' },
    assistant_id: { type: 'string' },
    run_id: { type: 'string' },
    status: { type: 'string', enum: Object.values(RunStepStatus) },
    type: { type: 'string', enum: Object.values(RunStepDetailsType) },
    step_details: runStepDetailsSchema,
    last_error: {
      ...errorSchema,
      nullable: true
    },
    metadata: metadataSchema,
    created_at: { type: 'number' }
  }
} as const satisfies JSONSchema;
export type RunStep = FromSchema<typeof runStepSchema>;
