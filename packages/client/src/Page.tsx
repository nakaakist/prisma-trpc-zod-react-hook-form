import { CreatePostForm } from "./components/CreatePostForm";
import { trpc } from "./utils/trpc";

export const Page = () => {
  const userQuery = trpc.getPosts.useQuery();

  return (
    <div>
      <p>{userQuery.data}</p>
      <CreatePostForm />
    </div>
  );
};
