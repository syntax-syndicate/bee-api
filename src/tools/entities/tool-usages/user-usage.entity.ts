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

import { Embeddable, ManyToOne, Ref } from '@mikro-orm/core';

import { ToolType } from '../tool/tool.entity.js';
import { FunctionTool } from '../tool/function-tool.entity.js';
import { CodeInterpreterTool } from '../tool/code-interpreter-tool.entity.js';
import { ApiTool } from '../tool/api-tool.entity.js';

import { ToolUsage } from './tool-usage.entity.js';

@Embeddable({ discriminatorValue: ToolType.USER })
export class UserUsage extends ToolUsage {
  type = ToolType.USER;

  @ManyToOne()
  tool!: Ref<FunctionTool> | Ref<CodeInterpreterTool> | Ref<ApiTool>;

  constructor({ tool }: UserUsageInput) {
    super();
    this.tool = tool;
  }
}

export type UserUsageInput = Pick<UserUsage, 'tool'>;
