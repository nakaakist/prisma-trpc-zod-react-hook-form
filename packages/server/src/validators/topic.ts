import { z } from "zod";

export const Topic = z.object({
  id: z.number(),
  name: z.string(),
});

export const CreateTopicRequest = Topic.omit({
  id: true,
}).extend({
  topicIds: z.array(z.number()),
});
