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

import { Transform, TransformCallback, TransformOptions, Readable } from 'node:stream';
import { Hash } from 'node:crypto';

export class PassthroughHash extends Transform {
  public readonly hash: Hash;

  constructor({ hash, ...opts }: { hash: Hash } & TransformOptions) {
    super(opts);
    this.hash = hash;
  }

  _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback) {
    this.hash.update(chunk);
    callback(null, chunk);
  }
}

export async function toBuffer(readable: Buffer | Readable) {
  const chunks: any[] = [];
  for await (const chunk of readable) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}
