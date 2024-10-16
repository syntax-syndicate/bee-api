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
  BidiStreamingTokenClassificationTaskRequest as _caikit_runtime_Nlp_BidiStreamingTokenClassificationTaskRequest,
  BidiStreamingTokenClassificationTaskRequest__Output as _caikit_runtime_Nlp_BidiStreamingTokenClassificationTaskRequest__Output
} from './BidiStreamingTokenClassificationTaskRequest';
import type {
  ClassificationResults as _caikit_data_model_nlp_ClassificationResults,
  ClassificationResults__Output as _caikit_data_model_nlp_ClassificationResults__Output
} from '../../../caikit_data_model/nlp/ClassificationResults';
import type {
  EmbeddingResult as _caikit_data_model_caikit_nlp_EmbeddingResult,
  EmbeddingResult__Output as _caikit_data_model_caikit_nlp_EmbeddingResult__Output
} from '../../../caikit_data_model/caikit_nlp/EmbeddingResult';
import type {
  EmbeddingResults as _caikit_data_model_caikit_nlp_EmbeddingResults,
  EmbeddingResults__Output as _caikit_data_model_caikit_nlp_EmbeddingResults__Output
} from '../../../caikit_data_model/caikit_nlp/EmbeddingResults';
import type {
  EmbeddingTaskRequest as _caikit_runtime_Nlp_EmbeddingTaskRequest,
  EmbeddingTaskRequest__Output as _caikit_runtime_Nlp_EmbeddingTaskRequest__Output
} from './EmbeddingTaskRequest';
import type {
  EmbeddingTasksRequest as _caikit_runtime_Nlp_EmbeddingTasksRequest,
  EmbeddingTasksRequest__Output as _caikit_runtime_Nlp_EmbeddingTasksRequest__Output
} from './EmbeddingTasksRequest';
import type {
  GeneratedTextResult as _caikit_data_model_nlp_GeneratedTextResult,
  GeneratedTextResult__Output as _caikit_data_model_nlp_GeneratedTextResult__Output
} from '../../../caikit_data_model/nlp/GeneratedTextResult';
import type {
  GeneratedTextStreamResult as _caikit_data_model_nlp_GeneratedTextStreamResult,
  GeneratedTextStreamResult__Output as _caikit_data_model_nlp_GeneratedTextStreamResult__Output
} from '../../../caikit_data_model/nlp/GeneratedTextStreamResult';
import type {
  RerankResult as _caikit_data_model_caikit_nlp_RerankResult,
  RerankResult__Output as _caikit_data_model_caikit_nlp_RerankResult__Output
} from '../../../caikit_data_model/caikit_nlp/RerankResult';
import type {
  RerankResults as _caikit_data_model_caikit_nlp_RerankResults,
  RerankResults__Output as _caikit_data_model_caikit_nlp_RerankResults__Output
} from '../../../caikit_data_model/caikit_nlp/RerankResults';
import type {
  RerankTaskRequest as _caikit_runtime_Nlp_RerankTaskRequest,
  RerankTaskRequest__Output as _caikit_runtime_Nlp_RerankTaskRequest__Output
} from './RerankTaskRequest';
import type {
  RerankTasksRequest as _caikit_runtime_Nlp_RerankTasksRequest,
  RerankTasksRequest__Output as _caikit_runtime_Nlp_RerankTasksRequest__Output
} from './RerankTasksRequest';
import type {
  SentenceSimilarityResult as _caikit_data_model_caikit_nlp_SentenceSimilarityResult,
  SentenceSimilarityResult__Output as _caikit_data_model_caikit_nlp_SentenceSimilarityResult__Output
} from '../../../caikit_data_model/caikit_nlp/SentenceSimilarityResult';
import type {
  SentenceSimilarityResults as _caikit_data_model_caikit_nlp_SentenceSimilarityResults,
  SentenceSimilarityResults__Output as _caikit_data_model_caikit_nlp_SentenceSimilarityResults__Output
} from '../../../caikit_data_model/caikit_nlp/SentenceSimilarityResults';
import type {
  SentenceSimilarityTaskRequest as _caikit_runtime_Nlp_SentenceSimilarityTaskRequest,
  SentenceSimilarityTaskRequest__Output as _caikit_runtime_Nlp_SentenceSimilarityTaskRequest__Output
} from './SentenceSimilarityTaskRequest';
import type {
  SentenceSimilarityTasksRequest as _caikit_runtime_Nlp_SentenceSimilarityTasksRequest,
  SentenceSimilarityTasksRequest__Output as _caikit_runtime_Nlp_SentenceSimilarityTasksRequest__Output
} from './SentenceSimilarityTasksRequest';
import type {
  ServerStreamingTextGenerationTaskRequest as _caikit_runtime_Nlp_ServerStreamingTextGenerationTaskRequest,
  ServerStreamingTextGenerationTaskRequest__Output as _caikit_runtime_Nlp_ServerStreamingTextGenerationTaskRequest__Output
} from './ServerStreamingTextGenerationTaskRequest';
import type {
  TextClassificationTaskRequest as _caikit_runtime_Nlp_TextClassificationTaskRequest,
  TextClassificationTaskRequest__Output as _caikit_runtime_Nlp_TextClassificationTaskRequest__Output
} from './TextClassificationTaskRequest';
import type {
  TextGenerationTaskRequest as _caikit_runtime_Nlp_TextGenerationTaskRequest,
  TextGenerationTaskRequest__Output as _caikit_runtime_Nlp_TextGenerationTaskRequest__Output
} from './TextGenerationTaskRequest';
import type {
  TokenClassificationResults as _caikit_data_model_nlp_TokenClassificationResults,
  TokenClassificationResults__Output as _caikit_data_model_nlp_TokenClassificationResults__Output
} from '../../../caikit_data_model/nlp/TokenClassificationResults';
import type {
  TokenClassificationStreamResult as _caikit_data_model_nlp_TokenClassificationStreamResult,
  TokenClassificationStreamResult__Output as _caikit_data_model_nlp_TokenClassificationStreamResult__Output
} from '../../../caikit_data_model/nlp/TokenClassificationStreamResult';
import type {
  TokenClassificationTaskRequest as _caikit_runtime_Nlp_TokenClassificationTaskRequest,
  TokenClassificationTaskRequest__Output as _caikit_runtime_Nlp_TokenClassificationTaskRequest__Output
} from './TokenClassificationTaskRequest';
import type {
  TokenizationResults as _caikit_data_model_nlp_TokenizationResults,
  TokenizationResults__Output as _caikit_data_model_nlp_TokenizationResults__Output
} from '../../../caikit_data_model/nlp/TokenizationResults';
import type {
  TokenizationTaskRequest as _caikit_runtime_Nlp_TokenizationTaskRequest,
  TokenizationTaskRequest__Output as _caikit_runtime_Nlp_TokenizationTaskRequest__Output
} from './TokenizationTaskRequest';

