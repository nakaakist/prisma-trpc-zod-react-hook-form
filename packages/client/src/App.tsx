import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { Page } from "./Page";
import { trpc } from "./utils/trpc";

const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:3333",
    }),
  ],
});

export const App = () => (
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <Page />
    </QueryClientProvider>
  </trpc.Provider>
);
