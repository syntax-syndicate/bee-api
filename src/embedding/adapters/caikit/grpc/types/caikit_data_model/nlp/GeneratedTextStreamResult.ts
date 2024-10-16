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
  GeneratedToken as _caikit_data_model_nlp_GeneratedToken,
  GeneratedToken__Output as _caikit_data_model_nlp_GeneratedToken__Output
} from './GeneratedToken';
import type {
  TokenStreamDetails as _caikit_data_model_nlp_TokenStreamDetails,
  TokenStreamDetails__Output as _caikit_data_model_nlp_TokenStreamDetails__Output
} from './TokenStreamDetails';
import type {
  ProducerId as _caikit_data_model_common_ProducerId,
  ProducerId__Output as _caikit_data_model_common_ProducerId__Output
} from '../common/ProducerId';

export interface GeneratedTextStreamResult {
  generated_text?: string;
  tokens?: _caikit_data_model_nlp_GeneratedToken[];
  details?: _caikit_data_model_nlp_TokenStreamDetails | null;
  producer_id?: _caikit_data_model_common_ProducerId | null;
  input_tokens?: _caikit_data_model_nlp_GeneratedToken[];
}

export interface GeneratedTextStreamResult__Output {
  generated_text: string;
  tokens: _caikit_data_model_nlp_GeneratedToken__Output[];
  details: _caikit_data_model_nlp_TokenStreamDetails__Output | null;
  producer_id: _caikit_data_model_common_ProducerId__Output | null;
  input_tokens: _caikit_data_model_nlp_GeneratedToken__Output[];
}
