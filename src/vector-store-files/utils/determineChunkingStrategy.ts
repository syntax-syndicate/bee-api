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

import { ChunkingStrategyRequestParam } from '@/vector-store-files/dtos/chunking-strategy.js';
import { StaticChunkingStrategy } from '@/vector-store-files/entities/chunking-strategy/static-chunking-strategy.entity.js';
import { ChunkingStrategy } from '@/vector-store-files/entities/chunking-strategy/chunking-strategy.entity.js';
import {
  VECTOR_STORE_DEFAULT_CHUNK_OVERLAP_TOKENS,
  VECTOR_STORE_DEFAULT_MAX_CHUNK_SIZE_TOKENS
} from '@/vector-stores/constants.js';

export function determineChunkingStrategy(param?: ChunkingStrategyRequestParam): ChunkingStrategy {
  const defaultStrategy = new StaticChunkingStrategy({
    max_chunk_size_tokens: VECTOR_STORE_DEFAULT_MAX_CHUNK_SIZE_TOKENS,
    chunk_overlap_tokens: VECTOR_STORE_DEFAULT_CHUNK_OVERLAP_TOKENS
  });
  if (!param) return defaultStrategy;

  switch (param.type) {
    case 'auto':
      return defaultStrategy;
    case 'static':
      return new StaticChunkingStrategy({
        max_chunk_size_tokens: param.static.max_chunk_size_tokens,
        chunk_overlap_tokens: param.static.chunk_overlap_tokens
      });
  }
}
