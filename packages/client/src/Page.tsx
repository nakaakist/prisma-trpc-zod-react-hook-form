import { trpc } from "./utils/trpc";

export const Page = () => {
  const userQuery = trpc.getPosts.useQuery("hoge");
  const userCreator = trpc.createPost.useMutation();

  return (
    <div>
      <p>{userQuery.data}</p>

      <button onClick={() => userCreator.mutate({ text: "Frodo" })}>
        Create Frodo
      </button>
    </div>
  );
};
