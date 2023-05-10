import { prisma } from "src/utils/prisma";
import { t } from "src/utils/trpc";
import { CreatePostRequest } from "../schemas";

export const postRouter = t.router({
  all: t.procedure.query(async () => {
    const result = await prisma.post.findMany({
      include: {
        topics: true,
      },
      orderBy: { id: "desc" },
    });
    return result;
  }),
  create: t.procedure.input(CreatePostRequest).mutation(async ({ input }) => {
    const result = await prisma.post.create({
      data: {
        text: input.text,
        type: input.type,
        topics: {
          connectOrCreate: input.topics.map((topic) => ({
            where: { name: topic },
            create: { name: topic },
          })),
        },
      },
    });
    return result;
  }),
});
