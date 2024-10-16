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
  OrganizationUsersListQuery,
  organizationUsersListQuerySchema,
  organizationUsersListResponseSchema
} from './dtos/organization-users-list';
import { listOrganizationUsers } from './organization-users.service';

import { Tag } from '@/swagger.js';
import { AuthSecret } from '@/auth/utils';

export const organizationUsersModule: FastifyPluginAsyncJsonSchemaToTs = async (app) => {
  app.get<{ Querystring: OrganizationUsersListQuery }>(
    '/organization/users',
    {
      schema: {
        querystring: organizationUsersListQuerySchema,
        response: { [StatusCodes.OK]: organizationUsersListResponseSchema },
        tags: [Tag.BEE_API]
      },
      preHandler: app.auth([AuthSecret.ACCESS_TOKEN])
    },
    async (req) => listOrganizationUsers(req.query)
  );
};
