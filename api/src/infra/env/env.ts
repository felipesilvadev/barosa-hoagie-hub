import { z } from 'zod'

export const envSchema = z.object({
  MONGO_URI: z.string().url(),
  MONGO_AUTH_SOURCE: z.string(),
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
})

export type Env = z.infer<typeof envSchema>
