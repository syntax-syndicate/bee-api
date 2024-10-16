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

import { Loaded } from '@mikro-orm/core';

import { BaseEntity } from '@/common/base.entity.js';
import { ORM } from '@/database.js';
import { getLogger } from '@/logger.js';

const STATUS_POLL_INTERVAL = 5 * 1000;

type HasCancelling<T> = 'cancelling' extends T ? T : never;

export function watchForCancellation<
  EntityType extends BaseEntity & { status: HasCancelling<EntityType['status']> }
>(
  entityType: new (...args: any[]) => EntityType,
  { id }: Loaded<EntityType>,
  onCancel: () => void
) {
  const check = async () => {
    try {
      const { status, deletedAt } = await ORM.em
        .getRepository(entityType)
        .findOneOrFail({ id }, { refresh: true, filters: { deleted: false } });

      if (status === 'cancelling') onCancel();
      if (deletedAt) onCancel(); // We also cancel if the entity was deleted in the meantime
    } catch (err) {
      getLogger().error({ err }, 'Failed to check {entity} status');
    }
  };
  const intervalId = setInterval(check, STATUS_POLL_INTERVAL);
  return () => clearInterval(intervalId);
}
