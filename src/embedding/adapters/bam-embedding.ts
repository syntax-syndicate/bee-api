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

import { Client } from '@ibm-generative-ai/node-sdk';
import pLimit from 'p-limit';
import { chunk } from 'remeda';

import { Embedding, EmbeddingOptions } from './embedding';

const MAX_EMBEDDING_INPUTS = 20;

export class BAMEmbedding extends Embedding {
  protected static limit = pLimit(5);

  constructor(
    public readonly model: string,
    public readonly client: Client
  ) {
    super(model);
  }

  async embedMany(texts: string[], options?: EmbeddingOptions): Promise<number[][]> {
    const results = await Promise.all(
      chunk(texts, MAX_EMBEDDING_INPUTS).map((texts) =>
        BAMEmbedding.limit(async () => {
          const response = await this.client.text.embedding.create(
            {
              model_id: this.model,
              input: texts,
              parameters: {
                truncate_input_tokens: true
              }
            },
            { signal: options?.signal }
          );
          if (response.results?.length !== texts.length) throw new Error('Missing embedding');
          return response.results.map((result) => result.embedding);
        })
      )
    );
    return results.flat();
  }
}
