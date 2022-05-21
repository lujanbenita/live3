import { TextField } from "@material-ui/core";

const InputComponent = ({
  value,
  setValue,
  className = "",
  label,
  password,
  color,
}) => (
  <TextField
    value={value}
    label={label}
    type={password ? "password" : ""}
    onChange={(e) => setValue(e.target.value)}
    className={`c-text-field ${className} c-text-field--${color}`}
  />
);

export default InputComponent;
