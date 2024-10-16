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

import { Embeddable, Enum, Property } from '@mikro-orm/core';

import { ToolType } from '../tool/tool.entity.js';

import { CodeInterpreterCall } from './code-interpreter-call.entity.js';
import { FileSearchCall } from './file-search-call.entity.js';
import { FunctionCall } from './function-call.entity.js';
import { UserCall } from './user-call.entity.js';
import { SystemCall } from './system-call.entity.js';

import { generatePrefixedObjectId } from '@/utils/id.js';

@Embeddable({ abstract: true, discriminatorColumn: 'type' })
export abstract class ToolCall {
  @Property({ fieldName: '_id' })
  id = generatePrefixedObjectId('call');

  @Enum(() => ToolType)
  type!: ToolType;
}

export type AnyToolCall =
  | CodeInterpreterCall
  | FileSearchCall
  | FunctionCall
  | SystemCall
  | UserCall;
