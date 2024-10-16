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

import { Collection, Embedded, Entity, OneToMany, QueryOrder } from '@mikro-orm/core';

import { Message } from '@/messages/message.entity.js';
import { FileSearchResource } from '@/tools/entities/tool-resources/file-search-resources.entity.js';
import { CodeInterpreterResource } from '@/tools/entities/tool-resources/code-interpreter-resource.entity.js';
import { AnyToolResource } from '@/tools/entities/tool-resources/tool-resource.entity.js';
import {
  PrincipalScopedEntity,
  PrincipalScopedEntityInput
} from '@/common/principal-scoped.entity';
import { UserResource } from '@/tools/entities/tool-resources/user-resource.entity';
import { SystemResource } from '@/tools/entities/tool-resources/system-resource.entity';

@Entity()
export class Thread extends PrincipalScopedEntity {
  getIdPrefix(): string {
    return 'thread';
  }

  @OneToMany<Message, Message>({
    mappedBy: 'thread',
    orderBy: [{ createdAt: QueryOrder.ASC }, { order: QueryOrder.ASC }]
  })
  messages: Collection<Message> = new Collection<Message>(this);

  // Union must be defined in alphabetical order, otherwise Mikro-ORM won't discovered the auto-created virtual polymorphic entity
  @Embedded({ object: true })
  toolResources?: (CodeInterpreterResource | FileSearchResource | SystemResource | UserResource)[];

  constructor({ toolResources, ...rest }: ThreadInput) {
    super(rest);
    this.toolResources = toolResources;
  }
}

export type ThreadInput = PrincipalScopedEntityInput & {
  toolResources?: AnyToolResource[];
};
