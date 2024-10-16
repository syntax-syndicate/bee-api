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
  TextGenTokenClassificationResults as _caikit_data_model_nlp_TextGenTokenClassificationResults,
  TextGenTokenClassificationResults__Output as _caikit_data_model_nlp_TextGenTokenClassificationResults__Output
} from './TextGenTokenClassificationResults';
import type {
  FinishReason as _caikit_data_model_nlp_FinishReason,
  FinishReason__Output as _caikit_data_model_nlp_FinishReason__Output
} from './FinishReason';
import type {
  InputWarning as _caikit_data_model_nlp_InputWarning,
  InputWarning__Output as _caikit_data_model_nlp_InputWarning__Output
} from './InputWarning';
import type {
  GeneratedToken as _caikit_data_model_nlp_GeneratedToken,
  GeneratedToken__Output as _caikit_data_model_nlp_GeneratedToken__Output
} from './GeneratedToken';
import type { Long } from '@grpc/proto-loader';

export interface ClassifiedGeneratedTextResult {
  generated_text?: string;
  token_classification_results?: _caikit_data_model_nlp_TextGenTokenClassificationResults | null;
  finish_reason?: _caikit_data_model_nlp_FinishReason;
  generated_token_count?: number | string | Long;
  seed?: number | string | Long;
  input_token_count?: number | string | Long;
  warnings?: _caikit_data_model_nlp_InputWarning[];
  tokens?: _caikit_data_model_nlp_GeneratedToken[];
  input_tokens?: _caikit_data_model_nlp_GeneratedToken[];
}

export interface ClassifiedGeneratedTextResult__Output {
  generated_text: string;
  token_classification_results: _caikit_data_model_nlp_TextGenTokenClassificationResults__Output | null;
  finish_reason: _caikit_data_model_nlp_FinishReason__Output;
  generated_token_count: number;
  seed: number;
  input_token_count: number;
  warnings: _caikit_data_model_nlp_InputWarning__Output[];
  tokens: _caikit_data_model_nlp_GeneratedToken__Output[];
  input_tokens: _caikit_data_model_nlp_GeneratedToken__Output[];
}
