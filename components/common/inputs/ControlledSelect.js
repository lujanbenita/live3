import {
  InputLabel,
  Select,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import { useController } from "react-hook-form";

function ControlledSelect({
  children,
  control,
  defaultValue = "",
  label = "",
  name,
  rules,
  error = null,
  className = "",
  InputLabelProps,
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
    <FormControl className={className}>
      <InputLabel {...InputLabelProps}>{label}</InputLabel>
      <Select
        error={error && true}
        {...inputProps}
        {...props}
        label={label}
        inputRef={ref}
      >
        {children}
      </Select>
      {error && <FormHelperText error={error && true}>{error}</FormHelperText>}
    </FormControl>
  );
}
export default ControlledSelect;
