/* eslint-disable no-unused-expressions */
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { LockIcon, UserIcon } from "../../../icons/IconsLibrary";

const InputComponent = ({
  name,
  label,
  register,
  password,
  user,
  error,
  isControlled,
  className = "",
  handleChange,
}) => (
  <TextField
    name={name}
    className={`c-input ${className}`}
    id={password ? "standard-password-input" : "standard-basic"}
    type={password ? "password" : "text"}
    label={label}
    inputRef={register}
    helperText={error}
    error={error}
    onChange={(e) => {
      isControlled ? handleChange(e.target.value) : null;
    }}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          {user && <UserIcon />}
          {password && <LockIcon />}
        </InputAdornment>
      ),
    }}
  />
);

export default InputComponent;
