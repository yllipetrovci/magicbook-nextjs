export type JobStatus = "queued" | "processing" | "completed" | "failed"

export type CreateJobInput = {
  config: unknown
}

export type Job = {
  jobId: string
  status: JobStatus
  progress: number
  resultId: string | null
  createdAt: number
  updatedAt: number
  config: any
}
