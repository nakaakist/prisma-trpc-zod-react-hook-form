import { schemas } from "server";
import { trpc } from "src/utils/trpc";

export const Post = (props: { post: schemas.Post }) => {
  const utils = trpc.useContext();
  const postDeleter = trpc.post.delete.useMutation();

  const onClickDelete = () => {
    postDeleter.mutate(
      { id: props.post.id },
      {
        onSuccess: () => {
          utils.post.all.invalidate();
        },
      }
    );
  };

  return (
    <div>
      <h4>{props.post.text}</h4>
      <p style={{ display: "flex", gap: "4px" }}>
        {props.post.topics.map((t) => (
          <span key={t.id}>{t.name}</span>
        ))}
      </p>
      <button onClick={onClickDelete}>Delete</button>
    </div>
  );
};
