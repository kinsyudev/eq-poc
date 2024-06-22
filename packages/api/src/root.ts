
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { postRouter } from "./router/post";
import { createTRPCRouter, createTRPCContext } from "./trpc";
import cors from 'cors';
import { z } from 'zod';

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