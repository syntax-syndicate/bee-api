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

// Original file: src/grpc/protos/caikit_data_model_common.proto

import type {
  PyFloatSequence as _caikit_data_model_common_PyFloatSequence,
  PyFloatSequence__Output as _caikit_data_model_common_PyFloatSequence__Output
} from './PyFloatSequence';
import type {
  NpFloat32Sequence as _caikit_data_model_common_NpFloat32Sequence,
  NpFloat32Sequence__Output as _caikit_data_model_common_NpFloat32Sequence__Output
} from './NpFloat32Sequence';
import type {
  NpFloat64Sequence as _caikit_data_model_common_NpFloat64Sequence,
  NpFloat64Sequence__Output as _caikit_data_model_common_NpFloat64Sequence__Output
} from './NpFloat64Sequence';

export interface Vector1D {
  data_pyfloatsequence?: _caikit_data_model_common_PyFloatSequence | null;
  data_npfloat32sequence?: _caikit_data_model_common_NpFloat32Sequence | null;
  data_npfloat64sequence?: _caikit_data_model_common_NpFloat64Sequence | null;
  data?: 'data_pyfloatsequence' | 'data_npfloat32sequence' | 'data_npfloat64sequence';
}

export interface Vector1D__Output {
  data_pyfloatsequence?: _caikit_data_model_common_PyFloatSequence__Output | null;
  data_npfloat32sequence?: _caikit_data_model_common_NpFloat32Sequence__Output | null;
  data_npfloat64sequence?: _caikit_data_model_common_NpFloat64Sequence__Output | null;
  data: 'data_pyfloatsequence' | 'data_npfloat32sequence' | 'data_npfloat64sequence';
}
