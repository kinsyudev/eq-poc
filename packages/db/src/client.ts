import { drizzle } from "drizzle-orm/postgres-js";
import postgres from 'postgres';

import * as schema from "./schema";
import assert from "assert";

// eslint-disable-next-line no-restricted-properties
const dbUrl = process.env.DB_URL;
assert(dbUrl, "DB_URL is required");




const queryClient = postgres(dbUrl)

export const db = drizzle(queryClient, { schema });