export interface NlpServiceClient extends grpc.Client {
  BidiStreamingTokenClassificationTaskPredict(
    metadata: grpc.Metadata,
    options?: grpc.CallOptions
  ): grpc.ClientDuplexStream<
    _caikit_runtime_Nlp_BidiStreamingTokenClassificationTaskRequest,
    _caikit_data_model_nlp_TokenClassificationStreamResult__Output
  >;
  BidiStreamingTokenClassificationTaskPredict(
    options?: grpc.CallOptions
  ): grpc.ClientDuplexStream<
    _caikit_runtime_Nlp_BidiStreamingTokenClassificationTaskRequest,
    _caikit_data_model_nlp_TokenClassificationStreamResult__Output
  >;
  bidiStreamingTokenClassificationTaskPredict(
    metadata: grpc.Metadata,
    options?: grpc.CallOptions
  ): grpc.ClientDuplexStream<
    _caikit_runtime_Nlp_BidiStreamingTokenClassificationTaskRequest,
    _caikit_data_model_nlp_TokenClassificationStreamResult__Output
  >;
  bidiStreamingTokenClassificationTaskPredict(
    options?: grpc.CallOptions
  ): grpc.ClientDuplexStream<
    _caikit_runtime_Nlp_BidiStreamingTokenClassificationTaskRequest,
    _caikit_data_model_nlp_TokenClassificationStreamResult__Output
  >;

