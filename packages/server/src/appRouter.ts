import { initTRPC } from "@trpc/server";
import { CreatePostRequest } from "./validators";

export const t = initTRPC.create();

export const appRouter = t.router({
  getPosts: t.procedure.query(() => {
    return [];
  }),
  createPost: t.procedure.input(CreatePostRequest).mutation(async (req) => {
    console.log(req);
    // use your ORM of choice
    return null;
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
