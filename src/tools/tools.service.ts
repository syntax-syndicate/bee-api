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

import { FilterQuery, Loaded, ref } from '@mikro-orm/core';
import { CustomTool, CustomToolCreateError } from 'bee-agent-framework/tools/custom';
import dayjs from 'dayjs';
import mime from 'mime/lite';
import { groupBy } from 'remeda';
import { parse } from 'yaml';

import { Tool as ToolDto } from './dtos/tool.js';
import { AnyTool, Tool, ToolExecutor, ToolType } from './entities/tool/tool.entity.js';
import { ToolReadParams, ToolReadResponse } from './dtos/tool-read.js';
import { ToolsListQuery, ToolsListResponse } from './dtos/tools-list.js';
import { ToolCreateBody, ToolCreateResponse } from './dtos/tool-create.js';
import { ToolUpdateBody, ToolUpdateParams, ToolUpdateResponse } from './dtos/tool-update.js';
import { ToolDeleteParams, ToolDeleteResponse } from './dtos/tool-delete.js';
import { ToolCall } from './dtos/tool-call.js';
import { AnyToolCall } from './entities/tool-calls/tool-call.entity.js';
import { ToolCallDelta } from './dtos/tool-call-delta.js';
import { CodeInterpreterUsage } from './entities/tool-usages/code-interpreter-usage.entity.js';
import { FileSearchUsage } from './entities/tool-usages/file-search-usage.entity.js';
import { FunctionUsage } from './entities/tool-usages/function-usage.entity.js';
import { UserUsage } from './entities/tool-usages/user-usage.entity.js';
import { ToolUsage } from './dtos/tools-usage.js';
import { AnyToolUsage } from './entities/tool-usages/tool-usage.entity.js';
import { SystemUsage } from './entities/tool-usages/system-usage.entity.js';
import { AnyToolResource } from './entities/tool-resources/tool-resource.entity.js';
import { ToolResources } from './dtos/tool-resources.js';
import { CodeInterpreterResource } from './entities/tool-resources/code-interpreter-resource.entity.js';
import { SystemTools } from './entities/tool-calls/system-call.entity.js';
import { CodeInterpreterTool } from './entities/tool/code-interpreter-tool.entity.js';
import { ApiTool } from './entities/tool/api-tool.entity.js';
import { FunctionTool } from './entities/tool/function-tool.entity.js';
import { UserResource } from './entities/tool-resources/user-resource.entity.js';
import { SystemResource } from './entities/tool-resources/system-resource.entity.js';

import { ORM } from '@/database.js';
import { APIError, APIErrorCode } from '@/errors/error.entity.js';
import { BEE_CODE_INTERPRETER_URL } from '@/config.js';
import { createDeleteResponse } from '@/utils/delete.js';
import { File, FilePurpose } from '@/files/entities/file.entity.js';
import { FileContainer } from '@/files/entities/files-container.entity.js';
import { FileSearchResource } from '@/tools/entities/tool-resources/file-search-resources.entity.js';
import { VectorStore } from '@/vector-stores/entities/vector-store.entity.js';
import { VECTOR_STORE_DEFAULT_MAX_NUM_RESULTS } from '@/vector-stores/constants.js';
import { getUpdatedValue } from '@/utils/update.js';
import encrypt from '@/utils/crypto/encrypt.js';
import { createCodeInterpreterConnectionOptions } from '@/runs/execution/tools/helpers.js';
import { createPaginatedResponse, getListCursor } from '@/utils/pagination.js';