  EmbeddingTaskPredict(
    argument: _caikit_runtime_Nlp_EmbeddingTaskRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_EmbeddingResult__Output>
  ): grpc.ClientUnaryCall;
  EmbeddingTaskPredict(
    argument: _caikit_runtime_Nlp_EmbeddingTaskRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_EmbeddingResult__Output>
  ): grpc.ClientUnaryCall;
  EmbeddingTaskPredict(
    argument: _caikit_runtime_Nlp_EmbeddingTaskRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_EmbeddingResult__Output>
  ): grpc.ClientUnaryCall;
  EmbeddingTaskPredict(
    argument: _caikit_runtime_Nlp_EmbeddingTaskRequest,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_EmbeddingResult__Output>
  ): grpc.ClientUnaryCall;
  embeddingTaskPredict(
    argument: _caikit_runtime_Nlp_EmbeddingTaskRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_EmbeddingResult__Output>
  ): grpc.ClientUnaryCall;
  embeddingTaskPredict(
    argument: _caikit_runtime_Nlp_EmbeddingTaskRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_EmbeddingResult__Output>
  ): grpc.ClientUnaryCall;
  embeddingTaskPredict(
    argument: _caikit_runtime_Nlp_EmbeddingTaskRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_EmbeddingResult__Output>
  ): grpc.ClientUnaryCall;
  embeddingTaskPredict(
    argument: _caikit_runtime_Nlp_EmbeddingTaskRequest,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_EmbeddingResult__Output>
  ): grpc.ClientUnaryCall;

  EmbeddingTasksPredict(
    argument: _caikit_runtime_Nlp_EmbeddingTasksRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_EmbeddingResults__Output>
  ): grpc.ClientUnaryCall;
  EmbeddingTasksPredict(
    argument: _caikit_runtime_Nlp_EmbeddingTasksRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_EmbeddingResults__Output>
  ): grpc.ClientUnaryCall;
  EmbeddingTasksPredict(
    argument: _caikit_runtime_Nlp_EmbeddingTasksRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_EmbeddingResults__Output>
  ): grpc.ClientUnaryCall;
  EmbeddingTasksPredict(
    argument: _caikit_runtime_Nlp_EmbeddingTasksRequest,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_EmbeddingResults__Output>
  ): grpc.ClientUnaryCall;
  embeddingTasksPredict(
    argument: _caikit_runtime_Nlp_EmbeddingTasksRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_EmbeddingResults__Output>
  ): grpc.ClientUnaryCall;
  embeddingTasksPredict(
    argument: _caikit_runtime_Nlp_EmbeddingTasksRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_EmbeddingResults__Output>
  ): grpc.ClientUnaryCall;
  embeddingTasksPredict(
    argument: _caikit_runtime_Nlp_EmbeddingTasksRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_EmbeddingResults__Output>
  ): grpc.ClientUnaryCall;
  embeddingTasksPredict(
    argument: _caikit_runtime_Nlp_EmbeddingTasksRequest,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_EmbeddingResults__Output>
  ): grpc.ClientUnaryCall;

  RerankTaskPredict(
    argument: _caikit_runtime_Nlp_RerankTaskRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_RerankResult__Output>
  ): grpc.ClientUnaryCall;
  RerankTaskPredict(
    argument: _caikit_runtime_Nlp_RerankTaskRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_RerankResult__Output>
  ): grpc.ClientUnaryCall;
  RerankTaskPredict(
    argument: _caikit_runtime_Nlp_RerankTaskRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_RerankResult__Output>
  ): grpc.ClientUnaryCall;
  RerankTaskPredict(
    argument: _caikit_runtime_Nlp_RerankTaskRequest,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_RerankResult__Output>
  ): grpc.ClientUnaryCall;
  rerankTaskPredict(
    argument: _caikit_runtime_Nlp_RerankTaskRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_RerankResult__Output>
  ): grpc.ClientUnaryCall;
  rerankTaskPredict(
    argument: _caikit_runtime_Nlp_RerankTaskRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_RerankResult__Output>
  ): grpc.ClientUnaryCall;
  rerankTaskPredict(
    argument: _caikit_runtime_Nlp_RerankTaskRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_RerankResult__Output>
  ): grpc.ClientUnaryCall;
  rerankTaskPredict(
    argument: _caikit_runtime_Nlp_RerankTaskRequest,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_RerankResult__Output>
  ): grpc.ClientUnaryCall;

