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

import { Readable } from 'node:stream';
import { promisify } from 'node:util';

import yauzl, { Options, ZipFile } from 'yauzl';

import { WDU_URL } from '@/config.js';
import { toBuffer } from '@/utils/streams.js';

export function canBeExtracted(mimeType: string) {
  if (!WDU_URL) return false;
  // allowed types are specified in WDU docs
  return [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/tiff',
    'image/bmp',
    'image/gif'
  ].includes(mimeType);
}

export async function extract(filename: string, content: Readable) {
  if (!WDU_URL) throw new Error('Missing WDU_URL');
  const response = await fetch(new URL('/api/v1/task/doc-processing', WDU_URL), {
    method: 'POST',
    headers: {
      ['Content-Type']: 'application/json'
    },
    body: JSON.stringify({
      model_id: 'doc_processing',
      inputs: {
        file: {
          filename,
          data: (await toBuffer(content)).toString('base64')
        }
      },
      parameters: {
        languages_list: ['eng'],
        output_type: 'parse_json_and_gte',
        auto_rotation_correction: false,
        include_serialization: true
      }
    })
  });

  if (!response.ok) {
    const text = await response.text().catch(() => null);
    throw new Error(`Extraction service failed; status: ${response.status}; response: ${text}`);
  }

  const fromBuffer = promisify<Buffer, Options, ZipFile>(yauzl.fromBuffer);
  const zipFile = await fromBuffer(Buffer.from(await response.arrayBuffer()), {
    decodeStrings: false
  }); // built-in string decoding throws on absolute paths like /page_images, that is apparently a safety feature. We trust the backend so we decode the filename manually.
  const openReadStream = promisify(zipFile.openReadStream.bind(zipFile));

  let dataBufferPromise: Promise<Buffer> | undefined;
  // Parse the zip file and start uploads
  await new Promise<void>((resolve) => {
    zipFile.on('entry', async (entry) => {
      const fileName = entry.fileName.toString('utf8');
      if (fileName === 'serialization.txt') {
        dataBufferPromise = toBuffer(await openReadStream(entry));
      }
    });
    zipFile.on('end', () => {
      resolve();
    });
  });

  if (!dataBufferPromise) throw new Error('Response is missing serialized extraction');

  return (await dataBufferPromise).toString('utf8');
}
