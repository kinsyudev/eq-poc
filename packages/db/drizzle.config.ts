import { defineConfig, type Config } from "drizzle-kit";
import { env } from "./env";

export default defineConfig({
  schema: "./src/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DB_URL,
  },
  verbose: true,
  strict: true,
});