  RerankTasksPredict(
    argument: _caikit_runtime_Nlp_RerankTasksRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_RerankResults__Output>
  ): grpc.ClientUnaryCall;
  RerankTasksPredict(
    argument: _caikit_runtime_Nlp_RerankTasksRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_RerankResults__Output>
  ): grpc.ClientUnaryCall;
  RerankTasksPredict(
    argument: _caikit_runtime_Nlp_RerankTasksRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_RerankResults__Output>
  ): grpc.ClientUnaryCall;
  RerankTasksPredict(
    argument: _caikit_runtime_Nlp_RerankTasksRequest,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_RerankResults__Output>
  ): grpc.ClientUnaryCall;
  rerankTasksPredict(
    argument: _caikit_runtime_Nlp_RerankTasksRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_RerankResults__Output>
  ): grpc.ClientUnaryCall;
  rerankTasksPredict(
    argument: _caikit_runtime_Nlp_RerankTasksRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_RerankResults__Output>
  ): grpc.ClientUnaryCall;
  rerankTasksPredict(
    argument: _caikit_runtime_Nlp_RerankTasksRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_RerankResults__Output>
  ): grpc.ClientUnaryCall;
  rerankTasksPredict(
    argument: _caikit_runtime_Nlp_RerankTasksRequest,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_RerankResults__Output>
  ): grpc.ClientUnaryCall;

  SentenceSimilarityTaskPredict(
    argument: _caikit_runtime_Nlp_SentenceSimilarityTaskRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_SentenceSimilarityResult__Output>
  ): grpc.ClientUnaryCall;
  SentenceSimilarityTaskPredict(
    argument: _caikit_runtime_Nlp_SentenceSimilarityTaskRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_SentenceSimilarityResult__Output>
  ): grpc.ClientUnaryCall;
  SentenceSimilarityTaskPredict(
    argument: _caikit_runtime_Nlp_SentenceSimilarityTaskRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_SentenceSimilarityResult__Output>
  ): grpc.ClientUnaryCall;
  SentenceSimilarityTaskPredict(
    argument: _caikit_runtime_Nlp_SentenceSimilarityTaskRequest,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_SentenceSimilarityResult__Output>
  ): grpc.ClientUnaryCall;
  sentenceSimilarityTaskPredict(
    argument: _caikit_runtime_Nlp_SentenceSimilarityTaskRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_SentenceSimilarityResult__Output>
  ): grpc.ClientUnaryCall;
  sentenceSimilarityTaskPredict(
    argument: _caikit_runtime_Nlp_SentenceSimilarityTaskRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_SentenceSimilarityResult__Output>
  ): grpc.ClientUnaryCall;
  sentenceSimilarityTaskPredict(
    argument: _caikit_runtime_Nlp_SentenceSimilarityTaskRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_SentenceSimilarityResult__Output>
  ): grpc.ClientUnaryCall;
  sentenceSimilarityTaskPredict(
    argument: _caikit_runtime_Nlp_SentenceSimilarityTaskRequest,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_SentenceSimilarityResult__Output>
  ): grpc.ClientUnaryCall;

  SentenceSimilarityTasksPredict(
    argument: _caikit_runtime_Nlp_SentenceSimilarityTasksRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_SentenceSimilarityResults__Output>
  ): grpc.ClientUnaryCall;
  SentenceSimilarityTasksPredict(
    argument: _caikit_runtime_Nlp_SentenceSimilarityTasksRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_SentenceSimilarityResults__Output>
  ): grpc.ClientUnaryCall;
  SentenceSimilarityTasksPredict(
    argument: _caikit_runtime_Nlp_SentenceSimilarityTasksRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_SentenceSimilarityResults__Output>
  ): grpc.ClientUnaryCall;
  SentenceSimilarityTasksPredict(
    argument: _caikit_runtime_Nlp_SentenceSimilarityTasksRequest,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_SentenceSimilarityResults__Output>
  ): grpc.ClientUnaryCall;
  sentenceSimilarityTasksPredict(
    argument: _caikit_runtime_Nlp_SentenceSimilarityTasksRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_SentenceSimilarityResults__Output>
  ): grpc.ClientUnaryCall;
  sentenceSimilarityTasksPredict(
    argument: _caikit_runtime_Nlp_SentenceSimilarityTasksRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_SentenceSimilarityResults__Output>
  ): grpc.ClientUnaryCall;
  sentenceSimilarityTasksPredict(
    argument: _caikit_runtime_Nlp_SentenceSimilarityTasksRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_SentenceSimilarityResults__Output>
  ): grpc.ClientUnaryCall;
  sentenceSimilarityTasksPredict(
    argument: _caikit_runtime_Nlp_SentenceSimilarityTasksRequest,
    callback: grpc.requestCallback<_caikit_data_model_caikit_nlp_SentenceSimilarityResults__Output>
  ): grpc.ClientUnaryCall;

