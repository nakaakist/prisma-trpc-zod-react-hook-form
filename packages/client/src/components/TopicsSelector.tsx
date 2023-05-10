import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";
import { MultiValue } from "react-select";
import CreatableSelect from "react-select/creatable";
import { trpc } from "src/utils/trpc";

export const TopicsSelector = <T extends FieldValues>({
  name,
  control,
}: {
  name: FieldPath<T>;
  control: Control<T>;
}) => {
  const topicsQuery = trpc.topic.all.useQuery();
  const { field } = useController({
    name,
    control,
  });

  const topicOptions =
    topicsQuery.data?.map((t) => ({
      label: t.name,
      value: t.name,
    })) ?? [];

  const onChange = (value: MultiValue<{ label: string; value: string }>) => {
    field.onChange(value.map((v) => v.value));
  };

  return (
    <CreatableSelect
      isMulti
      options={topicOptions}
      onChange={onChange}
      value={field.value.map((v: string) => ({ label: v, value: v }))}
    />
  );
};
