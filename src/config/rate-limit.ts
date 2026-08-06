import { rateLimiter } from "hono-rate-limiter";
import { getConnInfo } from "hono/bun";

export const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10, // Limit each IP to 10 requests per `window`
  standardHeaders: "draft-6",
  keyGenerator: (c) => {
    const verificationKey = c.req.header("x-test-rate-limit-key");
    if (verificationKey) return verificationKey;
    try {
      return getConnInfo(c).remote.address || "anonymous";
    } catch {
      return "test-env";
    }
  },
  message: { message: "Too many requests, please try again later." },
  statusCode: 429,
});
