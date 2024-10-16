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

import { FilterQuery, Loaded } from '@mikro-orm/core';
import dayjs from 'dayjs';

import { OrganizationUser } from './entities/organization-user.entity';
import { OrganizationUser as OrganizationUserDto } from './dtos/organization-user';
import {
  OrganizationUsersListQuery,
  OrganizationUsersListResponse
} from './dtos/organization-users-list';

import { ORM } from '@/database';
import { createPaginatedResponse, getListCursor } from '@/utils/pagination';
import { User } from '@/users/entities/user.entity';

export function toOrganizationUserDto(
  organizationUser: Loaded<OrganizationUser, 'user'>
): OrganizationUserDto {
  return {
    object: 'organization.user',
    id: organizationUser.user.id,
    role: organizationUser.role,
    name: organizationUser.user.$.name ?? '',
    email: organizationUser.user.$.email ?? '',
    added_at: dayjs(organizationUser.createdAt).unix()
  };
}

export async function listOrganizationUsers({
  limit,
  order,
  order_by,
  after,
  before,
  search
}: OrganizationUsersListQuery): Promise<OrganizationUsersListResponse> {
  const where: FilterQuery<Loaded<OrganizationUser, 'user'>> = {};

  if (search) {
    const regexp = new RegExp(search, 'i');
    const users = await ORM.em
      .getRepository(User)
      .find({ $or: [{ email: regexp }, { name: regexp }] });
    where.user = { $in: users.map((u) => u.id) };
  }

  const cursor = await getListCursor<Loaded<OrganizationUser, 'user'>>(
    where,
    { limit, order, order_by, after, before, populate: ['user'] },
    ORM.em.getRepository(OrganizationUser)
  );
  return createPaginatedResponse(cursor, toOrganizationUserDto);
}
