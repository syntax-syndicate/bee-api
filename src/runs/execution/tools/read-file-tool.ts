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

import {
  BaseToolOptions,
  ToolInput,
  StringToolOutput,
  Tool,
  ToolError
} from 'bee-agent-framework/tools/base';
import { ZodLiteral, z } from 'zod';

import { getExtractedFileObject } from '@/files/files.service.js';
import { File } from '@/files/entities/file.entity.js';

export interface ReadFileToolOptions extends BaseToolOptions {
  fileSize: number;
  files: File[];
}

export class ReadFileTool extends Tool<StringToolOutput, ReadFileToolOptions> {
  name = `ReadFile`;
  description = 'Retrieve file content.';
  inputSchema() {
    return z.object({
      id:
        this.options.files.length === 1
          ? z
              .literal(this.options.files[0].id)
              .describe(`Id of the file with name ${this.options.files[0].filename}`)
          : z
              .union(
                this.options.files.map((file) =>
                  z.literal(file.id).describe(`Id of the file with name ${file.filename}`)
                ) as [ZodLiteral<string>, ZodLiteral<string>, ...ZodLiteral<string>[]]
              )
              .describe('File id.')
    });
  }

  protected async _run({ id }: ToolInput<ReadFileTool>): Promise<StringToolOutput> {
    const file = this.options.files.find((file) => file.id === id);
    if (!file) {
      throw new ToolError(`File ${id} not found.`);
    }
    try {
      const fileObject = await getExtractedFileObject(file);
      if ((fileObject.ContentLength ?? 0) > this.options.fileSize) {
        throw new ToolError(
          `The file is too big (${fileObject.ContentLength} bytes). Maximum allowed size is ${this.options.fileSize} bytes`,
          [],
          {
            isFatal: false,
            isRetryable: true
          }
        );
      }

      return new StringToolOutput('file content: \n' + fileObject.Body?.toString());
    } catch {
      throw new ToolError('This file is not a text file and can not be read.', [], {
        isFatal: false,
        isRetryable: true
      });
    }
  }
}
