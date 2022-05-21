import Autocomplete from "@material-ui/lab/Autocomplete";
import { FormControl, TextField } from "@material-ui/core";
import { useController } from "react-hook-form";

import Checkbox from "./Checkbox";

const Selector = ({
  control,
  placeholder,
  label,
  name,
  className,
  ...props
}) => {
  const {
    field: { ref, value = [], onChange },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl className={`c-multiple-select ${className}`}>
      <Autocomplete
        {...props}
        multiple
        value={value}
        disableClearable
        // getOptionLabel={(option) => option}
        disableCloseOnSelect
        onChange={(event, newValue) => {
          if (newValue.length > 1) {
            newValue.shift();
          }
          onChange(newValue);
        }}
        ref={ref}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label={label}
            multiline={false}
            placeholder={value && value.length ? "" : placeholder}
          />
        )}
        renderTags={(values) =>
          values
            .filter((option, index) => index === 0)
            .map((option) => (
              <span className="c-multiple-select__tag" key={option}>
                {option}
                {values.length > 1 && ` ...(+${values.length - 1})`}
              </span>
            ))
        }
        renderOption={(option, { selected }) => (
          <div className="c-multiple-select__list-item">
            <div className="c-multiple-select__list-item-field">
              <Checkbox isChecked={selected} />
              <span
                className={`c-multiple-select__list-item-label ${
                  selected ? "c-multiple-select__list-item-label--checked" : ""
                }`}
              >
                {option}
              </span>
            </div>
          </div>
        )}
        classes={{
          root: "c-multiple-select__autocomplete",
          focused: "c-multiple-select__autocomplete--focused",
          input: "c-multiple-select__input",
          inputFocused: "c-multiple-select__input--focused",
          inputRoot: "c-multiple-select__input-base",
          endAdornment: "c-multiple-select__end-adornment",
          tag: "c-multiple-select__more-tag",
          listbox: "c-multiple-select__list-box",
          ...props.classes,
        }}
      />
    </FormControl>
  );
};

export default Selector;
