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

import { File } from '@/files/entities/file.entity.js';
import { ToolType } from '@/tools/entities/tool/tool.entity.js';

export const attachmentTypes = [
  ToolType.CODE_INTERPRETER,
  ToolType.FILE_SEARCH,
  ToolType.USER,
  ToolType.SYSTEM
] satisfies Partial<ToolType>[];
export type AttachmentType = typeof attachmentTypes;

@Embeddable()
export class Attachment {
  @ManyToOne()
  file!: Ref<File>;

  @Property()
  tools?: { type: (typeof attachmentTypes)[number]; id?: string }[];

  constructor(input: AttachmentInput) {
    this.file = input.file;
    this.tools = input.tools;
  }
}

export type AttachmentInput = Pick<Attachment, 'file' | 'tools'>;
