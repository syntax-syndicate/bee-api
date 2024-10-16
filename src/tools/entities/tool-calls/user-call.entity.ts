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

import { Embeddable, ManyToOne, Property, Ref } from '@mikro-orm/core';

import { Tool, ToolType } from '../tool/tool.entity.js';

import { ToolCall } from './tool-call.entity.js';

@Embeddable({ discriminatorValue: ToolType.USER })
export class UserCall extends ToolCall {
  type = ToolType.USER;

  @ManyToOne()
  tool!: Ref<Tool>;

  @Property()
  arguments?: string;

  @Property()
  output?: string;

  constructor({ tool, arguments: args, output }: UserCallInput) {
    super();
    this.tool = tool;
    this.arguments = args;
    this.output = output;
  }
}

export type UserCallInput = Pick<UserCall, 'tool' | 'arguments' | 'output'>;
