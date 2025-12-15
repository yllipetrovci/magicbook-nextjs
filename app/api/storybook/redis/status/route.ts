import { redis } from "@/lib/redis"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const jobId = searchParams.get("jobId")

  if (!jobId) {
    return Response.json({ error: "Missing jobId" }, { status: 400 })
  }

  const job = await redis.get(`job:${jobId}`)

  if (!job) {
    return Response.json({ error: "Job not found" }, { status: 404 })
  }

  return Response.json(job)
}
