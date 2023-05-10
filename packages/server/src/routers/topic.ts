import { prisma } from "src/utils/prisma";
import { t } from "src/utils/trpc";

export const topicRouter = t.router({
  all: t.procedure.query(async () => {
    const result = await prisma.topic.findMany();
    return result;
  }),
});
