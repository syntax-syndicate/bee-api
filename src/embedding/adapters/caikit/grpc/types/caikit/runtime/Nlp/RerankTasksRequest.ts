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

import type { Struct as _google_protobuf_Struct, Struct__Output as _google_protobuf_Struct__Output } from '../../../google/protobuf/Struct';
import type { Long } from '@grpc/proto-loader';

export interface RerankTasksRequest {
  'queries'?: (string)[];
  'documents'?: (_google_protobuf_Struct)[];
  'top_n'?: (number | string | Long);
  'truncate_input_tokens'?: (number | string | Long);
  'return_documents'?: (boolean);
  'return_queries'?: (boolean);
  'return_text'?: (boolean);
  '_top_n'?: "top_n";
  '_truncate_input_tokens'?: "truncate_input_tokens";
  '_return_documents'?: "return_documents";
  '_return_queries'?: "return_queries";
  '_return_text'?: "return_text";
}

export interface RerankTasksRequest__Output {
  'queries': (string)[];
  'documents': (_google_protobuf_Struct__Output)[];
  'top_n'?: (number);
  'truncate_input_tokens'?: (number);
  'return_documents'?: (boolean);
  'return_queries'?: (boolean);
  'return_text'?: (boolean);
  '_top_n': "top_n";
  '_truncate_input_tokens': "truncate_input_tokens";
  '_return_documents': "return_documents";
  '_return_queries': "return_queries";
  '_return_text': "return_text";
}