  ServerStreamingTextGenerationTaskPredict(
    argument: _caikit_runtime_Nlp_ServerStreamingTextGenerationTaskRequest,
    metadata: grpc.Metadata,
    options?: grpc.CallOptions
  ): grpc.ClientReadableStream<_caikit_data_model_nlp_GeneratedTextStreamResult__Output>;
  ServerStreamingTextGenerationTaskPredict(
    argument: _caikit_runtime_Nlp_ServerStreamingTextGenerationTaskRequest,
    options?: grpc.CallOptions
  ): grpc.ClientReadableStream<_caikit_data_model_nlp_GeneratedTextStreamResult__Output>;
  serverStreamingTextGenerationTaskPredict(
    argument: _caikit_runtime_Nlp_ServerStreamingTextGenerationTaskRequest,
    metadata: grpc.Metadata,
    options?: grpc.CallOptions
  ): grpc.ClientReadableStream<_caikit_data_model_nlp_GeneratedTextStreamResult__Output>;
  serverStreamingTextGenerationTaskPredict(
    argument: _caikit_runtime_Nlp_ServerStreamingTextGenerationTaskRequest,
    options?: grpc.CallOptions
  ): grpc.ClientReadableStream<_caikit_data_model_nlp_GeneratedTextStreamResult__Output>;

  TextClassificationTaskPredict(
    argument: _caikit_runtime_Nlp_TextClassificationTaskRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_nlp_ClassificationResults__Output>
  ): grpc.ClientUnaryCall;
  TextClassificationTaskPredict(
    argument: _caikit_runtime_Nlp_TextClassificationTaskRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_caikit_data_model_nlp_ClassificationResults__Output>
  ): grpc.ClientUnaryCall;
  TextClassificationTaskPredict(
    argument: _caikit_runtime_Nlp_TextClassificationTaskRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_nlp_ClassificationResults__Output>
  ): grpc.ClientUnaryCall;
  TextClassificationTaskPredict(
    argument: _caikit_runtime_Nlp_TextClassificationTaskRequest,
    callback: grpc.requestCallback<_caikit_data_model_nlp_ClassificationResults__Output>
  ): grpc.ClientUnaryCall;
  textClassificationTaskPredict(
    argument: _caikit_runtime_Nlp_TextClassificationTaskRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_nlp_ClassificationResults__Output>
  ): grpc.ClientUnaryCall;
  textClassificationTaskPredict(
    argument: _caikit_runtime_Nlp_TextClassificationTaskRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_caikit_data_model_nlp_ClassificationResults__Output>
  ): grpc.ClientUnaryCall;
  textClassificationTaskPredict(
    argument: _caikit_runtime_Nlp_TextClassificationTaskRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_nlp_ClassificationResults__Output>
  ): grpc.ClientUnaryCall;
  textClassificationTaskPredict(
    argument: _caikit_runtime_Nlp_TextClassificationTaskRequest,
    callback: grpc.requestCallback<_caikit_data_model_nlp_ClassificationResults__Output>
  ): grpc.ClientUnaryCall;

