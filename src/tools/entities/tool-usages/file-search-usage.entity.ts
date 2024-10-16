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

import { ToolUsage } from './tool-usage.entity.js';

@Embeddable({ discriminatorValue: ToolType.FILE_SEARCH })
export class FileSearchUsage extends ToolUsage {
  type = ToolType.FILE_SEARCH;

  @Property()
  maxNumResults!: number;

  constructor({ maxNumResults }: FileSearchUsageInput) {
    super();
    this.maxNumResults = maxNumResults;
  }
}

export type FileSearchUsageInput = Pick<FileSearchUsage, 'maxNumResults'>;
