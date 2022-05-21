/* eslint-disable no-nested-ternary */

import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";

const SingleSelector = ({
  options,
  label,
  getLabel,
  value,
  handleChange,
  className = "",
  error,
  placeholder,
  ...props
}) => {
  const id = Buffer.from(label).toString("base64");
  const singleSelectLabelId = `simple-select-${id}`;
  const singleSelectId = `simple-selector-${id}`;
  return (
    <FormControl className={`c-single-selector ${className}`} error>
      <InputLabel id={singleSelectLabelId} className="c-single-selector__label">
        {label}
      </InputLabel>
      <Select
        inputProps={{
          MenuProps: {
            className: "single-selector-menu",
            disableScrollLock: true,
          },
        }}
        {...props}
        value={value}
        label={label}
        placeholder={placeholder}
        onChange={(e) => handleChange(e.target.value)}
        labelId={singleSelectLabelId}
        id={singleSelectId}
        classes={{ root: "c-single-selector__root" }}
      >
        {options.map((option) => {
          const itemKey =
            option && option.value
              ? option.value
              : getLabel
              ? getLabel(option)
              : option;
          const itemLabel =
            option && option.label
              ? option.label
              : getLabel
              ? getLabel(option)
              : option;
          const itemValue = option && option.value ? option.value : option;
          const itemId = Buffer.from(`menu-item-${id}-${itemValue}`).toString(
            "base64"
          );
          return (
            <MenuItem id={itemId} key={itemKey} value={itemValue}>
              {itemLabel}
            </MenuItem>
          );
        })}
      </Select>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
};

export default SingleSelector;
