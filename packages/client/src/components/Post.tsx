import { schemas } from "server";

export const Post = (props: { post: schemas.Post }) => {
  return (
    <div>
      <h4>{props.post.text}</h4>
      <p style={{ display: "flex", gap: "4px" }}>
        {props.post.topics.map((t) => (
          <span key={t.id}>{t.name}</span>
        ))}
      </p>
    </div>
  );
};
