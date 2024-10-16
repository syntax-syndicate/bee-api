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

describe('Runs', () => {
  let client: OpenAI;
  let file: OpenAI.Files.FileObject;
  let vectorStore: OpenAI.Beta.VectorStores.VectorStore;
  let assistant: OpenAI.Beta.Assistants.Assistant;
  beforeAll(async () => {
    client = createClient();
    file = await client.files.create({
      purpose: 'assistants',
      file: new File(['ostrich'], 'animal.txt', { type: 'text/plain' })
    });
    vectorStore = await client.beta.vectorStores.create({ file_ids: [file.id] });
    assistant = await client.beta.assistants.create({
      model: 'meta-llama/llama-3-1-70b-instruct'
    });
  });

  afterAll(async () => {
    await client.beta.assistants.del(assistant.id);
    await client.beta.vectorStores.del(vectorStore.id);
    await client.files.del(file.id);
  });

  let thread: OpenAI.Beta.Threads.Thread;
  beforeEach(async () => {
    thread = await client.beta.threads.create();
  });

  afterEach(async () => {
    await client.beta.threads.del(thread.id);
  });

  test('CRU', async () => {
    const run = await client.beta.threads.runs.create(thread.id, {
      assistant_id: assistant.id
    });

    let retrievedRun = await client.beta.threads.runs.retrieve(thread.id, run.id);
    expect(retrievedRun).toBeDefined();

    const metadata = { foo: 'bar' };
    const updatedRun = await client.beta.threads.runs.update(thread.id, run.id, {
      metadata
    });
    expect(updatedRun.metadata).toEqual(metadata);

    retrievedRun = await client.beta.threads.runs.retrieve(thread.id, run.id);
    expect(retrievedRun.metadata).toEqual(metadata);
  });

  test('Create run and wait for completion', { timeout: 15_000 }, async () => {
    await client.beta.threads.messages.create(thread.id, { role: 'user', content: 'Howdy!' });
    const run = await client.beta.threads.runs.createAndPoll(thread.id, {
      assistant_id: assistant.id
    });
    expect(run.status).toEqual('completed');
  });

  describe('Tool usage', { timeout: 30_000 }, () => {
    describe('Core', () => {
      if (process.env.BEE_CODE_INTERPRETER_URL) {
        test('Code interpreter', { timeout: 60_000 }, async () => {
          await client.beta.threads.messages.create(thread.id, {
            role: 'user',
            content: 'Calculate sum of first 6 fibonacci numbers'
          });
          const run = await client.beta.threads.runs.createAndPoll(thread.id, {
            assistant_id: assistant.id,
            tools: [{ type: 'code_interpreter' }]
          });
          expect(run.status).toEqual('completed');
          const steps = [];
          for await (const step of client.beta.threads.runs.steps.list(run.thread_id, run.id)) {
            steps.push(step);
          }
          expect(steps).toEqual(
            expect.arrayContaining([
              expect.objectContaining({
                status: 'completed',
                step_details: expect.objectContaining({
                  tool_calls: expect.arrayContaining([
                    expect.objectContaining({ type: 'code_interpreter' })
                  ])
                })
              })
            ])
          );
        });
      }

      test('File search', { timeout: 60_000 }, async () => {
        await client.beta.threads.messages.create(thread.id, {
          role: 'user',
          content: 'Use File Search tool with query "animal"'
        });
        await client.beta.threads.update(thread.id, {
          tool_resources: {
            file_search: { vector_store_ids: [vectorStore.id] }
          }
        });
        const run = await client.beta.threads.runs.createAndPoll(thread.id, {
          assistant_id: assistant.id,
          tools: [
            {
              type: 'file_search'
            }
          ]
        });
        expect(run.status).toEqual('completed');

        const steps = [];
        for await (const step of client.beta.threads.runs.steps.list(run.thread_id, run.id)) {
          steps.push(step);
        }
        expect(steps).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              status: 'completed',
              step_details: expect.objectContaining({
                tool_calls: expect.arrayContaining([
                  expect.objectContaining({ type: 'file_search' })
                ])
              })
            })
          ])
        );
      });

      test('Function', async () => {
        await client.beta.threads.messages.create(thread.id, {
          role: 'user',
          content: 'Tell me where do I live?'
        });
        let run = await client.beta.threads.runs.createAndPoll(thread.id, {
          assistant_id: assistant.id,
          tools: [
            {
              type: 'function',
              function: {
                name: 'getLocation',
                description: "Retrieves user's location, use function call exactly once"
              }
            }
          ]
        });
        expect(run.status).toEqual('requires_action');
        expect(run.required_action?.submit_tool_outputs.tool_calls).toHaveLength(1);
        expect(run.required_action?.submit_tool_outputs.tool_calls[0].function.name).toBe(
          'getLocation'
        );
        run = await client.beta.threads.runs.submitToolOutputsAndPoll(run.thread_id, run.id, {
          tool_outputs: [
            {
              tool_call_id: run.required_action?.submit_tool_outputs.tool_calls[0].id,
              output: 'Venice'
            }
          ]
        });
        expect(run.status).toEqual('completed');
      });
    });

    describe('System', () => {
      test('File read', async () => {
        await client.beta.threads.messages.create(thread.id, {
          role: 'user',
          content: 'Read the full content of the attached file.',
          // @ts-expect-error not supported by OpenAI
          attachments: [{ file_id: file.id, tools: [{ type: 'system' as any, id: 'read_file' }] }]
        });
        const run = await client.beta.threads.runs.createAndPoll(thread.id, {
          assistant_id: assistant.id,
          tools: [
            {
              type: 'system' as any,
              // @ts-expect-error not supported by OpenAI
              system: {
                id: 'read_file'
              }
            }
          ]
        });
        expect(run.status).toEqual('completed');

        const steps = [];
        for await (const step of client.beta.threads.runs.steps.list(run.thread_id, run.id)) {
          steps.push(step);
        }
        expect(steps).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              status: 'completed',
              step_details: expect.objectContaining({
                tool_calls: expect.arrayContaining([
                  expect.objectContaining({
                    type: 'system',
                    system: expect.objectContaining({ id: 'read_file' })
                  })
                ])
              })
            })
          ])
        );
      });
    });
  });
});
