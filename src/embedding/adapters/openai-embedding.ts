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

import OpenAI from 'openai';

import { Embedding, EmbeddingOptions } from './embedding';

export class OpenAIEmbedding extends Embedding {
  constructor(
    public readonly model: string,
    public readonly client: OpenAI
  ) {
    super(model);
  }

  async embedMany(texts: string[], options?: EmbeddingOptions): Promise<number[][]> {
    const response = await this.client.embeddings.create(
      { model: this.model, input: texts },
      { signal: options?.signal }
    );
    return response.data.map((data) => data.embedding);
  }
}
