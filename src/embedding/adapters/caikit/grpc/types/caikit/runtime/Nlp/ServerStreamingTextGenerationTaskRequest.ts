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

// Original file: src/grpc/protos/caikit_runtime_Nlp.proto

import type { ExponentialDecayLengthPenalty as _caikit_data_model_caikit_nlp_ExponentialDecayLengthPenalty, ExponentialDecayLengthPenalty__Output as _caikit_data_model_caikit_nlp_ExponentialDecayLengthPenalty__Output } from '../../../caikit_data_model/caikit_nlp/ExponentialDecayLengthPenalty';
import type { Long } from '@grpc/proto-loader';

export interface ServerStreamingTextGenerationTaskRequest {
  'text'?: (string);
  'max_new_tokens'?: (number | string | Long);
  'min_new_tokens'?: (number | string | Long);
  'truncate_input_tokens'?: (number | string | Long);
  'decoding_method'?: (string);
  'top_k'?: (number | string | Long);
  'top_p'?: (number | string);
  'typical_p'?: (number | string);
  'temperature'?: (number | string);
  'repetition_penalty'?: (number | string);
  'max_time'?: (number | string);
  'exponential_decay_length_penalty'?: (_caikit_data_model_caikit_nlp_ExponentialDecayLengthPenalty | null);
  'stop_sequences'?: (string)[];
  'seed'?: (number | string | Long);
  'preserve_input_text'?: (boolean);
  '_max_new_tokens'?: "max_new_tokens";
  '_min_new_tokens'?: "min_new_tokens";
  '_truncate_input_tokens'?: "truncate_input_tokens";
  '_decoding_method'?: "decoding_method";
  '_top_k'?: "top_k";
  '_top_p'?: "top_p";
  '_typical_p'?: "typical_p";
  '_temperature'?: "temperature";
  '_repetition_penalty'?: "repetition_penalty";
  '_max_time'?: "max_time";
  '_exponential_decay_length_penalty'?: "exponential_decay_length_penalty";
  '_seed'?: "seed";
  '_preserve_input_text'?: "preserve_input_text";
}

export interface ServerStreamingTextGenerationTaskRequest__Output {
  'text': (string);
  'max_new_tokens'?: (number);
  'min_new_tokens'?: (number);
  'truncate_input_tokens'?: (number);
  'decoding_method'?: (string);
  'top_k'?: (number);
  'top_p'?: (number);
  'typical_p'?: (number);
  'temperature'?: (number);
  'repetition_penalty'?: (number);
  'max_time'?: (number);
  'exponential_decay_length_penalty'?: (_caikit_data_model_caikit_nlp_ExponentialDecayLengthPenalty__Output | null);
  'stop_sequences': (string)[];
  'seed'?: (number);
  'preserve_input_text'?: (boolean);
  '_max_new_tokens': "max_new_tokens";
  '_min_new_tokens': "min_new_tokens";
  '_truncate_input_tokens': "truncate_input_tokens";
  '_decoding_method': "decoding_method";
  '_top_k': "top_k";
  '_top_p': "top_p";
  '_typical_p': "typical_p";
  '_temperature': "temperature";
  '_repetition_penalty': "repetition_penalty";
  '_max_time': "max_time";
  '_exponential_decay_length_penalty': "exponential_decay_length_penalty";
  '_seed': "seed";
  '_preserve_input_text': "preserve_input_text";
}
