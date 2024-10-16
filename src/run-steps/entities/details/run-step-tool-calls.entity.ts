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

import { Embeddable, Embedded } from '@mikro-orm/core';

import { RunStepDetails, RunStepDetailsType } from './run-step-details.entity.js';

import { CodeInterpreterCall } from '@/tools/entities/tool-calls/code-interpreter-call.entity.js';
import { FileSearchCall } from '@/tools/entities/tool-calls/file-search-call.entity.js';
import { FunctionCall } from '@/tools/entities/tool-calls/function-call.entity.js';
import { UserCall } from '@/tools/entities/tool-calls/user-call.entity.js';
import { SystemCall } from '@/tools/entities/tool-calls/system-call.entity.js';

@Embeddable({ discriminatorValue: RunStepDetailsType.TOOL_CALLS })
export class RunStepToolCalls extends RunStepDetails {
  type = RunStepDetailsType.TOOL_CALLS;

  // Union must be defined in alphabetical order, otherwise Mikro-ORM won't discovered the auto-created virtual polymorphic entity
  @Embedded({ object: true })
  toolCalls!: (CodeInterpreterCall | FileSearchCall | FunctionCall | SystemCall | UserCall)[];

  constructor(input: RunStepToolCallsInput) {
    super();
    this.toolCalls = input.toolCalls;
  }
}

export type RunStepToolCallsInput = Pick<RunStepToolCalls, 'toolCalls'>;
