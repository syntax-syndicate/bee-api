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

import { FilterQuery, Loaded, ref } from '@mikro-orm/core';
import dayjs from 'dayjs';

import { ProjectPrincipal } from './entities/project-principal.entity';
import { ProjectUser as ProjectUserDto } from './dtos/project-user';
import { PrincipalType } from './entities/principals/principal.entity';
import { ProjectUserReadParams, ProjectUserReadResponse } from './dtos/project-user-read';
import { OrganizationUser } from './entities/organization-user.entity';
import {
  ProjectUsersListParams,
  ProjectUsersListQuery,
  ProjectUsersListResponse
} from './dtos/project-users-list';
import { UserPrincipal } from './entities/principals/user-principal.entity';
import { ProjectUserDeleteParams, ProjectUserDeleteResponse } from './dtos/project-users-delete';
import {
  ProjectUserCreateBody,
  ProjectUserCreateParams,
  ProjectUserCreateResponse
} from './dtos/project-users-create';
import { Project, ProjectStatus } from './entities/project.entity';
import {
  ProjectUserUpdateBody,
  ProjectUserUpdateParams,
  ProjectUserUpdateResponse
} from './dtos/project-users-update';
import { ProjectRole } from './entities/constants';
import { getProjectPrincipal } from './helpers';

import { getUpdatedValue } from '@/utils/update';
import { createDeleteResponse } from '@/utils/delete';
import { createPaginatedResponse, getListCursor } from '@/utils/pagination';
import { ORM } from '@/database';
import { APIError, APIErrorCode } from '@/errors/error.entity';
import { User } from '@/users/entities/user.entity';

export function toProjectUserDto(
  projectPrincipal: Loaded<ProjectPrincipal, 'principal.user.user'>
): ProjectUserDto {
  const principal = projectPrincipal.principal;
  if (principal.type !== PrincipalType.USER) throw new Error('Not a user principal');
  const user = (principal as Loaded<UserPrincipal, 'user.user'>).user.$.user.$;
  return {
    object: 'organization.project.user',
    id: user.id,
    name: user.name ?? '',
    email: user.email ?? '',
    role: projectPrincipal.role,
    added_at: dayjs(projectPrincipal.createdAt).unix()
  };
}

export async function readProjectUser({
  project_id,
  user_id
}: ProjectUserReadParams): Promise<ProjectUserReadResponse> {
  const orgUser = await ORM.em.getRepository(OrganizationUser).findOneOrFail({ user: user_id });
  const projectPrincipal = await ORM.em
    .getRepository(ProjectPrincipal)
    .findOneOrFail(
      { project: project_id, principal: { type: PrincipalType.USER, user: orgUser } },
      { populate: ['principal.user.user' as any] }
    );
  if (orgUser.id !== (projectPrincipal.principal as UserPrincipal).user.id)
    throw new Error('Organization user mismatch');
  return toProjectUserDto(projectPrincipal);
}

export async function deleteProjectUser({
  project_id,
  user_id
}: ProjectUserDeleteParams): Promise<ProjectUserDeleteResponse> {
  const orgUser = await ORM.em.getRepository(OrganizationUser).findOneOrFail({ user: user_id });
  const projectPrincipal = await ORM.em
    .getRepository(ProjectPrincipal)
    .findOneOrFail(
      { project: project_id, principal: { type: PrincipalType.USER, user: orgUser } },
      { populate: ['project', 'principal.user.user' as any] }
    );

  if (
    (projectPrincipal as Loaded<ProjectPrincipal, 'project'>).project.$.status ===
    ProjectStatus.ARCHIVED
  ) {
    await checkNotLastAdmin(projectPrincipal);
  }
  projectPrincipal.delete();
  await ORM.em.flush();

  return createDeleteResponse(projectPrincipal.id, 'project-user');
}

