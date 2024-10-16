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

import { createCipheriv, randomBytes } from 'crypto';

import {
  CRYPTO_ALGORITHM,
  CRYPTO_INPUT_ENCODING,
  CRYPTO_IV_LENGTH,
  CRYPTO_OUTPUT_ENCODING
} from './config.js';

import { CRYPTO_CIPHER_KEY } from '@/config.js';

const encrypt = (input: string) => {
  const iv = randomBytes(CRYPTO_IV_LENGTH);
  const cipher = createCipheriv(CRYPTO_ALGORITHM, CRYPTO_CIPHER_KEY, iv);
  const encrypted = Buffer.concat([
    iv,
    cipher.update(input, CRYPTO_INPUT_ENCODING),
    cipher.final()
  ]);
  return encrypted.toString(CRYPTO_OUTPUT_ENCODING);
};

export default encrypt;
