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
  BeforeUpdate,
  Collection,
  Embedded,
  Entity,
  OneToMany,
  Property,
  QueryOrder
} from '@mikro-orm/core';
import dayjs from 'dayjs';

import { ProjectScopedEntity, ProjectScopedEntityInput } from '@/common/project-scoped.entity';
import { VectorStoreExpirationAfter } from '@/vector-stores/entities/vector-store-expiration-after.entity.js';
import {
  VectorStoreFile,
  VectorStoreFileStatus
} from '@/vector-store-files/entities/vector-store-file.entity.js';

@Entity()
export class VectorStore extends ProjectScopedEntity {
  getIdPrefix(): string {
    return 'vs';
  }

  @Property()
  name: string;

  @Property()
  description?: string;

  @Embedded({ object: true })
  expiresAfter?: VectorStoreExpirationAfter;

  @Property()
  lastActiveAt: Date = new Date();

  @Property()
  expiresAt?: Date;

  @BeforeUpdate()
  private updateExpiration() {
    if (this.expiresAfter) {
      const anchor = this.expiresAfter.anchor as keyof Pick<
        VectorStore,
        'lastActiveAt' | 'createdAt'
      >;
      this.expiresAt = dayjs(this[anchor]).add(this.expiresAfter.days, 'day').toDate();
    } else {
      this.expiresAt = undefined;
    }
  }

  get expired(): boolean {
    return this.expiresAt ? this.expiresAt < new Date() : false;
  }

  @OneToMany<VectorStoreFile, VectorStoreFile>({
    mappedBy: 'vectorStore',
    orderBy: [{ createdAt: QueryOrder.ASC }]
  })
  files: Collection<VectorStoreFile> = new Collection<VectorStoreFile>(this);

  @OneToMany<VectorStoreFile, VectorStoreFile>({
    mappedBy: 'vectorStore',
    where: { status: VectorStoreFileStatus.COMPLETED }
  })
  completedFiles = new Collection<VectorStoreFile>(this);

  constructor({ name, expiresAfter, ...rest }: VectorStoreInput) {
    super(rest);
    this.name = name;
    this.expiresAfter = expiresAfter;
    if (expiresAfter) {
      this.expiresAt = dayjs(this[expiresAfter.anchor as keyof this] as Date)
        .add(expiresAfter.days, 'day')
        .toDate();
    }
  }
}

export type VectorStoreInput = ProjectScopedEntityInput &
  Pick<VectorStore, 'name' | 'expiresAfter'>;
