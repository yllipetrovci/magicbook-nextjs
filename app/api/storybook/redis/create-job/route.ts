import { redis } from "@/lib/redis"
import { nanoid } from "nanoid"

export async function POST(req: Request) {
  const body = await req.json()

  const jobId = nanoid()

  // 1️⃣ Save initial job state
  await redis.set(`job:${jobId}`, {
    status: "queued",
    progress: 0
  })

  // 2️⃣ Push job to queue
  await redis.lpush(
    "story:queue",
    JSON.stringify({
      jobId,
      config: body,
      createdAt: Date.now(),
    })
  )

  return Response.json({ jobId })
}
