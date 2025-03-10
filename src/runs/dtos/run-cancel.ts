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

import { runParamsSchema, runSchema } from './run.js';

export const runCancelParamsSchema = runParamsSchema;
export type RunCancelParams = FromSchema<typeof runCancelParamsSchema>;

export const runCancelResponseSchema = runSchema;
export type RunCancelResponse = FromSchema<typeof runCancelResponseSchema>;
