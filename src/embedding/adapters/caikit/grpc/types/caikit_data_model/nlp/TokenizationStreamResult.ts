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

// Original file: src/grpc/protos/caikit_data_model_nlp.proto

import type {
  Token as _caikit_data_model_nlp_Token,
  Token__Output as _caikit_data_model_nlp_Token__Output
} from './Token';
import type { Long } from '@grpc/proto-loader';

export interface TokenizationStreamResult {
  results?: _caikit_data_model_nlp_Token[];
  processed_index?: number | string | Long;
  start_index?: number | string | Long;
  token_count?: number | string | Long;
}

export interface TokenizationStreamResult__Output {
  results: _caikit_data_model_nlp_Token__Output[];
  processed_index: number;
  start_index: number;
  token_count: number;
}
