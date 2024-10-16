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

import protoLoader from '@grpc/proto-loader';
import grpc from '@grpc/grpc-js';
import { createCache, memoryStore } from 'cache-manager';

import { ProtoGrpcType as EmbeddingsProtoGentypes } from './types/caikit_runtime_Nlp.js';
import { buildClient } from './utils/build-client.js';
import { NlpServiceClient } from './types/caikit/runtime/Nlp/NlpService.js';
import { GRPC_CLIENT_TTL } from './constants.js';

const embeddingsProtoPath = './protos/caikit_runtime_Nlp.proto'; // separate variable to avoid Vite transformation https://vitejs.dev/guide/assets#new-url-url-import-meta-url
const EMBEDDINGS_PROTO_PATH = new URL(embeddingsProtoPath, import.meta.url);

const packageOptions = {
  longs: Number,
  enums: String,
  arrays: true,
  objects: true,
  oneofs: true,
  keepCase: true,
  defaults: true
} as const;

const embeddingsPackageObject = grpc.loadPackageDefinition(
  protoLoader.loadSync([EMBEDDINGS_PROTO_PATH.pathname], {
    ...packageOptions
  })
) as unknown as EmbeddingsProtoGentypes;

const embeddingsCache = createCache(
  memoryStore({
    max: 100,
    ttl: GRPC_CLIENT_TTL
  })
);
export const createEmbeddingsClient = async (modelId: string): Promise<NlpServiceClient> => {
  return buildClient({
    cache: embeddingsCache,
    modelId,
    service: embeddingsPackageObject.caikit.runtime.Nlp.NlpService
  });
};
