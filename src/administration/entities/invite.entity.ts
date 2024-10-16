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

import { Entity, Enum, Index, Property } from '@mikro-orm/core';

import { OrganizationUserRole } from './constants';
import {
  OrganizationAdministrationScopedEntity,
  OrganizationAdministrationScopedEntityInput
} from './organization-administration-scoped.entity';

export const InviteStatus = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  EXPIRED: 'expired'
} as const;
export type InviteStatus = (typeof InviteStatus)[keyof typeof InviteStatus];

@Entity()
export class Invite extends OrganizationAdministrationScopedEntity {
  getIdPrefix(): string {
    return 'invite';
  }

  @Index()
  @Property()
  email: string;

  @Enum(() => OrganizationUserRole)
  role: OrganizationUserRole;

  @Enum(() => InviteStatus)
  status: InviteStatus;

  @Property()
  expiresAt: Date;

  @Property()
  acceptedAt?: Date;

  constructor({ email, role, status, expiresAt, ...rest }: InviteInput) {
    super(rest);
    this.email = email;
    this.role = role;
    this.status = status;
    this.expiresAt = expiresAt;
  }
}

export type InviteInput = OrganizationAdministrationScopedEntityInput &
  Pick<Invite, 'email' | 'role' | 'status' | 'expiresAt'>;
