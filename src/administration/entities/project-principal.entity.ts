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

import { Embedded, Entity, Enum, Filter, Index } from '@mikro-orm/core';
import { requestContext } from '@fastify/request-context';

import type { ServiceAccountPrincipal } from './principals/service-account-principal.entity.js';
import type { UserPrincipal } from './principals/user-principal.entity.js';
import { ProjectRole } from './constants.js';
import {
  projectAdministrationAccessFilter,
  ProjectAdministrationScopedEntity,
  ProjectAdministrationScopedEntityInput
} from './project-administration-scoped.entity.js';
import { PrincipalType } from './principals/principal.entity.js';

@Index({
  options: [
    {
      principal: 1,
      project: 1
    },
    {
      unique: true,
      partialFilterExpression: { deletedAt: { $in: [null] } }
    }
  ]
})
@Entity()
@Filter({
  name: 'projectAdministrationAccess', // override
  cond: async (_ = {}, type) => {
    const projectPrincipal = requestContext.get('projectPrincipal');
    if (projectPrincipal && type === 'read') {
      // All project members are allowed to see project users
      return {
        $or: [
          await projectAdministrationAccessFilter(_, type),
          { principal: { type: PrincipalType.USER }, project: projectPrincipal.project.id }
        ]
      };
    } else {
      return await projectAdministrationAccessFilter(_, type);
    }
  },
  default: true
})
export class ProjectPrincipal extends ProjectAdministrationScopedEntity {
  getIdPrefix(): string {
    return 'proj_principal';
  }

  @Embedded({ object: true })
  principal: ServiceAccountPrincipal | UserPrincipal;

  @Enum(() => ProjectRole)
  role: ProjectRole;

  constructor({ principal, role, ...rest }: ProjectPrincipalInput) {
    super(rest);
    this.principal = principal;
    this.role = role;
  }
}

export type ProjectPrincipalInput = ProjectAdministrationScopedEntityInput &
  Pick<ProjectPrincipal, 'principal' | 'role'>;
