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

import { Entity, Property } from '@mikro-orm/core';

import {
  ProjectAdministrationScopedEntity,
  ProjectAdministrationScopedEntityInput
} from './project-administration-scoped.entity';

@Entity()
export class ServiceAccount extends ProjectAdministrationScopedEntity {
  getIdPrefix(): string {
    return 'svc_acct';
  }

  @Property()
  name: string;

  constructor({ name, ...rest }: ServiceAccountInput) {
    super(rest);
    this.name = name;
  }
}

export type ServiceAccountInput = ProjectAdministrationScopedEntityInput &
  Pick<ServiceAccount, 'name'>;
