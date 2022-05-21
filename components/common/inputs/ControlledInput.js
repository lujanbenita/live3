import { TextField } from "@material-ui/core";
import { useController } from "react-hook-form";

function ControlledInput({
  control,
  name,
  rules,
  error = false,
  defaultValue,
  ...props
}) {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  return (
    <TextField
      {...inputProps}
      {...props}
      error={error ? true : false}
      helperText={error ? error.message : ""}
      inputRef={ref}
    />
  );
}
export default ControlledInput;
