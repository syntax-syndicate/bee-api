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
  ProjectCreateBody,
  projectCreateBodySchema,
  projectCreateResponseSchema
} from './dtos/project-create';
import {
  archiveProject,
  createProject,
  listProjects,
  readProject,
  updateProject
} from './projects.service';
import {
  ProjectsListQuery,
  projectsListQuerySchema,
  projectsListResponseSchema
} from './dtos/projects-list';
import {
  ProjectReadParams,
  projectReadParamsSchema,
  projectReadResponseSchema
} from './dtos/project-read';
import {
  ProjectUpdateBody,
  projectUpdateBodySchema,
  ProjectUpdateParams,
  projectUpdateParamsSchema
} from './dtos/project-update';
import {
  ProjectArchiveParams,
  projectArchiveParamsSchema,
  projectArchiveResponseSchema
} from './dtos/project-archive';

import { Tag } from '@/swagger.js';
import { AuthSecret } from '@/auth/utils';

export const projectsModule: FastifyPluginAsyncJsonSchemaToTs = async (app) => {
  app.post<{ Body: ProjectCreateBody }>(
    '/organization/projects',
    {
      schema: {
        body: projectCreateBodySchema,
        response: { [StatusCodes.OK]: projectCreateResponseSchema },
        tags: [Tag.BEE_API]
      },
      preHandler: app.auth([AuthSecret.ACCESS_TOKEN])
    },
    async (req) => createProject(req.body)
  );

  app.get<{ Params: ProjectReadParams }>(
    '/organization/projects/:project_id',
    {
      schema: {
        params: projectReadParamsSchema,
        response: { [StatusCodes.OK]: projectReadResponseSchema },
        tags: [Tag.BEE_API]
      },
      preHandler: app.auth([AuthSecret.ACCESS_TOKEN])
    },
    async (req) => readProject(req.params)
  );

  app.post<{ Params: ProjectUpdateParams; Body: ProjectUpdateBody }>(
    '/organization/projects/:project_id',
    {
      schema: {
        params: projectUpdateParamsSchema,
        body: projectUpdateBodySchema,
        response: { [StatusCodes.OK]: projectUpdateBodySchema },
        tags: [Tag.BEE_API]
      },
      preHandler: app.auth([AuthSecret.ACCESS_TOKEN])
    },
    async (req) => updateProject({ ...req.params, ...req.body })
  );

  app.get<{ Querystring: ProjectsListQuery }>(
    '/organization/projects',
    {
      schema: {
        querystring: projectsListQuerySchema,
        response: { [StatusCodes.OK]: projectsListResponseSchema },
        tags: [Tag.BEE_API]
      },
      preHandler: app.auth([AuthSecret.ACCESS_TOKEN])
    },
    async (req) => listProjects(req.query)
  );

  app.post<{ Params: ProjectArchiveParams }>(
    '/organization/projects/:project_id/archive',
    {
      schema: {
        params: projectArchiveParamsSchema,
        response: { [StatusCodes.OK]: projectArchiveResponseSchema },
        tags: [Tag.BEE_API]
      },
      preHandler: app.auth([AuthSecret.ACCESS_TOKEN])
    },
    async (req) => archiveProject(req.params)
  );
};
