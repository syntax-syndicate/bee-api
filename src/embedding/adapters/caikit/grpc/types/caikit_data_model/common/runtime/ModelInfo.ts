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

// Original file: src/grpc/protos/caikit_data_model_common_runtime.proto

import type { Struct as _google_protobuf_Struct, Struct__Output as _google_protobuf_Struct__Output } from '../../../google/protobuf/Struct';
import type { Long } from '@grpc/proto-loader';

export interface ModelInfo {
  'model_path'?: (string);
  'name'?: (string);
  'size'?: (number | string | Long);
  'metadata'?: (_google_protobuf_Struct | null);
  'module_id'?: (string);
  'module_metadata'?: ({[key: string]: string});
  'loaded'?: (boolean);
}

export interface ModelInfo__Output {
  'model_path': (string);
  'name': (string);
  'size': (number);
  'metadata': (_google_protobuf_Struct__Output | null);
  'module_id': (string);
  'module_metadata': ({[key: string]: string});
  'loaded': (boolean);
}
