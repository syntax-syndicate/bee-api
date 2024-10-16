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

import { Embeddable, ManyToOne, Ref } from '@mikro-orm/core';

import { OrganizationUser } from '../organization-user.entity.js';

import { Principal, PrincipalType } from './principal.entity.js';

@Embeddable({ discriminatorValue: PrincipalType.USER })
export class UserPrincipal extends Principal {
  type = PrincipalType.USER;

  @ManyToOne()
  user: Ref<OrganizationUser>;

  constructor({ user }: UserPrincipalInput) {
    super();
    this.user = user;
  }
}

export type UserPrincipalInput = Pick<UserPrincipal, 'user'>;
