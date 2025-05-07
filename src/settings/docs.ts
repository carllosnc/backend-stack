import { Hono } from "hono";
import { Bindings } from "@/bindings";
import { openAPISpecs } from "hono-openapi";
import { apiReference } from "@scalar/hono-api-reference";

const docs = new Hono<{ Bindings: Bindings }>()

docs.get(
  "/",
  apiReference({
    theme: "deepSpace",
    spec: {
      url: "/openapi",
    },
  })
);

docs.get(
  "/openapi",
  openAPISpecs(docs, {
    documentation: {
      info: {
        title: "Hono",
        version: "1.0.0",
        description: "Hone stack boylerplate",
      },
      servers: [
        {
          url: process.env.APP_URL as string,
          description: "Local server",
        },
      ],
    },
  })
);

export {
  docs
}
