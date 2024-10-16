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

import { BaseEntity, BaseEntityInput } from './base.entity';

import { getProjectPrincipal } from '@/administration/helpers';
import { ProjectPrincipal } from '@/administration/entities/project-principal.entity';
import { Project, ProjectStatus } from '@/administration/entities/project.entity';
import { APIError, APIErrorCode } from '@/errors/error.entity';
import { inJob, inSeeder } from '@/context';

@Entity({ abstract: true })
@Filter({
  name: 'principalAccess',
  cond: async (_ = {}, type) => {
    if (inJob() || inSeeder()) return;

    const projectPrincipal = requestContext.get('projectPrincipal');
    if (!projectPrincipal) return { _id: null };

    switch (type) {
      case 'read':
        return {
          createdBy: projectPrincipal,
          project: projectPrincipal.project
        };
      default:
        throw new Error('Not Implemented');
    }
  },
  default: true
})
export abstract class PrincipalScopedEntity extends BaseEntity {
  @Index()
  @ManyToOne()
  project: Ref<Project>;

  @ManyToOne()
  createdBy: Ref<ProjectPrincipal>;

  constructor({ project, createdBy, ...rest }: PrincipalScopedEntityInput) {
    super(rest);

    if (project && createdBy) {
      this.project = project;
      this.createdBy = createdBy;
    } else {
      const projectPrincipal = getProjectPrincipal();

      this.project = projectPrincipal.project;
      this.createdBy = ref(projectPrincipal);
    }
  }

  @BeforeCreate()
  @BeforeUpdate()
  @BeforeDelete()
  async authorize(_: EventArgs<any>) {
    if (inJob() || inSeeder()) return;

    const project = await this.project.loadOrFail({ filters: false });
    if (project.status === ProjectStatus.ARCHIVED)
      throw new APIError({
        message: "Archived project can't be used",
        code: APIErrorCode.FORBIDDEN
      });

    const projectPrincipal = getProjectPrincipal();
    if (this.createdBy.id !== projectPrincipal.id)
      throw new APIError({
        message: 'Insufficient permissions',
        code: APIErrorCode.FORBIDDEN
      });
  }
}

export type PrincipalScopedEntityInput = BaseEntityInput &
  Partial<Pick<PrincipalScopedEntity, 'project' | 'createdBy'>>;
