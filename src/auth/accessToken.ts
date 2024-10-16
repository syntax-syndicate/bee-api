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

import { Issuer } from 'openid-client';
import { createRemoteJWKSet, jwtVerify, decodeJwt } from 'jose';
import { JOSEError } from 'jose/errors';
import { isArray } from 'remeda';

import '@/ui/auth-server.js';
import { AUTH_CLIENT_ID, AUTH_CLIENT_SECRET, AUTH_AUDIENCE, AUTH_WELL_KNOWN } from '@/config.js';
import { APIError, APIErrorCode } from '@/errors/error.entity.js';

const issuer = await Issuer.discover(AUTH_WELL_KNOWN);

const client = new issuer.Client({
  client_id: AUTH_CLIENT_ID,
  client_secret: AUTH_CLIENT_SECRET
});

const JWKS_URI = issuer.metadata.jwks_uri;
const JWKS = JWKS_URI && createRemoteJWKSet(new URL(JWKS_URI));

function isJwt(accessToken: string) {
  try {
    decodeJwt(accessToken);
    return true;
  } catch (err) {
    return false;
  }
}

function hasJwks() {
  return !!JWKS;
}

async function validateJwt(jwtToken: string) {
  if (!JWKS) throw new Error('JWKS is not supported by the issuer');
  try {
    const { payload } = await jwtVerify(jwtToken, JWKS);
    return payload;
  } catch (e) {
    if (e instanceof JOSEError) {
      throw new APIError({
        message: e.message,
        code: APIErrorCode.AUTH_ERROR
      });
    } else {
      throw new APIError({
        message: 'Invalid JWT token',
        code: APIErrorCode.AUTH_ERROR
      });
    }
  }
}

async function validateByIntrospection(accessToken: string) {
  const payload = await client.introspect(accessToken);
  if (!payload.active)
    throw new APIError({
      message: 'Invalid access token',
      code: APIErrorCode.AUTH_ERROR
    });
  return payload;
}

async function validatePayload({
  sub,
  iss,
  aud,
  email,
  preferred_username
}: {
  sub?: string;
  iss?: string;
  aud?: string | string[];
  email?: string;
  preferred_username?: string;
}) {
  if (!sub)
    throw new APIError({
      message: 'Missing sub claim',
      code: APIErrorCode.AUTH_ERROR
    });
  if (iss !== issuer.metadata.issuer)
    throw new APIError({
      message: 'Invalid issuer claim',
      code: APIErrorCode.AUTH_ERROR
    });
  if (isArray(aud) ? !aud.includes(AUTH_AUDIENCE) : aud !== AUTH_AUDIENCE)
    throw new APIError({
      message: 'Invalid audience claim',
      code: APIErrorCode.AUTH_ERROR
    });
  if (email && typeof email !== 'string')
    throw new APIError({
      message: 'Invalid email claim',
      code: APIErrorCode.AUTH_ERROR
    });
  if (preferred_username && typeof preferred_username !== 'string')
    throw new APIError({
      message: 'Invalid preferred_username claim',
      code: APIErrorCode.AUTH_ERROR
    });
  return { sub, iss, aud, email, preferred_username };
}

export async function validateAccessToken(accessToken: string) {
  const payload =
    hasJwks() && isJwt(accessToken)
      ? await validateJwt(accessToken)
      : await validateByIntrospection(accessToken);
  return validatePayload(payload);
}
