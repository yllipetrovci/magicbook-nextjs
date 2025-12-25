export type JobStatus = "queued" | "processing" | "completed" | "failed"

export type JobType = "story" | "video" | "coloring"

export type CreateJobInput = {
  config: unknown
  type: JobType
}

export type Job = {
  jobId: string
  type: JobType
  status: JobStatus
  progress: number
  resultId: string | null
  createdAt: number
  updatedAt: number
  config: any
}



export interface GeneratedPage {
  text: string;
  imageAltText: string;
  img: string;
  mainCharacterIncluded: boolean;
}


export enum VoiceStyle {
  NARRATOR = 'narrator',
  GRANDMA = 'grandma',
  WIZARD = 'wizard',
  PIXIE = 'pixie'
}

export enum ReadingStyle {
  MODERN = 'modern',     // Image Top, Text Bottom
  CINEMATIC = 'cinematic', // Full image, Text Overlay (Glass Card)
  SPLIT = 'split',        // Image Left, Text Right (Desktop)
  MINIMAL = 'minimal',    // Clean Canvas (Image Top, Text floats on page)
  OVERLAY = 'overlay'     // Immersive Overlay (Text floats on bottom of full-page image)
}

export interface GeneratedStory {
  title: string;
  author: string;
  coverImg: string;
  coverImageAlt: string;
  pages: GeneratedPage[];
  date?: string;
  heroName?: string;
  dedication?: string;
  status?: 'pending' | 'processing' | 'completed' | 'failed';
}
