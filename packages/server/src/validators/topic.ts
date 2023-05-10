import { z } from "zod";

export const Topic = z.object({
  id: z.number(),
  name: z.string(),
});
