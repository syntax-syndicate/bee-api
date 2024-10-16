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
  FinishReason as _caikit_data_model_nlp_FinishReason,
  FinishReason__Output as _caikit_data_model_nlp_FinishReason__Output
} from './FinishReason';
import type { Long } from '@grpc/proto-loader';

export interface TokenStreamDetails {
  finish_reason?: _caikit_data_model_nlp_FinishReason;
  generated_tokens?: number;
  seed?: number | string | Long;
  input_token_count?: number | string | Long;
}

export interface TokenStreamDetails__Output {
  finish_reason: _caikit_data_model_nlp_FinishReason__Output;
  generated_tokens: number;
  seed: number;
  input_token_count: number;
}
