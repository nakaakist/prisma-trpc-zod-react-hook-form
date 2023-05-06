import { prisma } from "src/utils/prisma";
import { t } from "src/utils/trpc";
import { CreatePostRequest } from "src/validators";

export const postRouter = t.router({
  all: t.procedure.query(async () => {
    const result = await prisma.post.findMany({
      include: {
        topics: true,
      },
    });
    return result;
  }),
  create: t.procedure.input(CreatePostRequest).mutation(async ({ input }) => {
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
