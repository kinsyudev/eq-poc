import baseConfig, { restrictEnvAccess } from "@repo/eslint-config/base";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: ["dist/**"],
    files: ["env.ts", "drizzle.config.ts"]
  },
  ...baseConfig,
  ...restrictEnvAccess,
];
