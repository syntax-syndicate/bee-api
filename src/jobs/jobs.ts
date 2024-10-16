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

import { queue as cleanupVectorStoresQueue } from '@/vector-store-files/queues/cleanup-vector-store.queue.js';
import { queue as runsCleanupQueue } from '@/runs/jobs/runs-cleanup.queue.js';
import { queue as cleanupThreadsQueue } from '@/threads/jobs/cleanup.queue.js';
import { queue as filesCleanupQueue } from '@/files/jobs/cleanup.queue.js';
import { QueueName } from '@/jobs/constants.js';

export const createCronJobs = async () => {
  await runsCleanupQueue.add(QueueName.RUNS_CLEANUP, null, {
    repeat: {
      pattern: '0 */1 * * * *'
    },
    jobId: QueueName.RUNS_CLEANUP
  });

  await cleanupVectorStoresQueue.add(QueueName.VECTOR_STORES_CLEANUP, null, {
    repeat: {
      pattern: '0 */15 * * * *'
    },
    jobId: QueueName.VECTOR_STORES_CLEANUP
  });

  await cleanupThreadsQueue.add(QueueName.THREADS_CLEANUP, null, {
    repeat: {
      pattern: '0 0 */1 * * *'
    },
    jobId: QueueName.THREADS_CLEANUP
  });

  await filesCleanupQueue.add(QueueName.FILES_CLEANUP, null, {
    repeat: {
      pattern: '0 0 */1 * * *'
    },
    jobId: QueueName.FILES_CLEANUP
  });
};