export function toToolCallDto(toolCall: Loaded<AnyToolCall, 'fileContainers.file'>): ToolCall {
  switch (toolCall.type) {
    case ToolType.CODE_INTERPRETER:
      return {
        id: toolCall.id,
        type: ToolType.CODE_INTERPRETER,
        [ToolType.CODE_INTERPRETER]: {
          input: toolCall.input,
          outputs: [
            ...(toolCall.logs?.map((log) => ({ type: 'logs', logs: log }) as const) ?? []),
            ...(toolCall.fileContainers
              ?.map((container) => container as Loaded<FileContainer, 'file'>)
              .map(({ file }) => {
                if (mime.getType(file.$.filename)?.startsWith('image')) {
                  return { type: 'image', image: { file_id: file.id } } as const;
                } else {
                  return { type: 'resource', resource: { file_id: file.id } } as const;
                }
              }) ?? [])
          ]
        }
      };
    case ToolType.FILE_SEARCH:
      return {
        id: toolCall.id,
        type: ToolType.FILE_SEARCH,
        [ToolType.FILE_SEARCH]: {
          input: toolCall.input,
          output: toolCall.results
        }
      };
    case ToolType.FUNCTION:
      return {
        id: toolCall.id,
        type: ToolType.FUNCTION,
        [ToolType.FUNCTION]: {
          name: toolCall.name,
          arguments: toolCall.arguments,
          output: toolCall.output ?? null
        }
      };
    case ToolType.USER:
      return {
        id: toolCall.id,
        type: ToolType.USER,
        [ToolType.USER]: {
          tool: {
            id: toolCall.tool.id
          },
          arguments: toolCall.arguments ?? null,
          output: toolCall.output ?? null
        }
      };
    case ToolType.SYSTEM:
      return {
        id: toolCall.id,
        type: ToolType.SYSTEM,
        [ToolType.SYSTEM]: {
          id: toolCall.toolId,
          input: toolCall.input,
          output: toolCall.output
        }
      };
  }
}

export function toToolCallDeltaDto(
  toolCall: Loaded<AnyToolCall, 'fileContainers.file'>,
  index: number
): ToolCallDelta {
  switch (toolCall.type) {
    case ToolType.CODE_INTERPRETER: {
      const logs =
        toolCall.logs?.map((log, index) => ({ index, type: 'logs', logs: log }) as const) ?? [];
      const outputs =
        toolCall.fileContainers
          ?.map((container) => container as Loaded<FileContainer, 'file'>)
          .map(({ file }, index) => {
            if (mime.getType(file.$.filename)?.startsWith('image')) {
              return {
                index: index + logs.length,
                type: 'image',
                image: { file_id: file.id }
              } as const;
            } else {
              return {
                index: index + logs.length,
                type: 'resource',
                resource: { file_id: file.id }
              } as const;
            }
          }) ?? [];
      return {
        index,
        id: toolCall.id,
        type: ToolType.CODE_INTERPRETER,
        [ToolType.CODE_INTERPRETER]: {
          input: toolCall.input,
          outputs: [...logs, ...outputs]
        }
      };
    }
    case ToolType.FILE_SEARCH:
      return { index, id: toolCall.id, type: ToolType.FILE_SEARCH };
    case ToolType.FUNCTION:
      return {
        index,
        id: toolCall.id,
        type: ToolType.FUNCTION,
        [ToolType.FUNCTION]: {
          name: toolCall.name,
          arguments: toolCall.arguments,
          output: toolCall.output ?? null
        }
      };
    case ToolType.SYSTEM:
      return {
        index,
        id: toolCall.id,
        type: ToolType.SYSTEM,
        [ToolType.SYSTEM]: {
          id: toolCall.toolId,
          input: toolCall.input,
          output: toolCall.output
        }
      };
    case ToolType.USER:
      return {
        index,
        id: toolCall.id,
        type: ToolType.USER,
        [ToolType.USER]: {
          tool: {
            id: toolCall.tool.id
          },
          arguments: toolCall.arguments ?? null,
          output: toolCall.output ?? null
        }
      };
  }
}

export function toDto(tool: AnyTool): ToolDto {
  return {
    id: tool.id,
    object: 'tool',
    type: tool.type,
    name: tool.name,
    is_external: !(tool.id === 'read_file' || tool.id === 'file_search'),
    created_at: dayjs(tool.createdAt).unix(),
    user_description: tool.userDescription ?? null,
    metadata: tool.metadata ?? {},
    source_code: tool.executor === ToolExecutor.CODE_INTERPRETER ? tool.sourceCode : null,
    json_schema:
      tool.executor === ToolExecutor.CODE_INTERPRETER
        ? JSON.stringify(tool.jsonSchema)
        : tool.executor === ToolExecutor.FUNCTION
          ? JSON.stringify(tool.parameters)
          : null,
    open_api_schema: tool.executor === ToolExecutor.API ? tool.openApiSchema : null,
    description: tool.description
  };
}

