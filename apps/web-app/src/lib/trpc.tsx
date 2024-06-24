import type { inferReactQueryProcedureOptions } from "@trpc/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCQueryUtils, createTRPCReact } from "@trpc/react-query";
import SuperJSON from "superjson";

import type { AppRouter } from "@repo/api";

import { getQueryClient } from "./react-query";

const getBaseUrl = () => {
  if (typeof window !== "undefined") return window.location.origin;

  return `http://localhost:${2022}`;
};

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;

const api = createTRPCReact<AppRouter>();

export type tRPCAPI = typeof api;

const createTRPCClient = () =>
  api.createClient({
    links: [
      loggerLink({
        enabled: (op) =>
          process.env.NODE_ENV === "development" ||
          (op.direction === "down" && op.result instanceof Error),
      }),
      httpBatchLink({
        transformer: SuperJSON,
        url: getBaseUrl(),
        headers() {
          const headers = new Headers();
          headers.set("x-trpc-source", "react");
          return headers;
        },
      }),
    ],
  });

export type TRPCClient = ReturnType<typeof createTRPCClient>;

let clientQueryClientSingleton: TRPCClient | undefined = undefined;
export const getTRPCClient: () => TRPCClient = () => {
  // Browser: use singleton pattern to keep the same query client
  return (clientQueryClientSingleton ??= createTRPCClient());
};

export const clientUtils = createTRPCQueryUtils<AppRouter>({
  client: getTRPCClient(),
  queryClient: getQueryClient(),
});

export type tRPCQueryUtils = typeof clientUtils;

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={getTRPCClient()} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
}
