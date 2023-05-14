import { useState } from "react";
import { schemas } from "server";
import { trpc } from "src/utils/trpc";
import { UpdatePostForm } from "./UpdatePostForm";

export const Post = (props: { post: schemas.Post }) => {
  const utils = trpc.useContext();
  const postDeleter = trpc.post.delete.useMutation();
  const [isEditing, setIsEditing] = useState(false);

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

  const onClickEdit = () => setIsEditing(true);
  const onCancelEdit = () => setIsEditing(false);
  const onSubmitEdit = () => setIsEditing(false);

  return (
    <div>
      {isEditing ? (
        <UpdatePostForm
          onCancel={onCancelEdit}
          onSubmit={onSubmitEdit}
          post={props.post}
        />
      ) : (
        <>
          <h4>{props.post.text}</h4>
          <p style={{ display: "flex", gap: "4px" }}>
            {props.post.topics.map((t) => (
              <span key={t.id}>{t.name}</span>
            ))}
          </p>
          <button onClick={onClickEdit}>Edit</button>
          <button onClick={onClickDelete}>Delete</button>
        </>
      )}
    </div>
  );
};
