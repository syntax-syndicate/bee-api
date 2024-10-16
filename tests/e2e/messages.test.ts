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

describe('Messages', () => {
  let client: OpenAI;
  beforeAll(async () => {
    client = createClient();
  });

  let thread: OpenAI.Beta.Threads.Thread;
  beforeEach(async () => {
    thread = await client.beta.threads.create();
  });

  afterEach(async () => {
    await client.beta.threads.del(thread.id);
  });

  test('CRUD', async () => {
    const message = await client.beta.threads.messages.create(thread.id, {
      content: 'foobar',
      role: 'user'
    });
    try {
      let retrievedMessage = await client.beta.threads.messages.retrieve(thread.id, message.id);
      expect(retrievedMessage).toEqual(message);

      const metadata = { foo: 'bar' };
      const updatedMessage = await client.beta.threads.messages.update(thread.id, message.id, {
        metadata
      });
      expect(updatedMessage).toEqual({ ...message, metadata });

      retrievedMessage = await client.beta.threads.messages.retrieve(thread.id, message.id);
      expect(retrievedMessage).toEqual(updatedMessage);
    } finally {
      await client.beta.threads.messages.del(thread.id, message.id);
      await expect(client.beta.threads.messages.retrieve(thread.id, message.id)).rejects.toThrow();
    }
  });
});
