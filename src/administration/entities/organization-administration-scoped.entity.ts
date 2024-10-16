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

import {
  BeforeCreate,
  BeforeDelete,
  BeforeUpdate,
  Entity,
  EventArgs,
  Filter,
  Index,
  ManyToOne,
  ref,
  Ref
} from '@mikro-orm/core';
import { requestContext } from '@fastify/request-context';

import { BaseEntity, BaseEntityInput } from '../../common/base.entity.js';

import type { Organization } from '@/administration/entities/organization.entity.js';
import type { OrganizationUser } from '@/administration/entities/organization-user.entity.js';
import { getOrganizationUser } from '@/administration/helpers.js';
import { OrganizationUserRole } from '@/administration/entities/constants.js';
import { APIError, APIErrorCode } from '@/errors/error.entity.js';
import { inJob, inSeeder } from '@/context.js';

@Entity({ abstract: true })
@Filter({
  name: 'orgAdministrationAccess',
  cond: async (_ = {}, type) => {
    if (inJob() || inSeeder()) return;

    const orgUser = requestContext.get('organizationUser');
    if (!orgUser) return { _id: null };

    switch (type) {
      case 'read': {
        return { organization: orgUser.organization };
      }
      default:
        throw new Error('Not Implemented');
    }
  },
  default: true
})
export abstract class OrganizationAdministrationScopedEntity extends BaseEntity {
  @Index()
  @ManyToOne()
  organization: Ref<Organization>;

  @ManyToOne()
  createdBy: Ref<OrganizationUser>;

  constructor({ organization, createdBy, ...rest }: OrganizationAdministrationScopedEntityInput) {
    super(rest);

    if (organization && createdBy) {
      this.organization = organization;
      this.createdBy = createdBy;
    } else {
      const orgUser = getOrganizationUser();

      this.organization = orgUser.organization;
      this.createdBy = createdBy ?? ref(orgUser);
    }
  }

  @BeforeCreate()
  @BeforeUpdate()
  @BeforeDelete()
  async authorize(_: EventArgs<any>) {
    if (inJob() || inSeeder()) return;

    const orgUser = getOrganizationUser();
    if (orgUser.role !== OrganizationUserRole.OWNER)
      throw new APIError({
        message: 'Insufficient organization role',
        code: APIErrorCode.FORBIDDEN
      });
  }
}

export type OrganizationAdministrationScopedEntityInput = BaseEntityInput &
  Partial<Pick<OrganizationAdministrationScopedEntity, 'organization' | 'createdBy'>>;
