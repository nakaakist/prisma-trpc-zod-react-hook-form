import { PostType } from "@prisma/client";
import { z } from "zod";
import { Topic } from "./topic";

const SHORT_POST_MAX_LENGTH = 20;
const LONG_POST_MAX_LENGTH = 100;

const refinePost = (p: { type: PostType; text: string }) => {
  if (p.type === PostType.SHORT) {
    return p.text.length <= SHORT_POST_MAX_LENGTH;
  } else {
    return p.text.length <= LONG_POST_MAX_LENGTH;
  }
};
const generateRefinePostParams = (p: { type: PostType; text: string }) => {
  if (p.type === PostType.SHORT && p.text.length > SHORT_POST_MAX_LENGTH) {
    return {
      message: `Text length cannot exceed ${SHORT_POST_MAX_LENGTH} for a short post`,
      path: ["text"],
    };
  } else if (p.text.length > LONG_POST_MAX_LENGTH) {
    return {
      message: `Text length cannot exceed ${LONG_POST_MAX_LENGTH} for a long post`,
      path: ["text"],
    };
  }
  return {};
};

export const Post = z.object({
  id: z.number(),
  type: z.nativeEnum(PostType),
  text: z.string().min(5),
  topics: z.array(Topic),
});
export type Post = z.infer<typeof Post>;

export const CreatePostRequest = Post.omit({
  id: true,
  topics: true,
})
  .extend({
    topics: z.array(z.string()),
  })
  .refine(refinePost, generateRefinePostParams);
export type CreatePostRequest = z.infer<typeof CreatePostRequest>;
