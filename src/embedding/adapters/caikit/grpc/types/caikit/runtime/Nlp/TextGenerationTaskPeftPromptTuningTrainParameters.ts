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
  DataStreamSourceGenerationTrainRecord as _caikit_runtime_Nlp_DataStreamSourceGenerationTrainRecord,
  DataStreamSourceGenerationTrainRecord__Output as _caikit_runtime_Nlp_DataStreamSourceGenerationTrainRecord__Output
} from './DataStreamSourceGenerationTrainRecord';
import type {
  TuningConfig as _caikit_data_model_caikit_nlp_TuningConfig,
  TuningConfig__Output as _caikit_data_model_caikit_nlp_TuningConfig__Output
} from '../../../caikit_data_model/caikit_nlp/TuningConfig';
import type { Long } from '@grpc/proto-loader';

export interface TextGenerationTaskPeftPromptTuningTrainParameters {
  base_model?: string;
  train_stream?: _caikit_runtime_Nlp_DataStreamSourceGenerationTrainRecord | null;
  tuning_config?: _caikit_data_model_caikit_nlp_TuningConfig | null;
  val_stream?: _caikit_runtime_Nlp_DataStreamSourceGenerationTrainRecord | null;
  device?: string;
  tuning_type?: string;
  num_epochs?: number | string | Long;
  learning_rate?: number | string;
  verbalizer?: string;
  batch_size?: number | string | Long;
  max_source_length?: number | string | Long;
  max_target_length?: number | string | Long;
  accumulate_steps?: number | string | Long;
  torch_dtype?: string;
  silence_progress_bars?: boolean;
  seed?: number | string | Long;
  _val_stream?: 'val_stream';
  _device?: 'device';
  _tuning_type?: 'tuning_type';
  _num_epochs?: 'num_epochs';
  _learning_rate?: 'learning_rate';
  _verbalizer?: 'verbalizer';
  _batch_size?: 'batch_size';
  _max_source_length?: 'max_source_length';
  _max_target_length?: 'max_target_length';
  _accumulate_steps?: 'accumulate_steps';
  _torch_dtype?: 'torch_dtype';
  _silence_progress_bars?: 'silence_progress_bars';
  _seed?: 'seed';
}

export interface TextGenerationTaskPeftPromptTuningTrainParameters__Output {
  base_model: string;
  train_stream: _caikit_runtime_Nlp_DataStreamSourceGenerationTrainRecord__Output | null;
  tuning_config: _caikit_data_model_caikit_nlp_TuningConfig__Output | null;
  val_stream?: _caikit_runtime_Nlp_DataStreamSourceGenerationTrainRecord__Output | null;
  device?: string;
  tuning_type?: string;
  num_epochs?: number;
  learning_rate?: number;
  verbalizer?: string;
  batch_size?: number;
  max_source_length?: number;
  max_target_length?: number;
  accumulate_steps?: number;
  torch_dtype?: string;
  silence_progress_bars?: boolean;
  seed?: number;
  _val_stream: 'val_stream';
  _device: 'device';
  _tuning_type: 'tuning_type';
  _num_epochs: 'num_epochs';
  _learning_rate: 'learning_rate';
  _verbalizer: 'verbalizer';
  _batch_size: 'batch_size';
  _max_source_length: 'max_source_length';
  _max_target_length: 'max_target_length';
  _accumulate_steps: 'accumulate_steps';
  _torch_dtype: 'torch_dtype';
  _silence_progress_bars: 'silence_progress_bars';
  _seed: 'seed';
}