  TextGenerationTaskPredict(
    argument: _caikit_runtime_Nlp_TextGenerationTaskRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_nlp_GeneratedTextResult__Output>
  ): grpc.ClientUnaryCall;
  TextGenerationTaskPredict(
    argument: _caikit_runtime_Nlp_TextGenerationTaskRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_caikit_data_model_nlp_GeneratedTextResult__Output>
  ): grpc.ClientUnaryCall;
  TextGenerationTaskPredict(
    argument: _caikit_runtime_Nlp_TextGenerationTaskRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_nlp_GeneratedTextResult__Output>
  ): grpc.ClientUnaryCall;
  TextGenerationTaskPredict(
    argument: _caikit_runtime_Nlp_TextGenerationTaskRequest,
    callback: grpc.requestCallback<_caikit_data_model_nlp_GeneratedTextResult__Output>
  ): grpc.ClientUnaryCall;
  textGenerationTaskPredict(
    argument: _caikit_runtime_Nlp_TextGenerationTaskRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_nlp_GeneratedTextResult__Output>
  ): grpc.ClientUnaryCall;
  textGenerationTaskPredict(
    argument: _caikit_runtime_Nlp_TextGenerationTaskRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_caikit_data_model_nlp_GeneratedTextResult__Output>
  ): grpc.ClientUnaryCall;
  textGenerationTaskPredict(
    argument: _caikit_runtime_Nlp_TextGenerationTaskRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_nlp_GeneratedTextResult__Output>
  ): grpc.ClientUnaryCall;
  textGenerationTaskPredict(
    argument: _caikit_runtime_Nlp_TextGenerationTaskRequest,
    callback: grpc.requestCallback<_caikit_data_model_nlp_GeneratedTextResult__Output>
  ): grpc.ClientUnaryCall;

  TokenClassificationTaskPredict(
    argument: _caikit_runtime_Nlp_TokenClassificationTaskRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_nlp_TokenClassificationResults__Output>
  ): grpc.ClientUnaryCall;
  TokenClassificationTaskPredict(
    argument: _caikit_runtime_Nlp_TokenClassificationTaskRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_caikit_data_model_nlp_TokenClassificationResults__Output>
  ): grpc.ClientUnaryCall;
  TokenClassificationTaskPredict(
    argument: _caikit_runtime_Nlp_TokenClassificationTaskRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_nlp_TokenClassificationResults__Output>
  ): grpc.ClientUnaryCall;
  TokenClassificationTaskPredict(
    argument: _caikit_runtime_Nlp_TokenClassificationTaskRequest,
    callback: grpc.requestCallback<_caikit_data_model_nlp_TokenClassificationResults__Output>
  ): grpc.ClientUnaryCall;
  tokenClassificationTaskPredict(
    argument: _caikit_runtime_Nlp_TokenClassificationTaskRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_nlp_TokenClassificationResults__Output>
  ): grpc.ClientUnaryCall;
  tokenClassificationTaskPredict(
    argument: _caikit_runtime_Nlp_TokenClassificationTaskRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_caikit_data_model_nlp_TokenClassificationResults__Output>
  ): grpc.ClientUnaryCall;
  tokenClassificationTaskPredict(
    argument: _caikit_runtime_Nlp_TokenClassificationTaskRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_nlp_TokenClassificationResults__Output>
  ): grpc.ClientUnaryCall;
  tokenClassificationTaskPredict(
    argument: _caikit_runtime_Nlp_TokenClassificationTaskRequest,
    callback: grpc.requestCallback<_caikit_data_model_nlp_TokenClassificationResults__Output>
  ): grpc.ClientUnaryCall;

