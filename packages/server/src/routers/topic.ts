import { prisma } from "src/utils/prisma";
import { t } from "src/utils/trpc";
import { CreateTopicRequest } from "src/validators";

export const topicRouter = t.router({
  all: t.procedure.query(async () => {
    const result = await prisma.topic.findMany();
    return result;
  }),
  create: t.procedure.input(CreateTopicRequest).mutation(async ({ input }) => {
    const result = await prisma.topic.create({
      data: {
        name: input.name,
      },
    });
    return result;
  }),
});
