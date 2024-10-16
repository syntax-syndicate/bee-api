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

import { FastifyError, FastifyPluginAsync, errorCodes } from 'fastify';
import fp from 'fastify-plugin';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError, UniqueConstraintViolationException } from '@mikro-orm/core';

import { Error as ErrorDto } from './dtos/error.js';
import { ErrorResponse } from './dtos/error-response.js';
import { APIError, APIErrorCode } from './error.entity.js';

export function toErrorDto(error: APIError): ErrorDto {
  return {
    code: error.code,
    message: error.message
  };
}

export function toErrorResponseDto(error: APIError): ErrorResponse {
  return {
    error: toErrorDto(error)
  };
}

function getStatusCode(error: APIError): StatusCodes {
  switch (error.code) {
    case APIErrorCode.AUTH_ERROR:
      return StatusCodes.UNAUTHORIZED;
    case APIErrorCode.INVALID_INPUT:
      return StatusCodes.BAD_REQUEST;
    case APIErrorCode.NOT_FOUND:
      return StatusCodes.NOT_FOUND;
    case APIErrorCode.TOO_MANY_REQUESTS:
      return StatusCodes.TOO_MANY_REQUESTS;
    case APIErrorCode.SERVICE_UNAVAILABLE:
      return StatusCodes.SERVICE_UNAVAILABLE;
    case APIErrorCode.FORBIDDEN:
      return StatusCodes.FORBIDDEN;
    default:
      return StatusCodes.INTERNAL_SERVER_ERROR;
  }
}

function convertToAPIError(error: FastifyError): APIError {
  if (error instanceof APIError) {
    return error;
  } else if (error instanceof NotFoundError || error instanceof errorCodes.FST_ERR_NOT_FOUND) {
    return new APIError({
      message: error.message,
      code: APIErrorCode.NOT_FOUND
    });
  } else if (error instanceof UniqueConstraintViolationException) {
    return new APIError({
      message: 'Submitted data violates the uniqueness constraint',
      code: APIErrorCode.INVALID_INPUT
    });
  } else if (
    error instanceof SyntaxError ||
    error.code === 'FST_ERR_VALIDATION' || // instanceof check doesn't work for this code
    error instanceof errorCodes.FST_ERR_CTP_EMPTY_JSON_BODY
  ) {
    return new APIError({
      message: error.message,
      code: APIErrorCode.INVALID_INPUT
    });
  } else {
    return new APIError({
      message: error.message,
      code: APIErrorCode.INTERNAL_SERVER_ERROR
    });
  }
}

export const errorPlugin: FastifyPluginAsync = fp.default(async (app) => {
  app.setNotFoundHandler((request, reply) => {
    const apiError = new APIError({
      message: 'Route does not exist',
      code: APIErrorCode.NOT_FOUND
    });
    reply.status(getStatusCode(apiError)).send(toErrorResponseDto(apiError));
  });

  app.setErrorHandler(function (error, request, reply) {
    const apiError = convertToAPIError(error);
    if (apiError.code === APIErrorCode.INTERNAL_SERVER_ERROR) {
      this.log.error(error);
    }
    reply.status(getStatusCode(apiError)).send(toErrorResponseDto(apiError));
  });
});
