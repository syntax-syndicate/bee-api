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

import { AsyncLocalStorage } from 'node:async_hooks';

import { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import {
  fastifyRequestContext,
  requestContext,
  RequestContextData
} from '@fastify/request-context';
import { Job } from 'bullmq';

export const requestContextPlugin: FastifyPluginAsync = fp.default(async (app) => {
  app.register(fastifyRequestContext);
  app.addHook('onRequest', async (req, res) => {
    req.requestContext.set('req', req);
    req.requestContext.set('res', res);
  });
});

export function ensureRequestContextData<K extends keyof RequestContextData>(
  key: K
): Required<RequestContextData>[K] {
  const value = requestContext.get(key);
  if (!value) throw new Error(`Missing request context key: ${key}`);
  return value;
}

export function inRequest(): boolean {
  return !!requestContext.get('req');
}

export const jobLocalStorage = new AsyncLocalStorage<{ job: Job }>();

export function inJob(): boolean {
  return !!jobLocalStorage.getStore()?.job;
}

export function inSeeder(): boolean {
  return process.env.IN_SEEDER === 'true';
}
