import { Queue, Worker, Job } from "bullmq";
import { buildRedisOptions } from "../config/redis.js";
import {
  processSubmissionJob,
  type SubmissionJobData,
  type SubmissionJobResult,
} from "./submission.processor.js";


const QUEUE_NAME = "submissions";


const connectionOpts = {
  ...buildRedisOptions(),
  lazyConnect: false,
};


export const submissionQueue = new Queue<SubmissionJobData, SubmissionJobResult>(
  QUEUE_NAME,
  {
    connection: connectionOpts,
    prefix: "codearena",
    defaultJobOptions: {
      attempts: 2,
      backoff: { type: "exponential", delay: 3000 },
      removeOnComplete: { age: 3600, count: 200 },
      removeOnFail: { age: 86400, count: 100 },
    },
  }
);

submissionQueue.on("error", (err) => {
  console.error("[BullMQ:Queue] Error:", err.message);
});


let workerInstance: Worker<SubmissionJobData, SubmissionJobResult> | null = null;


export function initSubmissionWorker(): Worker<SubmissionJobData, SubmissionJobResult> {
  if (workerInstance) {
    console.warn("[BullMQ:Worker] Worker already initialized, returning existing instance.");
    return workerInstance;
  }

  workerInstance = new Worker<SubmissionJobData, SubmissionJobResult>(
    QUEUE_NAME,
    async (job: Job<SubmissionJobData, SubmissionJobResult>) => {
      console.log(
        `[BullMQ:Worker] Processing job ${job.id} — Question: ${job.data.questionId}, User: ${job.data.userId}`
      );

      const result = await processSubmissionJob(job.data);

      console.log(
        `[BullMQ:Worker] Job ${job.id} completed — ${result.summary.passed}/${result.summary.total} passed`
      );

      return result;
    },
    {
      connection: connectionOpts,
      prefix: "codearena",
      concurrency: 2,
      limiter: {
        max: 4,
        duration: 10000,
      },
    }
  );

  workerInstance.on("completed", (job) => {
    console.log(`[BullMQ:Worker] Job ${job.id} finished successfully.`);
  });

  workerInstance.on("failed", (job, err) => {
    console.error(
      `[BullMQ:Worker] Job ${job?.id} failed:`,
      err.message
    );
  });

  workerInstance.on("error", (err) => {
    console.error("[BullMQ:Worker] Worker error:", err.message);
  });

  console.log("[BullMQ:Worker] Submission worker initialized (concurrency: 2).");
  return workerInstance;
}

/**
 * Gracefully closes the worker. Call during server shutdown.
 */
export async function closeSubmissionWorker(): Promise<void> {
  if (workerInstance) {
    await workerInstance.close();
    workerInstance = null;
    console.log("[BullMQ:Worker] Worker closed.");
  }
  await submissionQueue.close();
  console.log("[BullMQ:Queue] Queue closed.");
}
