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

import { Embeddable, Embedded, Ref } from '@mikro-orm/core';

import { ToolType } from '../tool/tool.entity.js';

import { ToolResource } from './tool-resource.entity.js';

import { File } from '@/files/entities/file.entity.js';
import { FileContainer } from '@/files/entities/files-container.entity.js';

@Embeddable({ discriminatorValue: ToolType.CODE_INTERPRETER })
export class CodeInterpreterResource extends ToolResource {
  type = ToolType.CODE_INTERPRETER;

  @Embedded({ object: true })
  fileContainers: FileContainer[];

  constructor({ files }: CodeInterpreterResourceInput) {
    super();
    this.fileContainers = files.map((file) => new FileContainer({ file }));
  }
}

export type CodeInterpreterResourceInput = { files: File[] | Ref<File>[] };
