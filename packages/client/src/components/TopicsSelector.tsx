import { Control, FieldValues, Path, useController } from "react-hook-form";

export const TopicsSelector = <T extends FieldValues>({
  name,
  control,
}: {
  name: Path<T>;
  control: Control<T>;
}) => {
  const { field } = useController<T>({
    name,
    control,
  });

  return <div></div>;

  // implement multi-select
};
