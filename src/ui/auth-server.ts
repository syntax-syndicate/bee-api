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

import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import { fastify } from 'fastify';

import { fastifyLogger } from '@/logger';
import { AUTH_SERVER_PORT } from '@/config';

const startAuthServer = async () => {
  if (!AUTH_SERVER_PORT) return;

  const app = fastify({
    logger: fastifyLogger
  }).withTypeProvider<JsonSchemaToTsProvider>();

  try {
    app.get('/.well-known/openid-configuration', async () => {
      return {
        issuer: 'https://localhost',
        jwks_uri: new URL(`http://localhost:${AUTH_SERVER_PORT}/jwks`)
      };
    });

    const { default: data } = await import('./jwks.json', { assert: { type: 'json' } });
    app.get('/jwks', async () => {
      return data;
    });

    await app.listen({ port: AUTH_SERVER_PORT, host: 'localhost' });
  } catch (err) {
    app.log.warn({ err }, 'Failed to start auth server!');
  }
};
await startAuthServer();
