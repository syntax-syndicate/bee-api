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

// Original file: src/grpc/protos/caikit_data_model_runtime.proto

import type {
  TrainingStatus as _caikit_data_model_common_TrainingStatus,
  TrainingStatus__Output as _caikit_data_model_common_TrainingStatus__Output
} from '../common/TrainingStatus';
import type {
  Timestamp as _google_protobuf_Timestamp,
  Timestamp__Output as _google_protobuf_Timestamp__Output
} from '../../google/protobuf/Timestamp';

export interface TrainingStatusResponse {
  training_id?: string;
  state?: _caikit_data_model_common_TrainingStatus;
  submission_timestamp?: _google_protobuf_Timestamp | null;
  completion_timestamp?: _google_protobuf_Timestamp | null;
  reasons?: string[];
}

export interface TrainingStatusResponse__Output {
  training_id: string;
  state: _caikit_data_model_common_TrainingStatus__Output;
  submission_timestamp: _google_protobuf_Timestamp__Output | null;
  completion_timestamp: _google_protobuf_Timestamp__Output | null;
  reasons: string[];
}
