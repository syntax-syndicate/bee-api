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

import { runStepSchema } from './run-step.js';

export const runStepReadParamsSchema = {
  type: 'object',
  required: ['thread_id', 'run_id', 'step_id'],
  properties: {
    thread_id: { type: 'string' },
    run_id: { type: 'string' },
    step_id: { type: 'string' }
  },
  additionalProperties: false
} as const satisfies JSONSchema;
export type RunStepReadParams = FromSchema<typeof runStepReadParamsSchema>;

export const runStepReadResponseSchema = runStepSchema;
export type RunStepReadResponse = FromSchema<typeof runStepReadResponseSchema>;
