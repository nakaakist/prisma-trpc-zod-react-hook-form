import { initTRPC } from "@trpc/server";
import { prisma } from "./prisma";
import { CreatePostRequest } from "./validators";

export const t = initTRPC.create();

export const appRouter = t.router({
  getPosts: t.procedure.query(async () => {
    const result = await prisma.post.findMany({
      include: {
        topics: true,
      },
    });
    return result;
  }),
  createPost: t.procedure
    .input(CreatePostRequest)
    .mutation(async ({ input }) => {
      const result = await prisma.post.create({
        data: {
          text: input.text,
          type: input.type,
          topics: {
            connect: input.topicIds.map((id) => ({ id })),
          },
        },
      });
      return result;
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
