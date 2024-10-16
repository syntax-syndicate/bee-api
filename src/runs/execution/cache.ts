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

import { Redis } from 'ioredis';
import { BaseCache } from 'bee-agent-framework/cache/base';
import { Serializer } from 'bee-agent-framework';

import { getLogger } from '@/logger';

export interface RedisCacheInput {
  client: Redis;
  ttlSeconds?: number;
  keyPrefix?: string;
}

export class RedisCache<T> extends BaseCache<T> {
  public readonly client: Redis;
  public readonly keyPrefix?: string;
  public ttlSeconds?: number;

  static {
    this.register();
  }

  constructor({ client, ttlSeconds, keyPrefix }: RedisCacheInput) {
    super();
    this.client = client;
    this.keyPrefix = keyPrefix;
    this.ttlSeconds = ttlSeconds;
  }

  private createRedisKey(key: string) {
    return `${this.keyPrefix ?? ''}${key}`;
  }

  async size(): Promise<number> {
    throw new Error('Operation not supported');
  }

  async set(key: string, value: T): Promise<void> {
    // Awaiting the value directly would cause deadlock when used with Tasks
    (async () => {
      try {
        const redisKey = this.createRedisKey(key);
        if (this.ttlSeconds) {
          await this.client.set(redisKey, Serializer.serialize(await value), 'EX', this.ttlSeconds);
        } else {
          await this.client.set(redisKey, Serializer.serialize(await value));
        }
      } catch (err) {
        getLogger().warn({ err }, 'Failed to set cache');
      }
    })();
  }

  async get(key: string): Promise<T | undefined> {
    const value = await this.client.get(this.createRedisKey(key));
    if (value) {
      return Serializer.deserialize(value);
    }
  }

  async has(key: string): Promise<boolean> {
    const result = await this.client.exists(this.createRedisKey(key));
    return !!result;
  }

  async delete(key: string): Promise<boolean> {
    const result = await this.client.del(this.createRedisKey(key));
    return !!result;
  }

  clear(): Promise<void> {
    throw new Error('Operation not supported');
  }

  createSnapshot(): unknown {
    throw new Error('Operation not supported');
  }

  loadSnapshot(_: unknown): void {
    throw new Error('Operation not supported');
  }
}
