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

// Original file: src/grpc/protos/caikit_data_model_caikit_nlp.proto

import type {
  RerankScores as _caikit_data_model_caikit_nlp_RerankScores,
  RerankScores__Output as _caikit_data_model_caikit_nlp_RerankScores__Output
} from './RerankScores';
import type {
  ProducerId as _caikit_data_model_common_ProducerId,
  ProducerId__Output as _caikit_data_model_common_ProducerId__Output
} from '../common/ProducerId';
import type { Long } from '@grpc/proto-loader';

export interface RerankResults {
  results?: _caikit_data_model_caikit_nlp_RerankScores[];
  producer_id?: _caikit_data_model_common_ProducerId | null;
  input_token_count?: number | string | Long;
}

export interface RerankResults__Output {
  results: _caikit_data_model_caikit_nlp_RerankScores__Output[];
  producer_id: _caikit_data_model_common_ProducerId__Output | null;
  input_token_count: number;
}
