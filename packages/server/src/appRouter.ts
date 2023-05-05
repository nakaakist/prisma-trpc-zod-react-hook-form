import { initTRPC } from "@trpc/server";
import { z } from "zod";

export const t = initTRPC.create();

export const appRouter = t.router({
  getPosts: t.procedure.input(z.string()).query((req) => {
    return [];
  }),
  createPost: t.procedure
    .input(z.object({ text: z.string().min(5) }))
    .mutation(async (req) => {
      // use your ORM of choice
      return null;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
