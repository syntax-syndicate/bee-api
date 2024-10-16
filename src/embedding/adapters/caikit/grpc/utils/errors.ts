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

import { ServiceError } from '@grpc/grpc-js';

import { APIError, APIErrorCode } from '@/errors/error.entity';

export function isGrpcServiceError(err: unknown): err is ServiceError {
  return (
    err instanceof Error &&
    err.constructor.name === 'Error' &&
    'code' in err &&
    typeof err.code === 'number'
  );
}

export function convertGrpcError(err: ServiceError): APIError {
  // Error codes from https://grpc.github.io/grpc/core/md_doc_statuscodes.html
  switch (err.code) {
    case 3:
    case 11:
      return new APIError({
        message: `Invalid argument or out of range`,
        code: APIErrorCode.SERVICE_ERROR
      });
    case 5:
      return new APIError({
        message: `Unrecognized model`,
        code: APIErrorCode.SERVICE_UNAVAILABLE
      });
    case 8:
      return new APIError({
        message: `The model is currently overloaded.`,
        code: APIErrorCode.SERVICE_UNAVAILABLE
      });
    case 10:
      return new APIError({
        message: 'The operation was aborted.',
        code: APIErrorCode.SERVICE_UNAVAILABLE
      });
    case 4:
    case 14:
      return new APIError({
        message: 'The model is temporarily unavailable. This is most likely a temporary condition.',
        code: APIErrorCode.SERVICE_UNAVAILABLE
      });
    default:
      return new APIError({
        message: 'Unspecified service error',
        code: APIErrorCode.SERVICE_ERROR
      });
  }
}
