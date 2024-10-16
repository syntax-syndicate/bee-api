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

describe('Assistants', () => {
  let client: OpenAI;
  beforeAll(async () => {
    client = createClient();
  });

  test('CRUD', async () => {
    const assistant = await client.beta.assistants.create({
      model: 'meta-llama/llama-3-1-70b-instruct',
      tools: [{ type: 'code_interpreter' }]
    });
    try {
      let retrievedAssistant = await client.beta.assistants.retrieve(assistant.id);
      expect(retrievedAssistant).toEqual(assistant);

      const model = 'qwen/qwen2-72b-instruct';
      const updatedAssistant = await client.beta.assistants.update(assistant.id, {
        model
      });
      expect(updatedAssistant).toEqual({ ...assistant, model });

      retrievedAssistant = await client.beta.assistants.retrieve(assistant.id);
      expect(retrievedAssistant).toEqual(updatedAssistant);
    } finally {
      await client.beta.assistants.del(assistant.id);
      await expect(client.beta.assistants.retrieve(assistant.id)).rejects.toThrow();
    }
  });
});
