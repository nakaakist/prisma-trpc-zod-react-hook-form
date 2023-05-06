import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";
import { appRouter } from "./routers/app";

createHTTPServer({
  middleware: cors(),
  router: appRouter,
}).listen(3333);
