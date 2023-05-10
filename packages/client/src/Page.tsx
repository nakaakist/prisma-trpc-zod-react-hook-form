import { CreatePostForm } from "./components/CreatePostForm";
import { Post } from "./components/Post";
import { trpc } from "./utils/trpc";

export const Page = () => {
  const postsQuery = trpc.post.all.useQuery();

  return (
    <div>
      <CreatePostForm />
      {postsQuery.data?.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};
