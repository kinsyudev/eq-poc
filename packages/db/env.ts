/* eslint-disable no-restricted-properties */
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
   DB_URL: z.string().min(1),
    NODE_ENV: z.enum(["development", "production"]).optional(),
  },
  client: {},
  runtimeEnv: {},
  clientPrefix: "PUBLIC_",
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === "lint",
});
