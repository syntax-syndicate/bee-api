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

import { Embeddable, Embedded, Property } from '@mikro-orm/core';

import { ToolType } from '../tool/tool.entity.js';

import { ToolCall } from './tool-call.entity.js';

import { FileContainer } from '@/files/entities/files-container.entity.js';

@Embeddable({ discriminatorValue: ToolType.CODE_INTERPRETER })
export class CodeInterpreterCall extends ToolCall {
  type = ToolType.CODE_INTERPRETER;

  @Property()
  input!: string;

  @Property()
  logs?: string[];

  @Embedded({ object: true })
  fileContainers?: FileContainer[];

  constructor({ input }: CodeInterpreterCallInput) {
    super();
    this.input = input;
  }
}

export type CodeInterpreterCallInput = Pick<CodeInterpreterCall, 'input'>;
