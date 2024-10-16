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


export interface ConnectionTlsInfo {
  'enabled'?: (boolean);
  'insecure_verify'?: (boolean);
  'ca_file'?: (string);
  'cert_file'?: (string);
  'key_file'?: (string);
  '_enabled'?: "enabled";
  '_insecure_verify'?: "insecure_verify";
  '_ca_file'?: "ca_file";
  '_cert_file'?: "cert_file";
  '_key_file'?: "key_file";
}

export interface ConnectionTlsInfo__Output {
  'enabled'?: (boolean);
  'insecure_verify'?: (boolean);
  'ca_file'?: (string);
  'cert_file'?: (string);
  'key_file'?: (string);
  '_enabled': "enabled";
  '_insecure_verify': "insecure_verify";
  '_ca_file': "ca_file";
  '_cert_file': "cert_file";
  '_key_file': "key_file";
}
