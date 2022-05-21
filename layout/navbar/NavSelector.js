import React, { useState } from "react";
import { Autocomplete } from "@material-ui/lab";
import { FormControl, ClickAwayListener } from "@material-ui/core";
import { useRouter } from "next/router";

const NavSelector = ({ options }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(
    options.find((option) => {
      const paths = option.sectionPath.split("|");
      for (let i = 0; i < paths.length; i += 1) {
        if (router.pathname.includes(paths[i])) {
          return true;
        }
      }
    })
  );

  const handleSelect = (select) => {
    router.push(select.path);
    setPage(select);
  };

  const findExtraClass = (string) => {
    const selectedOption = options.find((option) => option.string === string);

    return selectedOption ? selectedOption.id : null;
  };

  return (
    <FormControl className="c-navbar-selector">
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <Autocomplete
          value={page}
          disableClearable
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          options={options}
          getOptionLabel={(option) => option.string}
          getOptionDisabled={(option) => option.disabled}
          onChange={(event, newValue) => {
            handleSelect(newValue);
          }}
          renderInput={(params) => (
            <div
              ref={params.InputProps.ref}
              className="c-navbar-selector__value-container"
            >
              <span
                {...params.inputProps}
                className={`c-navbar-selector__value c-navbar-selector--${findExtraClass(
                  params.inputProps.value
                )}`}
              >
                {params.inputProps.value}
              </span>
            </div>
          )}
          renderOption={(option, { selected }) => (
            <div
              className={`c-country-selector__list-item c-navbar-selector--${
                option.id
              }-blue ${selected ? "c-navbar-selector--selected" : ""}`}
            >
              {option.string}
            </div>
          )}
          classes={{
            root: "c-navbar-selector__autocomplete",
            focused: "c-navbar-selector__autocomplete--focused",
            input: "c-navbar-selector__input",
            inputFocused: "c-navbar-selector__input--focused",
            inputRoot: "c-navbar-selector__input-base",
            endAdornment: "c-navbar-selector__end-adornment",
            tag: "c-navbar-selector__more-tag",
            listbox: "c-navbar-selector__listbox",
            paper: "c-navbar-selector__paper",
          }}
        />
      </ClickAwayListener>
    </FormControl>
  );
};

export default NavSelector;