export function toToolUsageDto(toolUsage: AnyToolUsage): ToolUsage {
  switch (toolUsage.type) {
    case ToolType.CODE_INTERPRETER:
      return {
        type: ToolType.CODE_INTERPRETER
      };
    case ToolType.FILE_SEARCH:
      return {
        type: ToolType.FILE_SEARCH,
        file_search: { max_num_results: toolUsage.maxNumResults }
      };
    case ToolType.FUNCTION:
      return {
        type: ToolType.FUNCTION,
        function: {
          name: toolUsage.name,
          description: toolUsage.description,
          parameters: (toolUsage.parameters as any) ?? null
        }
      };
    case ToolType.SYSTEM:
      return {
        type: ToolType.SYSTEM,
        [ToolType.SYSTEM]: {
          id: toolUsage.toolId
        }
      };
    case ToolType.USER:
      return {
        type: ToolType.USER,
        [ToolType.USER]: {
          tool: {
            id: toolUsage.tool.id
          }
        }
      };
  }
}

export function createToolUsage(toolUsage: ToolUsage): AnyToolUsage {
  switch (toolUsage.type) {
    case ToolType.CODE_INTERPRETER:
      return new CodeInterpreterUsage();
    case ToolType.FILE_SEARCH:
      return new FileSearchUsage({
        maxNumResults:
          toolUsage.file_search?.max_num_results ?? VECTOR_STORE_DEFAULT_MAX_NUM_RESULTS
      });
    case ToolType.FUNCTION:
      return new FunctionUsage(toolUsage.function);
    case ToolType.SYSTEM:
      return new SystemUsage({
        toolId: toolUsage.system.id,
        config: toolUsage.system[toolUsage.system.id]
      });
    case ToolType.USER:
      return new UserUsage({
        tool: ORM.em
          .getRepository<FunctionTool | CodeInterpreterTool | ApiTool>(Tool)
          .getReference(toolUsage.user.tool.id, { wrapped: true })
      });
  }
}

export function toToolResourcesDto(toolResources?: AnyToolResource[]): ToolResources {
  if (!toolResources) return null;

  const resources: ToolResources = {};

  const codeInterpreterResources = toolResources.filter(
    (resource): resource is CodeInterpreterResource => resource.type === ToolType.CODE_INTERPRETER
  );
  if (codeInterpreterResources) {
    resources[ToolType.CODE_INTERPRETER] = {
      file_ids: codeInterpreterResources.flatMap((resource) =>
        resource.fileContainers.map((file) => file.file.id)
      )
    };
  }

  const userResources = toolResources.filter(
    (resource): resource is UserResource => resource.type === ToolType.USER
  );
  if (userResources) {
    Object.entries(groupBy(userResources, (r) => r.tool.id)).map(([toolId, toolResources]) => {
      resources[toolId] = {
        file_ids: toolResources.flatMap((resource) =>
          resource.fileContainers.map((file) => file.file.id)
        )
      };
    });
  }

  const systemResources = toolResources.filter(
    (resource): resource is SystemResource => resource.type === ToolType.SYSTEM
  );
  if (systemResources) {
    Object.entries(groupBy(systemResources, (r) => r.toolId)).map(([toolId, toolResources]) => {
      resources[toolId] = {
        file_ids: toolResources.flatMap((resource) =>
          resource.fileContainers.map((file) => file.file.id)
        )
      };
    });
  }

  const fileSearchResources = toolResources.filter(
    (resource): resource is FileSearchResource => resource.type === ToolType.FILE_SEARCH
  );
  if (fileSearchResources) {
    resources[ToolType.FILE_SEARCH] = {
      vector_store_ids: fileSearchResources.flatMap((resource) =>
        resource.vectorStoreContainers.map((container) => container.vectorStore.id)
      )
    };
  }

  return resources;
}

