export const origins = [
  "http://localhost:3000",
  "http://localhost:4000",
  ...(process.env.ALLOWED_ORIGINS?.split(",") || []),
]
