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

export type SnakeToCamelCase<Key extends string> =
  Key extends `${infer FirstPart}_${infer FirstLetter}${infer LastPart}`
    ? `${FirstPart}${Uppercase<FirstLetter>}${SnakeToCamelCase<LastPart>}`
    : Key;

export function snakeToCamel<S extends string>(str: S) {
  return str
    .replace(/[^a-zA-Z0-9]/g, '_')
    .replace(/(_)+/g, '_')
    .replace(/([_][a-zA-Z])/g, (group) =>
      group.toUpperCase().replace('_', '')
    ) as SnakeToCamelCase<S>;
}
