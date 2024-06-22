import { defineConfig, type Config } from "drizzle-kit";
import assert from "assert";


assert(process.env.DB_URL, "POSTGRES_URL must be set")




export default defineConfig({
  schema: "./src/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_URL,
  },
  verbose: true,
  strict: true,
});
