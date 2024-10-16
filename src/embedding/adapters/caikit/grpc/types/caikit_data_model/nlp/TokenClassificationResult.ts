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

import type { Long } from '@grpc/proto-loader';

export interface TokenClassificationResult {
  'start'?: (number | string | Long);
  'end'?: (number | string | Long);
  'word'?: (string);
  'entity'?: (string);
  'entity_group'?: (string);
  'score'?: (number | string);
  'token_count'?: (number | string | Long);
}

export interface TokenClassificationResult__Output {
  'start': (number);
  'end': (number);
  'word': (string);
  'entity': (string);
  'entity_group': (string);
  'score': (number);
  'token_count': (number);
}
