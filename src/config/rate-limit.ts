import { rateLimiter } from "hono-rate-limiter";
import { getConnInfo } from "hono/bun";

export const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window`
  standardHeaders: "draft-6",
  keyGenerator: (c) => {
    try {
      return getConnInfo(c).remote.address || "anonymous";
    } catch {
      return "test-env";
    }
  },
});
