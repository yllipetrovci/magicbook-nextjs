import { nanoid } from "nanoid"
import { redis } from "@/lib/redis"
import type { Job } from "./types"

export async function createJob(config: unknown): Promise<Job> {
  const jobId = nanoid()
  const now = Date.now()

  const job: Job = {
    jobId,
    status: "queued",
    progress: 0,
    config,
    resultId: null,
    createdAt: now,
    updatedAt: now,
  }

  // Save job state
  await redis.set(`job:${jobId}`, job)

  // Push to queue
  await redis.lpush(
    "story:queue",
    JSON.stringify({
      jobId,
      config,
      createdAt: now,
    })
  )

  return job
}
