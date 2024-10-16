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
import type { Long } from '@grpc/proto-loader';

export interface TextGenerationTaskTextGenerationTrainParameters {
  base_model?: string;
  train_stream?: _caikit_runtime_Nlp_DataStreamSourceGenerationTrainRecord | null;
  torch_dtype?: string;
  max_source_length?: number | string | Long;
  max_target_length?: number | string | Long;
  batch_size?: number | string | Long;
  num_epochs?: number | string | Long;
  accumulate_steps?: number | string | Long;
  random_seed?: number | string | Long;
  lr?: number | string;
  use_iterable_dataset?: boolean;
  _torch_dtype?: 'torch_dtype';
  _max_source_length?: 'max_source_length';
  _max_target_length?: 'max_target_length';
  _batch_size?: 'batch_size';
  _num_epochs?: 'num_epochs';
  _accumulate_steps?: 'accumulate_steps';
  _random_seed?: 'random_seed';
  _lr?: 'lr';
  _use_iterable_dataset?: 'use_iterable_dataset';
}

export interface TextGenerationTaskTextGenerationTrainParameters__Output {
  base_model: string;
  train_stream: _caikit_runtime_Nlp_DataStreamSourceGenerationTrainRecord__Output | null;
  torch_dtype?: string;
  max_source_length?: number;
  max_target_length?: number;
  batch_size?: number;
  num_epochs?: number;
  accumulate_steps?: number;
  random_seed?: number;
  lr?: number;
  use_iterable_dataset?: boolean;
  _torch_dtype: 'torch_dtype';
  _max_source_length: 'max_source_length';
  _max_target_length: 'max_target_length';
  _batch_size: 'batch_size';
  _num_epochs: 'num_epochs';
  _accumulate_steps: 'accumulate_steps';
  _random_seed: 'random_seed';
  _lr: 'lr';
  _use_iterable_dataset: 'use_iterable_dataset';
}
