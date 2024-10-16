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

import * as path from 'node:path';
import * as fs from 'node:fs/promises';
import os from 'os';

import {
  ClientConfig,
  CreateIndexSimpleReq,
  DataType,
  ErrorCode,
  FieldType,
  IndexType,
  MetricType,
  MilvusClient,
  ResStatus
} from '@zilliz/milvus2-sdk-node';
import { z } from 'zod';
import { sum } from 'remeda';

import { DocumentStats, VectorDbDocument } from '../types.js';

import { VectorStoreClient } from './interface.js';

import {
  MILVUS_CA_CERT,
  MILVUS_CERT,
  MILVUS_DATABASE_NAME,
  MILVUS_HOST,
  MILVUS_KEY,
  MILVUS_PASSWORD,
  MILVUS_PORT,
  MILVUS_USE_TLS,
  MILVUS_USERNAME
} from '@/config.js';

export function modelNameToCollectionName(modelName: string): string {
  return modelName
    .replace(/[^a-zA-Z0-9_]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .toLowerCase();
}

interface MilvusOptions<SchemaType extends z.ZodType<VectorDbDocument>> {
  modelName: string;
  documentSchema: SchemaType;
  textFieldMaxLength?: number;
}

const DEFAULT_TEXT_FIELD_MAX_LENGTH = 10000;
const VECTOR_STORE_PARTITION_NAME_MAX_LENGTH = 512;
const MILVUS_TIMEOUT_MS = 60_000; // Creating new collection in the hosted Milvus is UNBELIEVABLY SLOW

const VECTOR_FIELD_NAME: keyof Pick<VectorDbDocument, 'vector'> = 'vector';

export async function clientErrorWrapper<T extends ResStatus | { status: ResStatus }>(
  request: Promise<T>
): Promise<T> {
  let response: T;
  try {
    response = await request;
  } catch (err: any) {
    throw new Error(`Error occurred when calling external vector database.`, { cause: err });
  }

  const status: ResStatus = 'status' in response ? response.status : response;
  if (status.error_code !== ErrorCode.SUCCESS) {
    throw new Error(`Error occurred when calling external vector database.`, { cause: status });
  }
  return response;
}

export async function createMilvusClient() {
  try {
    let tls: ClientConfig['tls'] = undefined;
    let ssl = false;
    if (MILVUS_USE_TLS) {
      const rootCertPath = path.join(os.tmpdir(), `milvus-ca.pem`);
      const certChainPath = path.join(os.tmpdir(), `milvus-server.pem`);
      const privateKeyPath = path.join(os.tmpdir(), `milvus-server.key`);
      await Promise.all([
        fs.writeFile(rootCertPath, MILVUS_CA_CERT, 'utf-8'),
        fs.writeFile(certChainPath, MILVUS_CERT, 'utf-8'),
        fs.writeFile(privateKeyPath, MILVUS_KEY, 'utf-8')
      ]);
      tls = { serverName: 'localhost', rootCertPath, certChainPath, privateKeyPath };
      ssl = true;
    }
    const client = new MilvusClient({
      address: `${MILVUS_HOST}:${MILVUS_PORT}`,
      username: MILVUS_USERNAME,
      password: MILVUS_PASSWORD,
      database: MILVUS_DATABASE_NAME,
      ssl,
      tls,
      timeout: MILVUS_TIMEOUT_MS
    });
    await client.connectPromise;
    return client;
  } catch (err: any) {
    throw new Error('Error occurred when calling external vector database.', { cause: err });
  }
}

export class MilvusVectorStore<SchemaType extends z.ZodType<VectorDbDocument>>
  implements VectorStoreClient<SchemaType>
{
  private indexSearchParams = { ef: 64 };
  private milvusCollectionSelector: { collection_name: string };

  constructor(
    private options: MilvusOptions<SchemaType>,
    private _client?: MilvusClient
  ) {
    this.milvusCollectionSelector = {
      collection_name: modelNameToCollectionName(this.options.modelName)
    };
  }

  private get indexCreateParams(): CreateIndexSimpleReq {
    return {
      ...this.milvusCollectionSelector,
      index_type: IndexType.HNSW,
      params: { M: 8, efConstruction: 64 },
      metric_type: MetricType.COSINE,
      field_name: VECTOR_FIELD_NAME
    };
  }

  private async getClient() {
    this._client = this._client ?? (await createMilvusClient());
    return this._client;
  }

  private getCollectionFields(vectorDimension: number): (FieldType & {
    name: keyof VectorDbDocument | 'id';
    usageBytes: (document: VectorDbDocument) => number;
  })[] {
    const textFieldLength = this.options.textFieldMaxLength ?? DEFAULT_TEXT_FIELD_MAX_LENGTH;
    // See https://milvus.io/docs/schema.md for byte approximates
    return [
      {
        name: 'id',
        description: 'Primary key',
        data_type: DataType.Int64,
        is_primary_key: true,
        autoID: true,
        usageBytes: () => 8
      },
      {
        name: 'vectorStoreFileId',
        data_type: DataType.VarChar,
        max_length: VECTOR_STORE_PARTITION_NAME_MAX_LENGTH,
        is_partition_key: false,
        usageBytes: (document: VectorDbDocument) => document.vectorStoreFileId.length * 2
      },
      {
        name: 'text',
        description: 'Text field',
        data_type: DataType.VarChar,
        max_length: textFieldLength.toString(),
        usageBytes: (document: VectorDbDocument) => document.text.length * 2
      },
      {
        name: 'vector',
        description: 'Vector field',
        data_type: DataType.FloatVector,
        dim: vectorDimension,
        element_type: DataType.None,
        usageBytes: () => 4 * vectorDimension
      }
    ];
  }

  public getApproximateDocumentByteUsage(document: z.infer<SchemaType>) {
    return sum(this.getCollectionFields(document.vector.length).map((f) => f.usageBytes(document)));
  }

  private async ensureMilvusCollection(vectorDimension: number) {
    const client = await this.getClient();
    const hasCollection = await clientErrorWrapper(
      client.hasCollection(this.milvusCollectionSelector)
    );
    if (hasCollection.value === true) return;
    try {
      await clientErrorWrapper(
        client.createCollection({
          ...this.milvusCollectionSelector,
          fields: this.getCollectionFields(vectorDimension),
          enable_dynamic_field: true
        })
      );
      await clientErrorWrapper(client.createIndex(this.indexCreateParams));
    } catch (error) {
      await clientErrorWrapper(client.dropCollection(this.milvusCollectionSelector));
      throw error;
    }
  }

  private getVectorStoreFileFilter(vectorStoreFileIds: string[]) {
    return `vectorStoreFileId in [${vectorStoreFileIds.map((c) => `"${c}"`).join(', ')}]`;
  }

  async addDocuments(documents: z.infer<SchemaType>[]): Promise<DocumentStats> {
    if (documents.length === 0) return { byteUsage: 0, totalCreated: 0 };
    const documentDimension = documents[0].vector.length;
    const client = await this.getClient();
    await this.ensureMilvusCollection(documentDimension);
    await clientErrorWrapper(client.insert({ ...this.milvusCollectionSelector, data: documents }));

    return {
      byteUsage: this.getApproximateDocumentByteUsage(documents[0]) * documents.length,
      totalCreated: documents.length
    };
  }

  public async similaritySearchVectorWithScore(
    query: number[],
    k: number,
    vectorStoreFileIds: string[]
  ): Promise<{ score: number; document: z.infer<SchemaType> }[]> {
    if (vectorStoreFileIds.length === 0) return [];

    const client = await this.getClient();

    await clientErrorWrapper(client.loadCollectionSync(this.milvusCollectionSelector));

    const outputFields: string[] = this.getCollectionFields(query.length).map(
      (field) => field.name
    );
    outputFields.push('$meta');

    const response = await clientErrorWrapper(
      client.search({
        ...this.milvusCollectionSelector,
        params: this.indexSearchParams,
        limit: k,
        metric_type: this.indexCreateParams.metric_type,
        vector_type: DataType.FloatVector,
        vector: query,
        output_fields: outputFields,
        filter: this.getVectorStoreFileFilter(vectorStoreFileIds)
      })
    );

    return response.results.map(({ score, $meta, ...documentUnverified }) => {
      const document = this.options.documentSchema.parse({ ...documentUnverified, ...$meta });
      return { document, score };
    });
  }

  public async drop(filter: string) {
    const client = await this.getClient();
    await clientErrorWrapper(client.loadCollectionSync(this.milvusCollectionSelector));
    await clientErrorWrapper(client.deleteEntities({ ...this.milvusCollectionSelector, filter }));
  }

  public async dropVectorStoreFiles(vectorStoreFileIds: string[]) {
    return this.drop(this.getVectorStoreFileFilter(vectorStoreFileIds));
  }
}
