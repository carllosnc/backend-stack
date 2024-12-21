import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

export const bodyValidator = zValidator(
  'json',
  z.object({
    title: z.string(),
  })
)

export const idValidator = zValidator('param', z.object({ id: z.number() }))
