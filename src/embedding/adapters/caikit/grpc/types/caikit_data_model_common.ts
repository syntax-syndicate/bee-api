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

import type * as grpc from '@grpc/grpc-js';
import type { EnumTypeDefinition, MessageTypeDefinition } from '@grpc/proto-loader';


type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  caikit_data_model: {
    common: {
      BoolSequence: MessageTypeDefinition
      ConnectionInfo: MessageTypeDefinition
      ConnectionTlsInfo: MessageTypeDefinition
      Directory: MessageTypeDefinition
      File: MessageTypeDefinition
      FileReference: MessageTypeDefinition
      FloatSequence: MessageTypeDefinition
      IntSequence: MessageTypeDefinition
      ListOfFileReferences: MessageTypeDefinition
      ListOfVector1D: MessageTypeDefinition
      NpFloat32Sequence: MessageTypeDefinition
      NpFloat64Sequence: MessageTypeDefinition
      ProducerId: MessageTypeDefinition
      ProducerPriority: MessageTypeDefinition
      PyFloatSequence: MessageTypeDefinition
      S3Base: MessageTypeDefinition
      S3Files: MessageTypeDefinition
      S3Path: MessageTypeDefinition
      StrSequence: MessageTypeDefinition
      TrainingStatus: EnumTypeDefinition
      Vector1D: MessageTypeDefinition
    }
  }
}

