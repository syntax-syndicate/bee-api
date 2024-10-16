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

import { Entity, Enum, Index, Property } from '@mikro-orm/core';

import { ApiTool } from './api-tool.entity.js';
import { CodeInterpreterTool } from './code-interpreter-tool.entity.js';
import { FunctionTool } from './function-tool.entity.js';

import { ProjectScopedEntity, ProjectScopedEntityInput } from '@/common/project-scoped.entity.js';

export const ToolType = {
  CODE_INTERPRETER: 'code_interpreter',
  FILE_SEARCH: 'file_search',
  FUNCTION: 'function',
  USER: 'user',
  SYSTEM: 'system'
} as const;
export type ToolType = (typeof ToolType)[keyof typeof ToolType];

export const ToolExecutor = {
  FUNCTION: 'function',
  CODE_INTERPRETER: 'code_interpreter',
  API: 'api'
} as const;
export type ToolExecutor = (typeof ToolExecutor)[keyof typeof ToolExecutor];

@Entity({ abstract: true, discriminatorColumn: 'executor' })
@Index({
  options: [
    {
      name: 1,
      createdBy: 1
    },
    {
      unique: true,
      partialFilterExpression: { deletedAt: { $in: [null] } }
    }
  ]
})
export abstract class Tool extends ProjectScopedEntity {
  getIdPrefix(): string {
    return 'tool';
  }

  @Enum(() => ToolExecutor)
  executor!: ToolExecutor;

  @Property()
  name: string;

  @Property()
  description: string;

  @Property()
  userDescription?: string;

  @Property({ persist: false })
  public get type(): ToolType {
    return ToolType.USER;
  }

  constructor({ name, description, userDescription, ...rest }: ToolInput) {
    super(rest);
    this.name = name;
    this.description = description;
    this.userDescription = userDescription;
  }
}

export type ToolInput = ProjectScopedEntityInput &
  Pick<Tool, 'name' | 'description'> &
  Partial<Pick<Tool, 'userDescription'>>;

export type AnyTool = ApiTool | CodeInterpreterTool | FunctionTool;
