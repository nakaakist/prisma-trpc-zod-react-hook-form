import { prisma } from "../prisma";
import { t } from "../utils/trpc";
import { CreateTopicRequest } from "../validators";

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
