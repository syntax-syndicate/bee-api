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
  ConnectionTlsInfo as _caikit_data_model_common_ConnectionTlsInfo,
  ConnectionTlsInfo__Output as _caikit_data_model_common_ConnectionTlsInfo__Output
} from './ConnectionTlsInfo';
import type { Long } from '@grpc/proto-loader';

export interface ConnectionInfo {
  hostname?: string;
  port?: number | string | Long;
  tls?: _caikit_data_model_common_ConnectionTlsInfo | null;
  timeout?: number | string | Long;
  options?: { [key: string]: string };
  _port?: 'port';
  _tls?: 'tls';
  _timeout?: 'timeout';
}

export interface ConnectionInfo__Output {
  hostname: string;
  port?: number;
  tls?: _caikit_data_model_common_ConnectionTlsInfo__Output | null;
  timeout?: number;
  options: { [key: string]: string };
  _port: 'port';
  _tls: 'tls';
  _timeout: 'timeout';
}
