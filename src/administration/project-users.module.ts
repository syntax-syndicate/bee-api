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
  createProjectUser,
  listProjectUsers,
  readProjectUser,
  deleteProjectUser,
  updateProjectUser
} from './project-users.service';
import {
  ProjectUserReadParams,
  projectUserReadParamsSchema,
  projectUserReadResponseSchema
} from './dtos/project-user-read';
import {
  ProjectUserDeleteParams,
  projectUserDeleteParamsSchema
} from './dtos/project-users-delete';
import {
  ProjectUsersListParams,
  projectUsersListParamsSchema,
  ProjectUsersListQuery,
  projectUsersListQuerySchema,
  projectUsersListResponseSchema
} from './dtos/project-users-list';
import {
  ProjectUserCreateBody,
  projectUserCreateBodySchema,
  ProjectUserCreateParams,
  projectUserCreateParamsSchema,
  projectUserCreateResponseSchema
} from './dtos/project-users-create';
import {
  ProjectUserUpdateBody,
  projectUserUpdateBodySchema,
  ProjectUserUpdateParams,
  projectUserUpdateParamsSchema,
  projectUserUpdateResponseSchema
} from './dtos/project-users-update';

import { createDeleteSchema } from '@/schema';
import { Tag } from '@/swagger.js';
import { AuthSecret } from '@/auth/utils';

export const projectUsersModule: FastifyPluginAsyncJsonSchemaToTs = async (app) => {
  app.get<{ Params: ProjectUserReadParams }>(
    '/organization/projects/:project_id/users/:user_id',
    {
      schema: {
        params: projectUserReadParamsSchema,
        response: { [StatusCodes.OK]: projectUserReadResponseSchema },
        tags: [Tag.BEE_API]
      },
      preHandler: app.auth([AuthSecret.ACCESS_TOKEN])
    },
    async (req) => readProjectUser(req.params)
  );

  app.get<{ Params: ProjectUsersListParams; Querystring: ProjectUsersListQuery }>(
    '/organization/projects/:project_id/users',
    {
      schema: {
        params: projectUsersListParamsSchema,
        querystring: projectUsersListQuerySchema,
        response: { [StatusCodes.OK]: projectUsersListResponseSchema },
        tags: [Tag.BEE_API]
      },
      preHandler: app.auth([AuthSecret.ACCESS_TOKEN])
    },
    async (req) => listProjectUsers({ ...req.params, ...req.query })
  );

  app.delete<{ Params: ProjectUserDeleteParams }>(
    '/organization/projects/:project_id/users/:user_id',
    {
      schema: {
        params: projectUserDeleteParamsSchema,
        response: { [StatusCodes.OK]: createDeleteSchema('project-user') },
        tags: [Tag.BEE_API]
      },
      preHandler: app.auth([AuthSecret.ACCESS_TOKEN])
    },
    async (req) => deleteProjectUser(req.params)
  );

  app.post<{ Params: ProjectUserCreateParams; Body: ProjectUserCreateBody }>(
    '/organization/projects/:project_id/users',
    {
      schema: {
        params: projectUserCreateParamsSchema,
        body: projectUserCreateBodySchema,
        response: { [StatusCodes.OK]: projectUserCreateResponseSchema },
        tags: [Tag.BEE_API]
      },
      preHandler: app.auth([AuthSecret.ACCESS_TOKEN])
    },
    async (req) => createProjectUser({ ...req.params, ...req.body })
  );

  app.post<{ Params: ProjectUserUpdateParams; Body: ProjectUserUpdateBody }>(
    '/organization/projects/:project_id/users/:user_id',
    {
      schema: {
        params: projectUserUpdateParamsSchema,
        body: projectUserUpdateBodySchema,
        response: { [StatusCodes.OK]: projectUserUpdateResponseSchema },
        tags: [Tag.BEE_API]
      },
      preHandler: app.auth([AuthSecret.ACCESS_TOKEN])
    },
    async (req) => updateProjectUser({ ...req.params, ...req.body })
  );
};
