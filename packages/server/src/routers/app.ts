import { t } from "../utils/trpc";
import { postRouter } from "./post";
import { topicRouter } from "./topic";

export const appRouter = t.router({
  post: postRouter,
  topic: topicRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
