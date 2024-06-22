import type { inferReactQueryProcedureOptions } from "@trpc/react-query";
import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "@repo/api";

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;

const trpcReact = createTRPCReact<AppRouter>();

export default trpcReact;
