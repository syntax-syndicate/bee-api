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

import { Embeddable, Enum } from '@mikro-orm/core';

import { ToolType } from '../tool/tool.entity.js';

import { FunctionUsage } from './function-usage.entity.js';
import { FileSearchUsage } from './file-search-usage.entity.js';
import { CodeInterpreterUsage } from './code-interpreter-usage.entity.js';
import { UserUsage } from './user-usage.entity.js';
import { SystemUsage } from './system-usage.entity.js';

@Embeddable({ abstract: true, discriminatorColumn: 'type' })
export abstract class ToolUsage {
  @Enum(() => ToolType)
  type!: ToolType;
}

export type AnyToolUsage =
  | CodeInterpreterUsage
  | FileSearchUsage
  | FunctionUsage
  | SystemUsage
  | UserUsage;
