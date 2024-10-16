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

describe('Files', () => {
  let client: OpenAI;
  beforeAll(async () => {
    client = createClient();
  });

  test('CRUD', async () => {
    const content = 'foobar';
    const type = 'text/plain';
    const file = await client.files.create({
      purpose: 'assistants',
      file: new File([content], 'test.txt', { type })
    });
    try {
      const retrievedFile = await client.files.retrieve(file.id);
      expect(retrievedFile).toEqual(file);

      const retrievedContentResponse = await client.files.content(file.id);
      expect(retrievedContentResponse.headers.get('content-type')).toEqual(type);
      expect(await retrievedContentResponse.text()).toEqual(content);
    } finally {
      await client.files.del(file.id);
      await expect(client.files.retrieve(file.id)).rejects.toThrow();
    }
  });
});
