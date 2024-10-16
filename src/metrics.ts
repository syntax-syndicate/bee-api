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

import { FastifyPluginAsync } from 'fastify';
import { fastifyPlugin } from 'fastify-plugin';
import { Pushgateway, Registry, collectDefaultMetrics, register } from 'prom-client';

import { PROMETHEUS_PUSHGATEWAY_URL } from './config.js';
import { Tag } from './swagger.js';

export const jobRegistry = new Registry();
export const gateway = PROMETHEUS_PUSHGATEWAY_URL
  ? new Pushgateway(PROMETHEUS_PUSHGATEWAY_URL, { timeout: 5000 }, jobRegistry)
  : null;

export const metricsPlugin: FastifyPluginAsync = fastifyPlugin(async (app) => {
  collectDefaultMetrics();

  app.get(
    '/metrics',
    {
      schema: {
        tags: [Tag.BEE_API]
      }
    },
    async (request, reply) => {
      const payload = await register.metrics();
      return reply
        .header('Content-Type', register.contentType)
        .header('Cache-Control', 'no-cache')
        .send(payload);
    }
  );
});
