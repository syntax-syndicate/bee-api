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

import { expect } from 'vitest';
import OpenAI from 'openai';

import { createClient } from './utils.js';

describe('Threads', () => {
  let client: OpenAI;
  beforeAll(async () => {
    client = createClient();
  });

  test('CRUD', async () => {
    const thread = await client.beta.threads.create();
    try {
      let retrievedThread = await client.beta.threads.retrieve(thread.id);
      expect(retrievedThread).toEqual(thread);

      const metadata = { foo: 'bar' };
      const updatedThread = await client.beta.threads.update(thread.id, {
        metadata
      });
      expect(updatedThread).toEqual({ ...thread, metadata });

      retrievedThread = await client.beta.threads.retrieve(thread.id);
      expect(retrievedThread).toEqual(updatedThread);
    } finally {
      await client.beta.threads.del(thread.id);
      await expect(client.beta.threads.retrieve(thread.id)).rejects.toThrow();
    }
  });
});
