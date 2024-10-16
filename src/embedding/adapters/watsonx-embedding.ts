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

import { RestfulClient } from 'bee-agent-framework/internals/fetcher';

import { Embedding, EmbeddingOptions } from './embedding';

export class WatsonXEmbedding extends Embedding {
  constructor(
    public readonly model: string,
    public readonly project: string,
    public readonly client: RestfulClient<Record<string, string>>
  ) {
    super(model);
  }

  async embedMany(texts: string[], options?: EmbeddingOptions): Promise<number[][]> {
    const response: { results: { embedding: number[] }[] } = await this.client.fetch(
      '/ml/v1/text/embeddings',
      {
        method: 'POST',
        searchParams: new URLSearchParams({ version: '2023-10-25' }),
        body: JSON.stringify({
          inputs: texts,
          model_id: this.model,
          project_id: this.project,
          parameters: {
            truncate_input_tokens: 512
          }
        }),
        signal: options?.signal
      }
    );
    if (response.results?.length !== texts.length) throw new Error('Missing embedding');
    return response.results.map((result) => result.embedding);
  }
}
