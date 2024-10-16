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

import { vectorStoreFileSchema } from './vector-store-file.js';

import { createPaginationQuerySchema, withPagination } from '@/schema.js';
import { vectorStoreFileCreateParamsSchema } from '@/vector-store-files/dtos/vector-store-file-create.js';

export const vectorStoreFilesListParamsSchema = vectorStoreFileCreateParamsSchema;
export type VectorStoreFilesListParams = FromSchema<typeof vectorStoreFilesListParamsSchema>;

export const vectorStoreFilesListQuerySchema = createPaginationQuerySchema();
export type VectorStoreFilesListQuery = FromSchema<typeof vectorStoreFilesListQuerySchema>;

export const vectorStoreFilesListResponseSchema = withPagination(vectorStoreFileSchema);
export type VectorStoreFilesListResponse = FromSchema<typeof vectorStoreFilesListResponseSchema>;
