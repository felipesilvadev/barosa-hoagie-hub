import { z } from 'zod'

export const envSchema = z.object({
  MONGO_URI: z.string().url(),
  MONGO_AUTH_SOURCE: z.string(),
})

export type Env = z.infer<typeof envSchema>
