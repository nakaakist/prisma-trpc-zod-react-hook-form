import { UseFormReturn, useFormState, useWatch } from "react-hook-form";
import { schemas } from "server";
import { TopicsSelector } from "./TopicsSelector";

type CreateOrUpdatePostFormParams = schemas.CreatePostRequest;

export const CreateOrUpdatePostFormInner = <
  T extends CreateOrUpdatePostFormParams
>(props: {
  form: UseFormReturn<T>;
}) => {
  const {
    register,
    control,
    // workaround to handle type error (due to react hook form's limitation on generics)
    // https://github.com/react-hook-form/react-hook-form/issues/6726
  } = props.form as UseFormReturn<CreateOrUpdatePostFormParams>;
  const type = useWatch({ control, name: "type" });
  const { errors } = useFormState({ control });

  return (
    <>
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
        {type === "SHORT" ? (
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
    </>
  );
};
