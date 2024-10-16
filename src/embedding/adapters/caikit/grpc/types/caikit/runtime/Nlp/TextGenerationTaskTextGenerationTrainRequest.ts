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

import type {
  S3Path as _caikit_data_model_common_S3Path,
  S3Path__Output as _caikit_data_model_common_S3Path__Output
} from '../../../caikit_data_model/common/S3Path';
import type {
  TextGenerationTaskTextGenerationTrainParameters as _caikit_runtime_Nlp_TextGenerationTaskTextGenerationTrainParameters,
  TextGenerationTaskTextGenerationTrainParameters__Output as _caikit_runtime_Nlp_TextGenerationTaskTextGenerationTrainParameters__Output
} from './TextGenerationTaskTextGenerationTrainParameters';

export interface TextGenerationTaskTextGenerationTrainRequest {
  model_name?: string;
  output_path?: _caikit_data_model_common_S3Path | null;
  parameters?: _caikit_runtime_Nlp_TextGenerationTaskTextGenerationTrainParameters | null;
}

export interface TextGenerationTaskTextGenerationTrainRequest__Output {
  model_name: string;
  output_path: _caikit_data_model_common_S3Path__Output | null;
  parameters: _caikit_runtime_Nlp_TextGenerationTaskTextGenerationTrainParameters__Output | null;
}
