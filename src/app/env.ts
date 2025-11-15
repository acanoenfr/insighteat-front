import { z } from 'zod'

const EnvSchema = z.object({
    VITE_API_URL: z.string()
})

export const env = EnvSchema.parse(import.meta.env)