export async function createToolResources(
  toolResources: ToolResources | undefined
): Promise<AnyToolResource[] | undefined> {
  if (!toolResources) return;

  const resources: AnyToolResource[] = [];
  if (toolResources.code_interpreter) {
    const files = await ORM.em.getRepository(File).find({
      id: { $in: toolResources.code_interpreter.file_ids },
      purpose: { $in: [FilePurpose.ASSISTANTS, FilePurpose.ASSISTANTS_OUTPUT] }
    });
    if (files.length !== toolResources.code_interpreter.file_ids.length)
      throw new APIError({
        message: 'Not all files exist or have the right purpose',
        code: APIErrorCode.INVALID_INPUT
      });
    resources.push(new CodeInterpreterResource({ files }));
  }
  await Promise.all(
    Object.entries(toolResources)
      .filter(([resource]) => resource !== 'code_interpreter' && resource !== 'file_search')
      .map(async ([toolId, resource]) => {
        const fileIds: string[] = (resource as any).file_ids;
        const files = await ORM.em.getRepository(File).find({
          id: { $in: fileIds },
          purpose: { $in: [FilePurpose.ASSISTANTS, FilePurpose.ASSISTANTS_OUTPUT] }
        });
        if (files.length !== fileIds.length)
          throw new APIError({
            message: 'Not all files exist or have the right purpose',
            code: APIErrorCode.INVALID_INPUT
          });
        if (!Object.keys(SystemTools).includes(toolId.toUpperCase())) {
          const userTool = await ORM.em.getRepository(Tool).findOne({ id: toolId });
          if (!userTool) {
            throw new APIError({
              message: 'Tool not found',
              code: APIErrorCode.INVALID_INPUT
            });
          }
          resources.push(new UserResource({ tool: ref(userTool), files }));
        } else {
          resources.push(new SystemResource({ toolId, files }));
        }
      })
  );
  if (toolResources.file_search) {
    const vectorStores = await ORM.em.getRepository(VectorStore).find({
      id: { $in: toolResources.file_search.vector_store_ids }
    });
    if (vectorStores.length !== toolResources.file_search.vector_store_ids?.length)
      throw new APIError({
        message: 'Not all vector stores exist',
        code: APIErrorCode.INVALID_INPUT
      });
    if (vectorStores.some((vectorStore) => vectorStore.expired)) {
      throw new APIError({
        message: 'Some of the vector stores are expired',
        code: APIErrorCode.INVALID_INPUT
      });
    }
    resources.push(new FileSearchResource({ vectorStores }));
  }
  return resources;
}

export async function listTools({
  limit,
  after,
  before,
  order,
  order_by,
  type,
  search
}: ToolsListQuery): Promise<ToolsListResponse> {
  const where: FilterQuery<AnyTool> = {};
  if (type && type.length > 0) {
    where.type = { $in: type };
  }
  if (search) {
    const regexp = new RegExp(search, 'i');
    where.$or = [{ description: regexp }, { name: regexp }];
  }
  const repo = ORM.em.getRepository(Tool);
  const cursor = await getListCursor<AnyTool>(
    where,
    { limit, order, order_by, after, before },
    repo
  );
  return createPaginatedResponse(cursor, toDto);
}

async function createCodeInterpreterTool(
  body: Extract<ToolCreateBody, { source_code: string }>
): Promise<ToolCreateResponse> {
  if (!BEE_CODE_INTERPRETER_URL) {
    throw new APIError({
      message: `Code interpreter url is not defined`,
      code: APIErrorCode.SERVICE_UNAVAILABLE
    });
  }
  try {
    const customTool = await CustomTool.fromSourceCode(
      createCodeInterpreterConnectionOptions(),
      body.source_code
    );

    const tool = new CodeInterpreterTool({
      name: body.name || customTool.name,
      sourceCode: body.source_code,
      jsonSchema: customTool.inputSchema(),
      description: customTool.description,
      metadata: body.metadata,
      userDescription: body.user_description
    });

    await ORM.em.persistAndFlush(tool);

    return toDto(tool);
  } catch (err) {
    if (err instanceof CustomToolCreateError) {
      throw new APIError({
        message: err.message,
        code: APIErrorCode.INVALID_INPUT
      });
    }
    if (err.constructor.name === 'ConnectError') {
      throw new APIError({
        message: 'Service is unavailable',
        code: APIErrorCode.INTERNAL_SERVER_ERROR
      });
    }
    throw err;
  }
}

