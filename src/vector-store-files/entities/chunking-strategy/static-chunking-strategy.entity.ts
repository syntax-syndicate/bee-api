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

import { Embeddable, Property } from '@mikro-orm/core';

import { ChunkingStrategy, ChunkingStrategyType } from './chunking-strategy.entity.js';

@Embeddable({ discriminatorValue: ChunkingStrategyType.STATIC })
export class StaticChunkingStrategy extends ChunkingStrategy {
  type = ChunkingStrategyType.STATIC;

  @Property()
  max_chunk_size_tokens!: number;

  @Property()
  chunk_overlap_tokens!: number;

  constructor(input: StaticChunkingStrategyCreationInput) {
    super();
    this.max_chunk_size_tokens = input.max_chunk_size_tokens;
    this.chunk_overlap_tokens = input.chunk_overlap_tokens;
  }
}

export type StaticChunkingStrategyCreationInput = Pick<
  StaticChunkingStrategy,
  'max_chunk_size_tokens' | 'chunk_overlap_tokens'
>;
