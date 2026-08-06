import { expect, test, describe } from "bun:test";
import app from "../index";
import { origins } from "../config/origins";

describe("Hono API", () => {
  test("GET / should return author information", async () => {
    const res = await app.request("/", {
      headers: { "x-test-rate-limit-key": "author-info" }
    });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({
      message: "Backend Stack",
      author: "Carlos Costa",
      version: "1.0.0",
    });
  });

  describe("CORS", () => {
    test.each(origins)("CORS headers should be present for %s", async (allowedOrigin) => {
      const res = await app.request("/api/test", {
        method: "OPTIONS",
        headers: {
          Origin: allowedOrigin,
          "Access-Control-Request-Method": "GET",
          "x-test-rate-limit-key": "cors-test"
        },
      });

      expect(res.headers.get("access-control-allow-origin")).toBe(allowedOrigin);
    });

    test("CORS headers should NOT be present for unauthorized origin", async () => {
      const res = await app.request("/api/test", {
        method: "OPTIONS",
        headers: {
          Origin: "http://unauthorized.com",
          "Access-Control-Request-Method": "GET",
          "x-test-rate-limit-key": "cors-test"
        },
      });

      expect(res.headers.get("access-control-allow-origin")).toBeNull();
    });
  });

  describe("Rate Limiting", () => {
    test("should include rate limit headers", async () => {
      const res = await app.request("/", {
        headers: { "x-test-rate-limit-key": "headers-check" }
      });
      expect(res.headers.get("ratelimit-limit")).toBe("10");
      expect(res.headers.get("ratelimit-remaining")).toBeDefined();
    });

    test("should return 429 and error message when limit exceeded", async () => {
      const headers = { "x-test-rate-limit-key": "test-rate-limit" };

      // Make 10 requests which should pass
      for (let i = 0; i < 10; i++) {
        const res = await app.request("/", { headers });
        expect(res.status).toBe(200);
      }

      // 11th request should fail
      const res = await app.request("/", { headers });
      expect(res.status).toBe(429);
      expect(await res.json()).toEqual({
        message: "Too many requests, please try again later."
      });
    });
  });
});
