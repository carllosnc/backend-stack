import { z } from 'zod'
import { validator } from 'hono-openapi/zod'

export const bodyValidator = validator(
  'json',
  z.object({
    title: z.string(),
  })
)

export const idValidator = validator(
  'param',
  z.object({
    id: z.number()
  })
)