  TokenizationTaskPredict(
    argument: _caikit_runtime_Nlp_TokenizationTaskRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_nlp_TokenizationResults__Output>
  ): grpc.ClientUnaryCall;
  TokenizationTaskPredict(
    argument: _caikit_runtime_Nlp_TokenizationTaskRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_caikit_data_model_nlp_TokenizationResults__Output>
  ): grpc.ClientUnaryCall;
  TokenizationTaskPredict(
    argument: _caikit_runtime_Nlp_TokenizationTaskRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_nlp_TokenizationResults__Output>
  ): grpc.ClientUnaryCall;
  TokenizationTaskPredict(
    argument: _caikit_runtime_Nlp_TokenizationTaskRequest,
    callback: grpc.requestCallback<_caikit_data_model_nlp_TokenizationResults__Output>
  ): grpc.ClientUnaryCall;
  tokenizationTaskPredict(
    argument: _caikit_runtime_Nlp_TokenizationTaskRequest,
    metadata: grpc.Metadata,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_nlp_TokenizationResults__Output>
  ): grpc.ClientUnaryCall;
  tokenizationTaskPredict(
    argument: _caikit_runtime_Nlp_TokenizationTaskRequest,
    metadata: grpc.Metadata,
    callback: grpc.requestCallback<_caikit_data_model_nlp_TokenizationResults__Output>
  ): grpc.ClientUnaryCall;
  tokenizationTaskPredict(
    argument: _caikit_runtime_Nlp_TokenizationTaskRequest,
    options: grpc.CallOptions,
    callback: grpc.requestCallback<_caikit_data_model_nlp_TokenizationResults__Output>
  ): grpc.ClientUnaryCall;
  tokenizationTaskPredict(
    argument: _caikit_runtime_Nlp_TokenizationTaskRequest,
    callback: grpc.requestCallback<_caikit_data_model_nlp_TokenizationResults__Output>
  ): grpc.ClientUnaryCall;
}

export interface NlpServiceHandlers extends grpc.UntypedServiceImplementation {
  BidiStreamingTokenClassificationTaskPredict: grpc.handleBidiStreamingCall<
    _caikit_runtime_Nlp_BidiStreamingTokenClassificationTaskRequest__Output,
    _caikit_data_model_nlp_TokenClassificationStreamResult
  >;

  EmbeddingTaskPredict: grpc.handleUnaryCall<
    _caikit_runtime_Nlp_EmbeddingTaskRequest__Output,
    _caikit_data_model_caikit_nlp_EmbeddingResult
  >;

  EmbeddingTasksPredict: grpc.handleUnaryCall<
    _caikit_runtime_Nlp_EmbeddingTasksRequest__Output,
    _caikit_data_model_caikit_nlp_EmbeddingResults
  >;

  RerankTaskPredict: grpc.handleUnaryCall<
    _caikit_runtime_Nlp_RerankTaskRequest__Output,
    _caikit_data_model_caikit_nlp_RerankResult
  >;

  RerankTasksPredict: grpc.handleUnaryCall<
    _caikit_runtime_Nlp_RerankTasksRequest__Output,
    _caikit_data_model_caikit_nlp_RerankResults
  >;

  SentenceSimilarityTaskPredict: grpc.handleUnaryCall<
    _caikit_runtime_Nlp_SentenceSimilarityTaskRequest__Output,
    _caikit_data_model_caikit_nlp_SentenceSimilarityResult
  >;

  SentenceSimilarityTasksPredict: grpc.handleUnaryCall<
    _caikit_runtime_Nlp_SentenceSimilarityTasksRequest__Output,
    _caikit_data_model_caikit_nlp_SentenceSimilarityResults
  >;

  ServerStreamingTextGenerationTaskPredict: grpc.handleServerStreamingCall<
    _caikit_runtime_Nlp_ServerStreamingTextGenerationTaskRequest__Output,
    _caikit_data_model_nlp_GeneratedTextStreamResult
  >;

  TextClassificationTaskPredict: grpc.handleUnaryCall<
    _caikit_runtime_Nlp_TextClassificationTaskRequest__Output,
    _caikit_data_model_nlp_ClassificationResults
  >;

  TextGenerationTaskPredict: grpc.handleUnaryCall<
    _caikit_runtime_Nlp_TextGenerationTaskRequest__Output,
    _caikit_data_model_nlp_GeneratedTextResult
  >;

  TokenClassificationTaskPredict: grpc.handleUnaryCall<
    _caikit_runtime_Nlp_TokenClassificationTaskRequest__Output,
    _caikit_data_model_nlp_TokenClassificationResults
  >;

  TokenizationTaskPredict: grpc.handleUnaryCall<
    _caikit_runtime_Nlp_TokenizationTaskRequest__Output,
    _caikit_data_model_nlp_TokenizationResults
  >;
}

