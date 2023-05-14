import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schemas } from "server";
import { trpc } from "src/utils/trpc";
import { CreateOrUpdatePostFormInner } from "./CreateOrUpdatePostFormInner";

export const UpdatePostForm = (props: {
  post: schemas.Post;
  onCancel: () => void;
  onSubmit: () => void;
}) => {
  const utils = trpc.useContext();
  const postUpdater = trpc.post.create.useMutation();
  const form = useForm<schemas.UpdatePostRequest>({
    resolver: zodResolver(schemas.UpdatePostRequest),
    defaultValues: {
      ...props.post,
      topics: props.post.topics.map((t) => t.name),
    },
  });

  const onSubmit = (data: schemas.UpdatePostRequest) => {
    postUpdater.mutate(data, {
      onSuccess: () => {
        form.reset();
        utils.post.all.invalidate();
        utils.topic.all.invalidate();
        props.onSubmit();
      },
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Update a post</legend>
        <button onClick={props.onCancel}>Cancel</button>

        <CreateOrUpdatePostFormInner form={form} />
      </fieldset>
    </form>
  );
};
