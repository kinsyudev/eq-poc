import type { inferReactQueryProcedureOptions } from "@trpc/react-query";
import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import SuperJSON from "superjson";

import type { AppRouter } from "@repo/api";

import { getQueryClient } from "./react-query";

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;

export const api: ReturnType<typeof createTRPCReact<AppRouter>> =
  createTRPCReact<AppRouter>();

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  const [trpcClient] = useState(() =>
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
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
}

const getBaseUrl = () => {
  if (typeof window !== "undefined") return window.location.origin;

  return `http://localhost:${2022}`;
};