async function createOpenApiTool(
  body: Extract<ToolCreateBody, { open_api_schema: string }>
): Promise<ToolCreateResponse> {
  const schema = parse(body.open_api_schema);
  const tool = new ApiTool({
    openApiSchema: body.open_api_schema,
    name: schema.info.title,
    description: schema.info.description,
    apiKey: body.api_key ? encrypt(body.api_key) : undefined,
    metadata: body.metadata,
    userDescription: body.user_description
  });

  await ORM.em.persistAndFlush(tool);

  return toDto(tool);
}

async function createFunctionTool(
  body: Extract<ToolCreateBody, { parameters?: any }>
): Promise<ToolCreateResponse> {
  const tool = new FunctionTool({
    name: body.name,
    description: body.description ?? '',
    parameters: body.parameters,
    metadata: body.metadata,
    userDescription: body.user_description
  });

  await ORM.em.persistAndFlush(tool);

  return toDto(tool);
}

export async function createTool(body: ToolCreateBody): Promise<ToolCreateResponse> {
  if ('source_code' in body) {
    return createCodeInterpreterTool(body);
  } else if ('open_api_schema' in body) {
    return createOpenApiTool(body);
  } else if ('parameters' in body) {
    return createFunctionTool(body);
  }
  throw new APIError({
    message: `Unsupported tools`,
    code: APIErrorCode.INVALID_INPUT
  });
}

export async function updateTool({
  tool_id,
  ...body
}: ToolUpdateBody & ToolUpdateParams): Promise<ToolUpdateResponse> {
  const tool = await ORM.em.getRepository<AnyTool>(Tool).findOneOrFail({ id: tool_id });

  tool.name = getUpdatedValue(body.name, tool.name);
  tool.description = getUpdatedValue(body.description, tool.description);
  tool.metadata = getUpdatedValue(body.metadata, tool.metadata);
  tool.userDescription = getUpdatedValue(body.user_description, tool.userDescription);

  if ('source_code' in body) {
    if (!('sourceCode' in tool)) {
      throw new APIError({
        message: 'Can not change tool executor',
        code: APIErrorCode.INVALID_INPUT
      });
    }

    if (body.source_code) {
      try {
        if (!BEE_CODE_INTERPRETER_URL) {
          throw new APIError({
            message: `Code interpreter url is not defined`,
            code: APIErrorCode.SERVICE_UNAVAILABLE
          });
        }
        tool.sourceCode = body.source_code;
        const newCustomTool = await CustomTool.fromSourceCode(
          createCodeInterpreterConnectionOptions(),
          body.source_code
        );
        tool.jsonSchema = newCustomTool.inputSchema();
        tool.description = newCustomTool.description;
      } catch (err) {
        if (err instanceof CustomToolCreateError) {
          throw new APIError({
            message: err.message,
            code: APIErrorCode.INVALID_INPUT
          });
        }
        throw err;
      }
    }
  }

  if ('open_api_schema' in body) {
    if (!('openApiSchema' in tool)) {
      throw new APIError({
        message: 'Can not change tool executor',
        code: APIErrorCode.INVALID_INPUT
      });
    }
    tool.openApiSchema = getUpdatedValue(body.open_api_schema, tool.openApiSchema);
  }

  if ('parameters' in body) {
    if (!('parameters' in tool)) {
      throw new APIError({
        message: 'Can not change tool executor',
        code: APIErrorCode.INVALID_INPUT
      });
    }
    tool.parameters = getUpdatedValue(body.parameters, tool.parameters);
  }

  await ORM.em.flush();

  return toDto(tool);
}

export async function readTool({ tool_id }: ToolReadParams): Promise<ToolReadResponse> {
  const tool = await ORM.em.getRepository<AnyTool>(Tool).findOneOrFail({ id: tool_id });
  return toDto(tool);
}

export async function deleteTool({ tool_id }: ToolDeleteParams): Promise<ToolDeleteResponse> {
  const tool = await ORM.em.getRepository(Tool).findOneOrFail({ id: tool_id });

  tool.delete();
  await ORM.em.flush();

  return createDeleteResponse(tool_id, 'tool');
}
