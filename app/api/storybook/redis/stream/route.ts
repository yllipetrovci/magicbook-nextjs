// app/api/story/stream/route.ts
import { redis } from "@/lib/redis"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET() {
  const encoder = new TextEncoder()

  let unsubscribe: (() => Promise<void>) | null = null

  const stream = new ReadableStream({
    async start(controller) {
      const sub = await redis.subscribe("job-events") as unknown as AsyncIterable<string> & { unsubscribe: () => Promise<void> }

      // forward messages from the async iterator to the stream controller
      void (async () => {
        try {
          for await (const message of sub) {
            controller.enqueue(
              encoder.encode(`data: ${message}\n\n`)
            )
          }
        } catch (err) {
          // ignore iterator errors (can happen during unsubscribe)
        }
      })()

      unsubscribe = () => sub.unsubscribe()
    },

    async cancel() {
      if (unsubscribe) {
        await unsubscribe()
        unsubscribe = null
      }
    },
  })

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  })
}