export interface NlpServiceDefinition extends grpc.ServiceDefinition {
  BidiStreamingTokenClassificationTaskPredict: MethodDefinition<
    _caikit_runtime_Nlp_BidiStreamingTokenClassificationTaskRequest,
    _caikit_data_model_nlp_TokenClassificationStreamResult,
    _caikit_runtime_Nlp_BidiStreamingTokenClassificationTaskRequest__Output,
    _caikit_data_model_nlp_TokenClassificationStreamResult__Output
  >;
  EmbeddingTaskPredict: MethodDefinition<
    _caikit_runtime_Nlp_EmbeddingTaskRequest,
    _caikit_data_model_caikit_nlp_EmbeddingResult,
    _caikit_runtime_Nlp_EmbeddingTaskRequest__Output,
    _caikit_data_model_caikit_nlp_EmbeddingResult__Output
  >;
  EmbeddingTasksPredict: MethodDefinition<
    _caikit_runtime_Nlp_EmbeddingTasksRequest,
    _caikit_data_model_caikit_nlp_EmbeddingResults,
    _caikit_runtime_Nlp_EmbeddingTasksRequest__Output,
    _caikit_data_model_caikit_nlp_EmbeddingResults__Output
  >;
  RerankTaskPredict: MethodDefinition<
    _caikit_runtime_Nlp_RerankTaskRequest,
    _caikit_data_model_caikit_nlp_RerankResult,
    _caikit_runtime_Nlp_RerankTaskRequest__Output,
    _caikit_data_model_caikit_nlp_RerankResult__Output
  >;
  RerankTasksPredict: MethodDefinition<
    _caikit_runtime_Nlp_RerankTasksRequest,
    _caikit_data_model_caikit_nlp_RerankResults,
    _caikit_runtime_Nlp_RerankTasksRequest__Output,
    _caikit_data_model_caikit_nlp_RerankResults__Output
  >;
  SentenceSimilarityTaskPredict: MethodDefinition<
    _caikit_runtime_Nlp_SentenceSimilarityTaskRequest,
    _caikit_data_model_caikit_nlp_SentenceSimilarityResult,
    _caikit_runtime_Nlp_SentenceSimilarityTaskRequest__Output,
    _caikit_data_model_caikit_nlp_SentenceSimilarityResult__Output
  >;
  SentenceSimilarityTasksPredict: MethodDefinition<
    _caikit_runtime_Nlp_SentenceSimilarityTasksRequest,
    _caikit_data_model_caikit_nlp_SentenceSimilarityResults,
    _caikit_runtime_Nlp_SentenceSimilarityTasksRequest__Output,
    _caikit_data_model_caikit_nlp_SentenceSimilarityResults__Output
  >;
  ServerStreamingTextGenerationTaskPredict: MethodDefinition<
    _caikit_runtime_Nlp_ServerStreamingTextGenerationTaskRequest,
    _caikit_data_model_nlp_GeneratedTextStreamResult,
    _caikit_runtime_Nlp_ServerStreamingTextGenerationTaskRequest__Output,
    _caikit_data_model_nlp_GeneratedTextStreamResult__Output
  >;
  TextClassificationTaskPredict: MethodDefinition<
    _caikit_runtime_Nlp_TextClassificationTaskRequest,
    _caikit_data_model_nlp_ClassificationResults,
    _caikit_runtime_Nlp_TextClassificationTaskRequest__Output,
    _caikit_data_model_nlp_ClassificationResults__Output
  >;
  TextGenerationTaskPredict: MethodDefinition<
    _caikit_runtime_Nlp_TextGenerationTaskRequest,
    _caikit_data_model_nlp_GeneratedTextResult,
    _caikit_runtime_Nlp_TextGenerationTaskRequest__Output,
    _caikit_data_model_nlp_GeneratedTextResult__Output
  >;
  TokenClassificationTaskPredict: MethodDefinition<
    _caikit_runtime_Nlp_TokenClassificationTaskRequest,
    _caikit_data_model_nlp_TokenClassificationResults,
    _caikit_runtime_Nlp_TokenClassificationTaskRequest__Output,
    _caikit_data_model_nlp_TokenClassificationResults__Output
  >;
  TokenizationTaskPredict: MethodDefinition<
    _caikit_runtime_Nlp_TokenizationTaskRequest,
    _caikit_data_model_nlp_TokenizationResults,
    _caikit_runtime_Nlp_TokenizationTaskRequest__Output,
    _caikit_data_model_nlp_TokenizationResults__Output
  >;
}
