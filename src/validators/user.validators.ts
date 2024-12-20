import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

export const userValidator = zValidator(
  'json',
  z.object({
    name: z.string(),
    age: z.number(),
    email: z.string(),
    address: z.string()
  })
)

export const userIdValidator = zValidator('param', z.object({ id: z.number() }))
