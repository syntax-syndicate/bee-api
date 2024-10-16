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

// Original file: null

import type {
  NullValue as _google_protobuf_NullValue,
  NullValue__Output as _google_protobuf_NullValue__Output
} from './NullValue';
import type {
  Struct as _google_protobuf_Struct,
  Struct__Output as _google_protobuf_Struct__Output
} from './Struct';
import type {
  ListValue as _google_protobuf_ListValue,
  ListValue__Output as _google_protobuf_ListValue__Output
} from './ListValue';

export interface Value {
  nullValue?: _google_protobuf_NullValue;
  numberValue?: number | string;
  stringValue?: string;
  boolValue?: boolean;
  structValue?: _google_protobuf_Struct | null;
  listValue?: _google_protobuf_ListValue | null;
  kind?: 'nullValue' | 'numberValue' | 'stringValue' | 'boolValue' | 'structValue' | 'listValue';
}

export interface Value__Output {
  nullValue?: _google_protobuf_NullValue__Output;
  numberValue?: number;
  stringValue?: string;
  boolValue?: boolean;
  structValue?: _google_protobuf_Struct__Output | null;
  listValue?: _google_protobuf_ListValue__Output | null;
  kind: 'nullValue' | 'numberValue' | 'stringValue' | 'boolValue' | 'structValue' | 'listValue';
}
