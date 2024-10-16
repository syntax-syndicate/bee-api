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

import grpc from '@grpc/grpc-js';
import { MemoryCache } from 'cache-manager';

import { NlpServiceClient } from '../types/caikit/runtime/Nlp/NlpService.js';
import { GRPC_CLIENT_SHUTDOWN_TIMEOUT } from '../constants.js';

import { createGrpcURLFromModel } from './url.js';

import { getLogger } from '@/logger.js';
import { CAIKIT_CA_CERT, CAIKIT_CERT, CAIKIT_KEY, CAIKIT_URL } from '@/config.js';

const options = {
  // This is needed, otherwise communication to DIPC cluster fails with "Dropped connection" error after +- 50 secs
  'grpc.keepalive_time_ms': 25000,
  'grpc.max_receive_message_length': 32 * 1024 * 1024 // 32MiB
} as const;

type AnyClient = NlpServiceClient;

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new (...args: ConstructorParameters<Constructor>): Subtype;
};

interface BuildClientProps<T extends AnyClient> {
  cache: MemoryCache;
  modelId: string;
  service: SubtypeConstructor<typeof grpc.Client, T>;
}

export function buildClient<T extends AnyClient>({ cache, modelId, service }: BuildClientProps<T>) {
  if (!CAIKIT_URL || !CAIKIT_CA_CERT || !CAIKIT_KEY || !CAIKIT_CERT)
    throw new Error('Missing caikit env(s)');
  const credentials = grpc.credentials.createSsl(
    Buffer.from(CAIKIT_CA_CERT),
    Buffer.from(CAIKIT_KEY),
    Buffer.from(CAIKIT_CERT)
  );
  return cache.wrap(CAIKIT_URL, async () => {
    const url = createGrpcURLFromModel(modelId);
    const client = new service(url, credentials, options);
    setTimeout(() => {
      try {
        client.close();
      } catch (err) {
        getLogger().warn({ url }, 'Failed to close grpc client');
      }
    }, GRPC_CLIENT_SHUTDOWN_TIMEOUT).unref();
    return client;
  });
}
