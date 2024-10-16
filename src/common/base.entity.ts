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

import { Filter, PrimaryKey, Property } from '@mikro-orm/core';

import { generatePrefixedObjectId } from '@/utils/id.js';

@Filter({
  name: 'deleted',
  cond: { deletedAt: undefined },
  default: true
})
export abstract class BaseEntity {
  abstract getIdPrefix(): string;

  @PrimaryKey({ fieldName: '_id' })
  id = generatePrefixedObjectId(this.getIdPrefix());

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property()
  deletedAt?: Date;

  delete() {
    this.deletedAt = new Date();
  }

  resurrect() {
    this.deletedAt = undefined;
  }

  @Property()
  metadata?: Record<string, string>;

  constructor({ metadata }: BaseEntityInput) {
    this.metadata = metadata;
  }
}

export type BaseEntityInput = Pick<BaseEntity, 'metadata'>;