export async function createProjectUser(
  input: ProjectUserCreateParams & ProjectUserCreateBody
): Promise<ProjectUserCreateResponse> {
  const { project_id, user_id, role } = input;
  const authorProjectPrincipal = getProjectPrincipal();
  const project = await ORM.em.getRepository(Project).findOneOrFail({ id: project_id });
  if (authorProjectPrincipal.project.id !== project.id) {
    throw new APIError({
      message: 'Project user mismatch',
      code: APIErrorCode.INVALID_INPUT
    });
  }
  const orgUser = await ORM.em.getRepository(OrganizationUser).findOneOrFail({ user: user_id });

  const existingProjectPrincipal = await ORM.em
    .getRepository(ProjectPrincipal)
    .findOne(
      { project: project_id, principal: { type: PrincipalType.USER, user: orgUser } },
      { filters: { deleted: false } }
    );
  if (existingProjectPrincipal) {
    if (existingProjectPrincipal.deletedAt) {
      existingProjectPrincipal.resurrect();
      updateUser(existingProjectPrincipal, input);
      await ORM.em.flush();

      return toProjectUserDto(existingProjectPrincipal);
    } else {
      throw new APIError({
        message: 'User already exists',
        code: APIErrorCode.INVALID_INPUT
      });
    }
  }

  const projectPrincipal = new ProjectPrincipal({
    principal: new UserPrincipal({ user: ref(orgUser) }),
    role
  });
  await ORM.em.persistAndFlush(projectPrincipal);

  await ORM.em
    .getRepository(ProjectPrincipal)
    .populate(projectPrincipal, ['principal.user.user' as any]);

  return toProjectUserDto(projectPrincipal);
}

function updateUser(projectPrincipal: ProjectPrincipal, newData: ProjectUserUpdateBody) {
  projectPrincipal.role = getUpdatedValue(newData.role, projectPrincipal.role);
}

export async function updateProjectUser({
  project_id,
  user_id,
  role
}: ProjectUserUpdateParams & ProjectUserUpdateBody): Promise<ProjectUserUpdateResponse> {
  const orgUser = await ORM.em.getRepository(OrganizationUser).findOneOrFail({ user: user_id });
  const projectPrincipal = await ORM.em
    .getRepository(ProjectPrincipal)
    .findOneOrFail(
      { project: project_id, principal: { type: PrincipalType.USER, user: orgUser } },
      { populate: ['principal.user.user' as any] }
    );
  await checkNotLastAdmin(projectPrincipal);
  updateUser(projectPrincipal, { role });
  await ORM.em.flush();

  return toProjectUserDto(projectPrincipal);
}

export async function listProjectUsers({
  project_id,
  limit,
  order,
  order_by,
  after,
  before,
  search
}: ProjectUsersListParams & ProjectUsersListQuery): Promise<ProjectUsersListResponse> {
  const where: FilterQuery<Loaded<ProjectPrincipal, 'principal.user'>> = {
    project: project_id,
    principal: { type: PrincipalType.USER }
  };

  if (search) {
    const regexp = new RegExp(search, 'i');
    const users = await ORM.em
      .getRepository(User)
      .find({ $or: [{ email: regexp }, { name: regexp }] });
    const orgUsers = await ORM.em
      .getRepository(OrganizationUser)
      .find({ user: { $in: users.map((u) => u.id) } });
    where.principal = { user: { $in: orgUsers.map((u) => u.id) } };
  }

  const cursor = await getListCursor<ProjectPrincipal>(
    where,
    { limit, order, order_by, after, before, populate: ['principal.user.user'] },
    ORM.em.getRepository(ProjectPrincipal)
  );
  return createPaginatedResponse(cursor, toProjectUserDto);
}

async function checkNotLastAdmin(projectPrincipal: ProjectPrincipal) {
  const projectAdmins = await ORM.em.getRepository(ProjectPrincipal).count({
    project: projectPrincipal.project.id,
    principal: { type: PrincipalType.USER },
    role: ProjectRole.ADMIN,
    id: { $ne: projectPrincipal.id }
  });

  if (projectAdmins <= 0) {
    throw new APIError({
      message: 'Can not delete last project admin.',
      code: APIErrorCode.INVALID_INPUT
    });
  }
}
