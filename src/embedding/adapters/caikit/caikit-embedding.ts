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

import pLimit from 'p-limit';
import { chunk } from 'remeda';

import { Embedding, EmbeddingOptions } from '../embedding';

import { EmbeddingResults__Output } from './grpc/types/caikit_data_model/caikit_nlp/EmbeddingResults';
import { createGrpcMetadata } from './grpc/utils/metadata';
import { wrapGrpcCall } from './grpc/utils/wrappers';
import { EmbeddingTasksRequest } from './grpc/types/caikit/runtime/Nlp/EmbeddingTasksRequest';
import { NlpServiceClient } from './grpc/types/caikit/runtime/Nlp/NlpService';

const MAX_EMBEDDING_INPUTS = 100;

export class CaikitEmbedding extends Embedding {
  protected static limit = pLimit(5);

  constructor(
    public readonly model: string,
    public readonly client: NlpServiceClient
  ) {
    super(model);
  }

  async embedMany(texts: string[], options?: EmbeddingOptions): Promise<number[][]> {
    const results = await Promise.all(
      chunk(texts, MAX_EMBEDDING_INPUTS).map((texts) =>
        CaikitEmbedding.limit(async () => {
          const output = await wrapGrpcCall<EmbeddingTasksRequest, EmbeddingResults__Output>(
            this.client.embeddingTasksPredict.bind(this.client)
          )({ texts, truncate_input_tokens: 512 }, createGrpcMetadata({ modelId: this.model }), {
            signal: options?.signal
          });
          const embeddings = output.results?.vectors.map((vector) => {
            const embedding = vector[vector.data]?.values;
            if (!embedding) throw new Error('Missing embedding');
            return embedding;
          });
          if (embeddings?.length !== texts.length) throw new Error('Missing embedding');
          return embeddings;
        })
      )
    );
    return results.flat();
  }
}
