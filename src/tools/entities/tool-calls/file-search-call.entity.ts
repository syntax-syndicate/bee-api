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

import { Embeddable, Property } from '@mikro-orm/core';

import { ToolType } from '../tool/tool.entity.js';

import { ToolCall } from './tool-call.entity.js';

import { FileSearchToolResult } from '@/runs/execution/tools/file-search-tool.js';

@Embeddable({ discriminatorValue: ToolType.FILE_SEARCH })
export class FileSearchCall extends ToolCall {
  type = ToolType.FILE_SEARCH;
  @Property()
  input!: string;

  @Property({ type: 'json' })
  results?: FileSearchToolResult[];

  constructor({ input, results }: FileSearchCallInput) {
    super();
    this.input = input;
    this.results = results;
  }
}

export type FileSearchCallInput = Pick<FileSearchCall, 'input' | 'results'>;
