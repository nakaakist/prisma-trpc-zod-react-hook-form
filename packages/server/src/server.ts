import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";
import { appRouter } from "./routers/app";

createHTTPServer({
  middleware: cors({
    origin: process.env.CLIENT_ORIGIN,
  }),
  router: appRouter,
}).listen(parseInt(process.env.PORT ?? "3333"));
