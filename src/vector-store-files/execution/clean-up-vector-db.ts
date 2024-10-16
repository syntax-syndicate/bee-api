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
  VectorStoreFile,
  VectorStoreFileStatus
} from '@/vector-store-files/entities/vector-store-file.entity.js';
import { ORM } from '@/database.js';
import { getLogger } from '@/logger.js';
import { getVectorStoreClient } from '@/vector-store-files/execution/client.js';
import { VectorStore } from '@/vector-stores/entities/vector-store.entity.js';

export async function cleanupExpiredVectorStores() {
  const expiredVectorStores = await ORM.em.find(VectorStore, { expiresAt: { $lt: new Date() } });
  const expiredFiles = await ORM.em.find(
    VectorStoreFile,
    {
      usageBytes: { $gt: 0 },
      vectorStore: { $in: expiredVectorStores }
    },
    { filters: { deleted: false } }
  );
  const expiredFileIds = expiredFiles.map((file) => file.id);
  if (expiredFiles.length > 0) {
    await getVectorStoreClient().dropVectorStoreFiles(expiredFileIds);
    for (const file of expiredFiles) {
      file.usageBytes = 0;
    }
    await ORM.em.flush();
    getLogger().info({ cleanedUpFiles: expiredFiles.length }, `Vector store files cleaned up.`);
  }
}

// This makes sure that there is no leaked collection storage in milvus in case vector store deletion fails
export async function cleanupDeletedVectorStores() {
  const unsuccessfulDeletions = await ORM.em.getRepository(VectorStoreFile).find(
    {
      usageBytes: { $gt: 0 },
      $or: [
        { deletedAt: { $ne: null } },
        {
          status: {
            $in: [
              VectorStoreFileStatus.FAILED,
              VectorStoreFileStatus.CANCELLED,
              VectorStoreFileStatus.CANCELLING
            ]
          }
        }
      ]
    },
    { filters: { deleted: false } }
  );
  if (unsuccessfulDeletions.length > 0) {
    const fileIds = unsuccessfulDeletions.map((f) => f.id);
    await getVectorStoreClient().dropVectorStoreFiles(fileIds);
    for (const file of unsuccessfulDeletions) {
      file.usageBytes = 0;
    }
    await ORM.em.flush();
    getLogger().warn(
      { cleanedUpFiles: unsuccessfulDeletions.length },
      `There were some unsuccessfully deleted files, this should almost never happen!`
    );
  }
}

export async function cleanupVectorStores() {
  await cleanupDeletedVectorStores();
  await cleanupExpiredVectorStores();
}
