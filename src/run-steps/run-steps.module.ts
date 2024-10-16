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

import { FastifyPluginAsyncJsonSchemaToTs } from '@fastify/type-provider-json-schema-to-ts';
import { StatusCodes } from 'http-status-codes';

import {
  RunStepsListParams,
  RunStepsListQuery,
  runStepsListParamsSchema,
  runStepsListQuerySchema,
  runStepsListResponseSchema
} from './dtos/run-steps-list.js';
import {
  RunStepReadParams,
  runStepReadParamsSchema,
  runStepReadResponseSchema
} from './dtos/run-step-read.js';
import { listRunSteps, readRunStep } from './run-steps.service.js';

import { Tag } from '@/swagger.js';

export const runStepsModule: FastifyPluginAsyncJsonSchemaToTs = async (app) => {
  app.get<{ Params: RunStepReadParams }>(
    '/threads/:thread_id/runs/:run_id/steps/:step_id',
    {
      schema: {
        params: runStepReadParamsSchema,
        response: { [StatusCodes.OK]: runStepReadResponseSchema },
        tags: [Tag.OPENAI_ASSISTANTS_API]
      },
      preHandler: app.auth()
    },
    async (req) => {
      return readRunStep(req.params);
    }
  );

  app.get<{ Params: RunStepsListParams; Querystring: RunStepsListQuery }>(
    '/threads/:thread_id/runs/:run_id/steps',
    {
      schema: {
        params: runStepsListParamsSchema,
        querystring: runStepsListQuerySchema,
        response: { [StatusCodes.OK]: runStepsListResponseSchema },
        tags: [Tag.OPENAI_ASSISTANTS_API]
      },
      preHandler: app.auth()
    },
    async (req) => {
      return listRunSteps({ ...req.params, ...req.query });
    }
  );
};
