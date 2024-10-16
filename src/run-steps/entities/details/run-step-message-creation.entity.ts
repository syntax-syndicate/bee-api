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

import { RunStepDetails, RunStepDetailsType } from './run-step-details.entity.js';

import { Message } from '@/messages/message.entity.js';

@Embeddable({ discriminatorValue: RunStepDetailsType.MESSAGE_CREATION })
export class RunStepMessageCreation extends RunStepDetails {
  type = RunStepDetailsType.MESSAGE_CREATION;

  @ManyToOne()
  message!: Ref<Message>;

  constructor(input: RunStepMessageCreationInput) {
    super();
    this.message = input.message;
  }
}

export type RunStepMessageCreationInput = Pick<RunStepMessageCreation, 'message'>;
