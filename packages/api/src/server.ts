import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";

import { postRouter } from "./router/post";
import { createTRPCContext, createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

// create server
createHTTPServer({
  middleware: cors(),
  router: appRouter,
  createContext: createTRPCContext,
}).listen(2022);

console.log("Listening on http://localhost:2022");
