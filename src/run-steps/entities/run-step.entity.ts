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

import { Embedded, Entity, Enum, Index, ManyToOne, Ref } from '@mikro-orm/core';

import { Run } from '../../runs/entities/run.entity.js';

import { RunStepMessageCreation } from './details/run-step-message-creation.entity.js';
import { RunStepToolCalls } from './details/run-step-tool-calls.entity.js';
import { RunStepThought } from './details/run-step-thought.entity.js';
import { EmitterEvent } from './emitter-event.entity.js';

import { Assistant } from '@/assistants/assistant.entity.js';
import { Thread } from '@/threads/thread.entity.js';
import { APIError } from '@/errors/error.entity.js';
import {
  PrincipalScopedEntity,
  PrincipalScopedEntityInput
} from '@/common/principal-scoped.entity.js';

export const RunStepStatus = {
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled'
} as const;
export type RunStepStatus = (typeof RunStepStatus)[keyof typeof RunStepStatus];

@Entity()
@Index({ properties: ['thread', 'run'] })
export class RunStep extends PrincipalScopedEntity {
  getIdPrefix(): string {
    return 'step';
  }

  @Index()
  @ManyToOne()
  thread!: Ref<Thread>;

  @ManyToOne()
  run!: Ref<Run>;

  @ManyToOne()
  assistant!: Ref<Assistant>;

  @Enum(() => RunStepStatus)
  status: RunStepStatus = RunStepStatus.IN_PROGRESS;

  @Embedded({ object: true })
  details!: RunStepMessageCreation | RunStepThought | RunStepToolCalls;

  @Embedded({ object: true })
  lastError?: APIError;

  @Embedded({ object: true })
  event?: EmitterEvent;

  constructor(input: RunStepInput) {
    super(input);
    Object.assign(this, input);
  }
}

export type RunStepInput = PrincipalScopedEntityInput &
  Pick<RunStep, 'thread' | 'run' | 'assistant' | 'details' | 'event'>;
