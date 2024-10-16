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

import { z } from 'zod';

import { DocumentStats, VectorDbDocument } from '../types.js';

export interface VectorStoreClient<SchemaType extends z.ZodType<VectorDbDocument>> {
  /**
   * Add documents to vector store
   * @param documents to be indexed
   */
  addDocuments: (documents: z.infer<SchemaType>[]) => Promise<DocumentStats>;
  /**
   * Search indexed documents in partitions
   * @param query vector with expected dimensions (e.g. consistent with config passed in constructor)
   * @param k number of documents to retrieve
   * @param vectorStoreFileIds vector stores files to search in, each vectorStoreFileId represents a set of indexed documents
   */
  similaritySearchVectorWithScore: (
    query: number[],
    k: number,
    vectorStoreFileIds: string[]
  ) => Promise<{ document: z.infer<SchemaType>; score: number }[]>;

  /**
   * Delete vector stores documents created from one or more files
   * @param vectorStoreFileIds vector store files to be deleted
   */
  dropVectorStoreFiles(vectorStoreFileIds: string[]): Promise<void>;
}
