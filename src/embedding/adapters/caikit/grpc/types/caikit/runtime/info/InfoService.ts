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

// Original file: src/grpc/protos/caikit_runtime_info.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { ModelInfoRequest as _caikit_data_model_common_runtime_ModelInfoRequest, ModelInfoRequest__Output as _caikit_data_model_common_runtime_ModelInfoRequest__Output } from '../../../caikit_data_model/common/runtime/ModelInfoRequest';
import type { ModelInfoResponse as _caikit_data_model_common_runtime_ModelInfoResponse, ModelInfoResponse__Output as _caikit_data_model_common_runtime_ModelInfoResponse__Output } from '../../../caikit_data_model/common/runtime/ModelInfoResponse';
import type { RuntimeInfoRequest as _caikit_data_model_common_runtime_RuntimeInfoRequest, RuntimeInfoRequest__Output as _caikit_data_model_common_runtime_RuntimeInfoRequest__Output } from '../../../caikit_data_model/common/runtime/RuntimeInfoRequest';
import type { RuntimeInfoResponse as _caikit_data_model_common_runtime_RuntimeInfoResponse, RuntimeInfoResponse__Output as _caikit_data_model_common_runtime_RuntimeInfoResponse__Output } from '../../../caikit_data_model/common/runtime/RuntimeInfoResponse';

export interface InfoServiceClient extends grpc.Client {
  GetModelsInfo(argument: _caikit_data_model_common_runtime_ModelInfoRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_caikit_data_model_common_runtime_ModelInfoResponse__Output>): grpc.ClientUnaryCall;
  GetModelsInfo(argument: _caikit_data_model_common_runtime_ModelInfoRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_caikit_data_model_common_runtime_ModelInfoResponse__Output>): grpc.ClientUnaryCall;
  GetModelsInfo(argument: _caikit_data_model_common_runtime_ModelInfoRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_caikit_data_model_common_runtime_ModelInfoResponse__Output>): grpc.ClientUnaryCall;
  GetModelsInfo(argument: _caikit_data_model_common_runtime_ModelInfoRequest, callback: grpc.requestCallback<_caikit_data_model_common_runtime_ModelInfoResponse__Output>): grpc.ClientUnaryCall;
  getModelsInfo(argument: _caikit_data_model_common_runtime_ModelInfoRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_caikit_data_model_common_runtime_ModelInfoResponse__Output>): grpc.ClientUnaryCall;
  getModelsInfo(argument: _caikit_data_model_common_runtime_ModelInfoRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_caikit_data_model_common_runtime_ModelInfoResponse__Output>): grpc.ClientUnaryCall;
  getModelsInfo(argument: _caikit_data_model_common_runtime_ModelInfoRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_caikit_data_model_common_runtime_ModelInfoResponse__Output>): grpc.ClientUnaryCall;
  getModelsInfo(argument: _caikit_data_model_common_runtime_ModelInfoRequest, callback: grpc.requestCallback<_caikit_data_model_common_runtime_ModelInfoResponse__Output>): grpc.ClientUnaryCall;
  
  GetRuntimeInfo(argument: _caikit_data_model_common_runtime_RuntimeInfoRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_caikit_data_model_common_runtime_RuntimeInfoResponse__Output>): grpc.ClientUnaryCall;
  GetRuntimeInfo(argument: _caikit_data_model_common_runtime_RuntimeInfoRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_caikit_data_model_common_runtime_RuntimeInfoResponse__Output>): grpc.ClientUnaryCall;
  GetRuntimeInfo(argument: _caikit_data_model_common_runtime_RuntimeInfoRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_caikit_data_model_common_runtime_RuntimeInfoResponse__Output>): grpc.ClientUnaryCall;
  GetRuntimeInfo(argument: _caikit_data_model_common_runtime_RuntimeInfoRequest, callback: grpc.requestCallback<_caikit_data_model_common_runtime_RuntimeInfoResponse__Output>): grpc.ClientUnaryCall;
  getRuntimeInfo(argument: _caikit_data_model_common_runtime_RuntimeInfoRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_caikit_data_model_common_runtime_RuntimeInfoResponse__Output>): grpc.ClientUnaryCall;
  getRuntimeInfo(argument: _caikit_data_model_common_runtime_RuntimeInfoRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_caikit_data_model_common_runtime_RuntimeInfoResponse__Output>): grpc.ClientUnaryCall;
  getRuntimeInfo(argument: _caikit_data_model_common_runtime_RuntimeInfoRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_caikit_data_model_common_runtime_RuntimeInfoResponse__Output>): grpc.ClientUnaryCall;
  getRuntimeInfo(argument: _caikit_data_model_common_runtime_RuntimeInfoRequest, callback: grpc.requestCallback<_caikit_data_model_common_runtime_RuntimeInfoResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface InfoServiceHandlers extends grpc.UntypedServiceImplementation {
  GetModelsInfo: grpc.handleUnaryCall<_caikit_data_model_common_runtime_ModelInfoRequest__Output, _caikit_data_model_common_runtime_ModelInfoResponse>;
  
  GetRuntimeInfo: grpc.handleUnaryCall<_caikit_data_model_common_runtime_RuntimeInfoRequest__Output, _caikit_data_model_common_runtime_RuntimeInfoResponse>;
  
}

export interface InfoServiceDefinition extends grpc.ServiceDefinition {
  GetModelsInfo: MethodDefinition<_caikit_data_model_common_runtime_ModelInfoRequest, _caikit_data_model_common_runtime_ModelInfoResponse, _caikit_data_model_common_runtime_ModelInfoRequest__Output, _caikit_data_model_common_runtime_ModelInfoResponse__Output>
  GetRuntimeInfo: MethodDefinition<_caikit_data_model_common_runtime_RuntimeInfoRequest, _caikit_data_model_common_runtime_RuntimeInfoResponse, _caikit_data_model_common_runtime_RuntimeInfoRequest__Output, _caikit_data_model_common_runtime_RuntimeInfoResponse__Output>
}
