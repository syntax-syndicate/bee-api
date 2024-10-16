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

import type { NlpServiceClient as _caikit_runtime_Nlp_NlpServiceClient, NlpServiceDefinition as _caikit_runtime_Nlp_NlpServiceDefinition } from './caikit/runtime/Nlp/NlpService';
import type { NlpTrainingServiceClient as _caikit_runtime_Nlp_NlpTrainingServiceClient, NlpTrainingServiceDefinition as _caikit_runtime_Nlp_NlpTrainingServiceDefinition } from './caikit/runtime/Nlp/NlpTrainingService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  caikit: {
    runtime: {
      Nlp: {
        BidiStreamingTokenClassificationTaskRequest: MessageTypeDefinition
        DataStreamSourceGenerationTrainRecord: MessageTypeDefinition
        DataStreamSourceGenerationTrainRecordJsonData: MessageTypeDefinition
        EmbeddingTaskRequest: MessageTypeDefinition
        EmbeddingTasksRequest: MessageTypeDefinition
        NlpService: SubtypeConstructor<typeof grpc.Client, _caikit_runtime_Nlp_NlpServiceClient> & { service: _caikit_runtime_Nlp_NlpServiceDefinition }
        NlpTrainingService: SubtypeConstructor<typeof grpc.Client, _caikit_runtime_Nlp_NlpTrainingServiceClient> & { service: _caikit_runtime_Nlp_NlpTrainingServiceDefinition }
        RerankTaskRequest: MessageTypeDefinition
        RerankTasksRequest: MessageTypeDefinition
        SentenceSimilarityTaskRequest: MessageTypeDefinition
        SentenceSimilarityTasksRequest: MessageTypeDefinition
        ServerStreamingTextGenerationTaskRequest: MessageTypeDefinition
        TextClassificationTaskRequest: MessageTypeDefinition
        TextGenerationTaskPeftPromptTuningTrainParameters: MessageTypeDefinition
        TextGenerationTaskPeftPromptTuningTrainRequest: MessageTypeDefinition
        TextGenerationTaskRequest: MessageTypeDefinition
        TextGenerationTaskTextGenerationTrainParameters: MessageTypeDefinition
        TextGenerationTaskTextGenerationTrainRequest: MessageTypeDefinition
        TokenClassificationTaskRequest: MessageTypeDefinition
        TokenizationTaskRequest: MessageTypeDefinition
      }
    }
  }
  caikit_data_model: {
    caikit_nlp: {
      EmbeddingResult: MessageTypeDefinition
      EmbeddingResults: MessageTypeDefinition
      ExponentialDecayLengthPenalty: MessageTypeDefinition
      GenerationTrainRecord: MessageTypeDefinition
      RerankResult: MessageTypeDefinition
      RerankResults: MessageTypeDefinition
      RerankScore: MessageTypeDefinition
      RerankScores: MessageTypeDefinition
      SentenceSimilarityResult: MessageTypeDefinition
      SentenceSimilarityResults: MessageTypeDefinition
      SentenceSimilarityScores: MessageTypeDefinition
      TuningConfig: MessageTypeDefinition
    }
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
    nlp: {
      ClassificationResult: MessageTypeDefinition
      ClassificationResults: MessageTypeDefinition
      ClassificationTrainRecord: MessageTypeDefinition
      ClassifiedGeneratedTextResult: MessageTypeDefinition
      ClassifiedGeneratedTextStreamResult: MessageTypeDefinition
      FinishReason: EnumTypeDefinition
      GeneratedTextResult: MessageTypeDefinition
      GeneratedTextStreamResult: MessageTypeDefinition
      GeneratedToken: MessageTypeDefinition
      InputWarning: MessageTypeDefinition
      InputWarningReason: EnumTypeDefinition
      TextGenTokenClassificationResults: MessageTypeDefinition
      Token: MessageTypeDefinition
      TokenClassificationResult: MessageTypeDefinition
      TokenClassificationResults: MessageTypeDefinition
      TokenClassificationStreamResult: MessageTypeDefinition
      TokenStreamDetails: MessageTypeDefinition
      TokenizationResults: MessageTypeDefinition
      TokenizationStreamResult: MessageTypeDefinition
    }
    runtime: {
      ModelPointer: MessageTypeDefinition
      TrainingInfoRequest: MessageTypeDefinition
      TrainingJob: MessageTypeDefinition
      TrainingStatusResponse: MessageTypeDefinition
    }
  }
  google: {
    protobuf: {
      ListValue: MessageTypeDefinition
      NullValue: EnumTypeDefinition
      Struct: MessageTypeDefinition
      Timestamp: MessageTypeDefinition
      Value: MessageTypeDefinition
    }
  }
}

