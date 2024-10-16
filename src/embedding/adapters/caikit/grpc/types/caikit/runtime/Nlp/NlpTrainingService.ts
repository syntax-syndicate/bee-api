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

import type * as grpc from '@grpc/grpc-js';
import type { MethodDefinition } from '@grpc/proto-loader';
import type {
  TextGenerationTaskPeftPromptTuningTrainRequest as _caikit_runtime_Nlp_TextGenerationTaskPeftPromptTuningTrainRequest,
  TextGenerationTaskPeftPromptTuningTrainRequest__Output as _caikit_runtime_Nlp_TextGenerationTaskPeftPromptTuningTrainRequest__Output
} from './TextGenerationTaskPeftPromptTuningTrainRequest';
import type {
  TextGenerationTaskTextGenerationTrainRequest as _caikit_runtime_Nlp_TextGenerationTaskTextGenerationTrainRequest,
  TextGenerationTaskTextGenerationTrainRequest__Output as _caikit_runtime_Nlp_TextGenerationTaskTextGenerationTrainRequest__Output
} from './TextGenerationTaskTextGenerationTrainRequest';
import type {
  TrainingJob as _caikit_data_model_runtime_TrainingJob,
  TrainingJob__Output as _caikit_data_model_runtime_TrainingJob__Output
} from '../../../caikit_data_model/runtime/TrainingJob';

export interface NlpTrainingServiceClient extends grpc.Client {
  TextGenerationTaskPeftPromptTuningTrain(
    argument: _caikit_runtime_Nlp_TextGenerationTaskPeftPromptTuningTrainRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_runtime_TrainingJob__Output>
  ): grpc.ClientUnaryCall;
  TextGenerationTaskPeftPromptTuningTrain(
    argument: _caikit_runtime_Nlp_TextGenerationTaskPeftPromptTuningTrainRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_caikit_data_model_runtime_TrainingJob__Output>
  ): grpc.ClientUnaryCall;
  TextGenerationTaskPeftPromptTuningTrain(
    argument: _caikit_runtime_Nlp_TextGenerationTaskPeftPromptTuningTrainRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_runtime_TrainingJob__Output>
  ): grpc.ClientUnaryCall;
  TextGenerationTaskPeftPromptTuningTrain(
    argument: _caikit_runtime_Nlp_TextGenerationTaskPeftPromptTuningTrainRequest,
    callback: grpc.requestCallback<_caikit_data_model_runtime_TrainingJob__Output>
  ): grpc.ClientUnaryCall;
  textGenerationTaskPeftPromptTuningTrain(
    argument: _caikit_runtime_Nlp_TextGenerationTaskPeftPromptTuningTrainRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_runtime_TrainingJob__Output>
  ): grpc.ClientUnaryCall;
  textGenerationTaskPeftPromptTuningTrain(
    argument: _caikit_runtime_Nlp_TextGenerationTaskPeftPromptTuningTrainRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_caikit_data_model_runtime_TrainingJob__Output>
  ): grpc.ClientUnaryCall;
  textGenerationTaskPeftPromptTuningTrain(
    argument: _caikit_runtime_Nlp_TextGenerationTaskPeftPromptTuningTrainRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_runtime_TrainingJob__Output>
  ): grpc.ClientUnaryCall;
  textGenerationTaskPeftPromptTuningTrain(
    argument: _caikit_runtime_Nlp_TextGenerationTaskPeftPromptTuningTrainRequest,
    callback: grpc.requestCallback<_caikit_data_model_runtime_TrainingJob__Output>
  ): grpc.ClientUnaryCall;

  TextGenerationTaskTextGenerationTrain(
    argument: _caikit_runtime_Nlp_TextGenerationTaskTextGenerationTrainRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_runtime_TrainingJob__Output>
  ): grpc.ClientUnaryCall;
  TextGenerationTaskTextGenerationTrain(
    argument: _caikit_runtime_Nlp_TextGenerationTaskTextGenerationTrainRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_caikit_data_model_runtime_TrainingJob__Output>
  ): grpc.ClientUnaryCall;
  TextGenerationTaskTextGenerationTrain(
    argument: _caikit_runtime_Nlp_TextGenerationTaskTextGenerationTrainRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_runtime_TrainingJob__Output>
  ): grpc.ClientUnaryCall;
  TextGenerationTaskTextGenerationTrain(
    argument: _caikit_runtime_Nlp_TextGenerationTaskTextGenerationTrainRequest,
    callback: grpc.requestCallback<_caikit_data_model_runtime_TrainingJob__Output>
  ): grpc.ClientUnaryCall;
  textGenerationTaskTextGenerationTrain(
    argument: _caikit_runtime_Nlp_TextGenerationTaskTextGenerationTrainRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_runtime_TrainingJob__Output>
  ): grpc.ClientUnaryCall;
  textGenerationTaskTextGenerationTrain(
    argument: _caikit_runtime_Nlp_TextGenerationTaskTextGenerationTrainRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_caikit_data_model_runtime_TrainingJob__Output>
  ): grpc.ClientUnaryCall;
  textGenerationTaskTextGenerationTrain(
    argument: _caikit_runtime_Nlp_TextGenerationTaskTextGenerationTrainRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_runtime_TrainingJob__Output>
  ): grpc.ClientUnaryCall;
  textGenerationTaskTextGenerationTrain(
    argument: _caikit_runtime_Nlp_TextGenerationTaskTextGenerationTrainRequest,
    callback: grpc.requestCallback<_caikit_data_model_runtime_TrainingJob__Output>
  ): grpc.ClientUnaryCall;
}

export interface NlpTrainingServiceHandlers extends grpc.UntypedServiceImplementation {
  TextGenerationTaskPeftPromptTuningTrain: grpc.handleUnaryCall<
    _caikit_runtime_Nlp_TextGenerationTaskPeftPromptTuningTrainRequest__Output,
    _caikit_data_model_runtime_TrainingJob
  >;

  TextGenerationTaskTextGenerationTrain: grpc.handleUnaryCall<
    _caikit_runtime_Nlp_TextGenerationTaskTextGenerationTrainRequest__Output,
    _caikit_data_model_runtime_TrainingJob
  >;
}

export interface NlpTrainingServiceDefinition extends grpc.ServiceDefinition {
  TextGenerationTaskPeftPromptTuningTrain: MethodDefinition<
    _caikit_runtime_Nlp_TextGenerationTaskPeftPromptTuningTrainRequest,
    _caikit_data_model_runtime_TrainingJob,
    _caikit_runtime_Nlp_TextGenerationTaskPeftPromptTuningTrainRequest__Output,
    _caikit_data_model_runtime_TrainingJob__Output
  >;
  TextGenerationTaskTextGenerationTrain: MethodDefinition<
    _caikit_runtime_Nlp_TextGenerationTaskTextGenerationTrainRequest,
    _caikit_data_model_runtime_TrainingJob,
    _caikit_runtime_Nlp_TextGenerationTaskTextGenerationTrainRequest__Output,
    _caikit_data_model_runtime_TrainingJob__Output
  >;
}
