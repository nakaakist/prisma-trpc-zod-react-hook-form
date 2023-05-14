import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schemas } from "server";
import { trpc } from "src/utils/trpc";
import { CreateOrUpdatePostFormInner } from "./CreateOrUpdatePostFormInner";

export const CreatePostForm = () => {
  const utils = trpc.useContext();
  const postCreator = trpc.post.create.useMutation();
  const form = useForm<schemas.CreatePostRequest>({
    resolver: zodResolver(schemas.CreatePostRequest),
    defaultValues: {
      type: "SHORT",
      text: "",
      topics: [],
    },
  });

  const onSubmit = (data: schemas.CreatePostRequest) => {
    postCreator.mutate(data, {
      onSuccess: () => {
        form.reset();
        utils.post.all.invalidate();
        utils.topic.all.invalidate();
      },
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Create a post</legend>
        <CreateOrUpdatePostFormInner form={form} />
        <div>
          <input type="submit" />
        </div>
      </fieldset>
    </form>
  );
};
