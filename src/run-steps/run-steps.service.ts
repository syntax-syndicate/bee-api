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

import { Loaded } from '@mikro-orm/core';
import dayjs from 'dayjs';

import { RunStep } from './entities/run-step.entity.js';
import type { RunStep as RunStepDto } from './dtos/run-step.js';
import type { RunStepDelta as RunStepDeltaDto } from './dtos/run-step-delta.js';
import type { RunStepDetails as RunStepDetailsDto } from './dtos/run-step-details.js';
import type { RunStepDetailsDelta as RunStepDetailsDeltaDto } from './dtos/run-step-details-delta.js';
import { RunStepReadParams, RunStepReadResponse } from './dtos/run-step-read.js';
import {
  RunStepsListParams,
  RunStepsListQuery,
  RunStepsListResponse
} from './dtos/run-steps-list.js';
import {
  AnyRunStepDetails,
  RunStepDetailsType
} from './entities/details/run-step-details.entity.js';

import { ORM } from '@/database.js';
import { createPaginatedResponse, getListCursor } from '@/utils/pagination.js';
import { toToolCallDeltaDto, toToolCallDto } from '@/tools/tools.service.js';
import { toErrorDto } from '@/errors/plugin.js';

export function toRunStepDto(runStep: Loaded<RunStep, 'details.fileContainers.file'>): RunStepDto {
  return {
    id: runStep.id,
    object: 'thread.run.step',
    assistant_id: runStep.assistant.id,
    thread_id: runStep.thread.id,
    run_id: runStep.run.id,
    status: runStep.status,
    type: runStep.details.type,
    step_details: toRunStepDetailsDto(runStep.details),
    last_error: runStep.lastError ? toErrorDto(runStep.lastError) : null,
    metadata: runStep.metadata ?? {},
    created_at: dayjs(runStep.createdAt).unix()
  };
}

export function toRunStepDeltaDto(
  runStep: Loaded<RunStep, 'details.fileContainers.file'>,
  delta: string
): RunStepDeltaDto {
  return {
    id: runStep.id,
    object: 'thread.run.step.delta',
    delta: {
      step_details: toRunStepDetailsDeltaDto(runStep.details, delta)
    }
  };
}

function toRunStepDetailsDto(
  runStep: Loaded<AnyRunStepDetails, 'fileContainers.file'>
): RunStepDetailsDto {
  switch (runStep.type) {
    case RunStepDetailsType.MESSAGE_CREATION:
      return {
        type: RunStepDetailsType.MESSAGE_CREATION,
        [RunStepDetailsType.MESSAGE_CREATION]: { message_id: runStep.message.id }
      };
    case RunStepDetailsType.TOOL_CALLS:
      return {
        type: RunStepDetailsType.TOOL_CALLS,
        [RunStepDetailsType.TOOL_CALLS]: runStep.toolCalls.map(toToolCallDto)
      };
    case RunStepDetailsType.THOUGHT:
      return {
        type: RunStepDetailsType.THOUGHT,
        [RunStepDetailsType.THOUGHT]: { content: runStep.content ?? null }
      };
  }
}

function toRunStepDetailsDeltaDto(
  runStep: AnyRunStepDetails,
  delta: string
): RunStepDetailsDeltaDto {
  switch (runStep.type) {
    case RunStepDetailsType.MESSAGE_CREATION:
      return {
        type: RunStepDetailsType.MESSAGE_CREATION,
        [RunStepDetailsType.MESSAGE_CREATION]: { message_id: runStep.message.id }
      };
    case RunStepDetailsType.TOOL_CALLS:
      return {
        type: RunStepDetailsType.TOOL_CALLS,
        [RunStepDetailsType.TOOL_CALLS]: runStep.toolCalls.map(toToolCallDeltaDto)
      };
    case RunStepDetailsType.THOUGHT:
      return {
        type: RunStepDetailsType.THOUGHT,
        [RunStepDetailsType.THOUGHT]: { content: delta }
      };
  }
}

export async function readRunStep({
  thread_id,
  run_id,
  step_id
}: RunStepReadParams): Promise<RunStepReadResponse> {
  const runStep = await ORM.em.getRepository(RunStep).findOneOrFail({
    id: step_id,
    run: run_id,
    thread: thread_id
  });
  return toRunStepDto(runStep);
}

export async function listRunSteps({
  thread_id,
  run_id,
  limit,
  after,
  before,
  order,
  order_by
}: RunStepsListParams & RunStepsListQuery): Promise<RunStepsListResponse> {
  const repo = ORM.em.getRepository(RunStep);
  const cursor = await getListCursor<RunStep>(
    { thread: thread_id, run: run_id },
    { limit, order, order_by, after, before },
    repo
  );
  return createPaginatedResponse(cursor, toRunStepDto);
}
