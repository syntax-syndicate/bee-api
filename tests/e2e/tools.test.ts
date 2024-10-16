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
import OpenAI, { NotFoundError } from 'openai';
import { randomString } from 'remeda';

import { createClient } from './utils.js';

import { Tool } from '@/tools/dtos/tool.js';
import { ToolDeleteResponse } from '@/tools/dtos/tool-delete.js';

describe('Tools', () => {
  let client: OpenAI;
  beforeAll(async () => {
    client = createClient();
  });

  if (process.env.BEE_CODE_INTERPRETER_URL) {
    test('CRUD', async () => {
      const tool: Tool = await client.post('/tools', {
        body: {
          source_code: `import typing
import requests

def fun_${randomString(5)}(lat: float, lon: float):
    """
    Get the current weather at a location.

    :param lat: A latitude.
    :param lon: A longitude.
    :return: A dictionary with the current weather.
    """
    url = "https://api.open-meteo.com/v1/forecast?latitude={}&longitude={}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m".format(lat, lon)
    response = requests.get(url)
    response.raise_for_status()
    return response.json()`,
          user_description: 'Get information about current weather'
        }
      });
      try {
        const retrievedTool: Tool = await client.get(`/tools/${tool.id}`);
        expect(retrievedTool).toEqual(tool);

        const newName = `fun_${randomString(8)}`;
        const updatedTool: Tool = await client.post(`/tools/${tool.id}`, {
          body: { name: newName }
        });
        expect(updatedTool).toHaveProperty('name', newName);
      } finally {
        const deleted: ToolDeleteResponse = await client.delete(`/tools/${tool.id}`);
        expect(deleted.object).toEqual('tool.deleted');
        try {
          await client.get(`/tools/${tool.id}`);
        } catch (e) {
          expect(e).toBeInstanceOf(NotFoundError);
        }
      }
    });
  }
});
