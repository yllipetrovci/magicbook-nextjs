import { nanoid } from "nanoid"
import { redis } from "@/lib/redis"
import type { CreateJobInput, Job } from "./types"

export async function createJob(input: CreateJobInput): Promise<Job> {
  const jobId = nanoid()
  const now = Date.now()

  const job: Job = {
    jobId,
    jobType: input.jobType,
    status: "queued",
    progress: 0,
    config: input.config,
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
      jobType: input.jobType,
      config: input.config,
      createdAt: now,
    })
  )

  return job
}
