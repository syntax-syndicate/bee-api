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

export const GRPC_CLIENT_TTL = 15 * 60 * 1000;
export const GRPC_CLIENT_SHUTDOWN_TIMEOUT = GRPC_CLIENT_TTL + 5 * 60 * 1000;

export const GrpcEmbeddingModel = {
  BGE_LARGE_EN_V_1_5: 'baai/bge-large-en-v1.5'
} as const;
export type GrpcEmbeddingModel = (typeof GrpcEmbeddingModel)[keyof typeof GrpcEmbeddingModel];
