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
import type {
  ProducerId as _caikit_data_model_common_ProducerId,
  ProducerId__Output as _caikit_data_model_common_ProducerId__Output
} from '../common/ProducerId';
import type {
  GeneratedToken as _caikit_data_model_nlp_GeneratedToken,
  GeneratedToken__Output as _caikit_data_model_nlp_GeneratedToken__Output
} from './GeneratedToken';
import type { Long } from '@grpc/proto-loader';

export interface GeneratedTextResult {
  generated_text?: string;
  generated_tokens?: number | string | Long;
  finish_reason?: _caikit_data_model_nlp_FinishReason;
  producer_id?: _caikit_data_model_common_ProducerId | null;
  input_token_count?: number | string | Long;
  seed?: number | string | Long;
  tokens?: _caikit_data_model_nlp_GeneratedToken[];
  input_tokens?: _caikit_data_model_nlp_GeneratedToken[];
}

export interface GeneratedTextResult__Output {
  generated_text: string;
  generated_tokens: number;
  finish_reason: _caikit_data_model_nlp_FinishReason__Output;
  producer_id: _caikit_data_model_common_ProducerId__Output | null;
  input_token_count: number;
  seed: number;
  tokens: _caikit_data_model_nlp_GeneratedToken__Output[];
  input_tokens: _caikit_data_model_nlp_GeneratedToken__Output[];
}
