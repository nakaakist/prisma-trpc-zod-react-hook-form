import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { validators } from "server";
import { trpc } from "src/utils/trpc";
import { z } from "zod";
import { TopicsSelector } from "./TopicsSelector";

type FormParams = z.infer<typeof validators.CreatePostRequest>;

export const CreatePostForm = () => {
  const utils = trpc.useContext();
  const postCreator = trpc.post.create.useMutation();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm<FormParams>({
    resolver: zodResolver(validators.CreatePostRequest),
    defaultValues: {
      type: "SHORT",
      text: "",
      topics: [],
    },
  });

  const onSubmit = (data: FormParams) => {
    postCreator.mutate(data, {
      onSuccess: () => {
        reset();
        utils.post.all.invalidate();
        utils.topic.all.invalidate();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Create a post</legend>

        <div>
          <label htmlFor="postTypeChoiceShort">Short</label>
          <input
            {...register("type")}
            type="radio"
            id="postTypeChoiceShort"
            value="SHORT"
          />
          <label htmlFor="postTypeChoiceLong">Long</label>
          <input
            {...register("type")}
            type="radio"
            id="postTypeChoiceLong"
            value="LONG"
          />
        </div>
        {errors.type?.message && <p>{errors.type?.message}</p>}

        <div>
          {watch("type") === "SHORT" ? (
            <input type="text" placeholder="short text" {...register("text")} />
          ) : (
            <textarea placeholder="long text" {...register("text")} />
          )}
        </div>
        {errors.text?.message && <p>{errors.text?.message}</p>}

        <div>
          <TopicsSelector name="topics" control={control} />
        </div>
        {errors.topics?.message && <p>{errors.topics?.message}</p>}

        <div>
          <input type="submit" />
        </div>
      </fieldset>
    </form>
  );
};
