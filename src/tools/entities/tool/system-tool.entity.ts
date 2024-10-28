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

import { Entity, Enum, Property } from '@mikro-orm/core';

import { Tool, ToolExecutor, ToolInput, ToolType } from './tool.entity.js';

@Entity({ discriminatorValue: ToolExecutor.SYSTEM })
export class SystemTool extends Tool {
  executor = ToolExecutor.SYSTEM;

  @Property()
  inputSchema: string;

  @Enum(() => ToolType)
  _type: ToolType;

  override get type(): ToolType {
    return this._type;
  }

  constructor({ id, inputSchema, type, ...rest }: SystemToolInput) {
    super(rest);
    this.id = id;
    this.inputSchema = inputSchema;
    this._type = type;
  }
}

export type SystemToolInput = ToolInput &
  Pick<SystemTool, 'inputSchema' | 'id'> & { type: ToolType };
