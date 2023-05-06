import { CreatePostForm } from "./components/CreatePostForm";
import { trpc } from "./utils/trpc";

export const Page = () => {
  const userQuery = trpc.post.all.useQuery();

  return (
    <div>
      <p>{JSON.stringify(userQuery.data)}</p>
      <CreatePostForm />
    </div>
  );
};
