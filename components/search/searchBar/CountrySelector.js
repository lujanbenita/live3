import { useController } from "react-hook-form";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import Flag from "react-flagkit";

import { Popper } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputBase from "@material-ui/core/InputBase";

import Checkbox from "components/common/inputs/Checkbox";
import { GlobeIcon } from "icons/IconsLibrary";
import { sortCountries } from "../../../utils/languageIsoUtil";

function PopperComponent(props) {
  const { disablePortal, anchorEl, open, ...other } = props;
  return <div {...other} />;
}

const CountrySelector = ({ name, control }) => {
  const [defaultCountry] = useState([{ isoCode: "WW", country: "World Wide" }]);

  const {
    field: { ref, value = defaultCountry, onChange },
  } = useController({
    name,
    control,
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const countries = sortCountries(
    useSelector((state) => state.search.filterOptions.countries)
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    if (anchorEl) {
      anchorEl.focus();
    }
    setAnchorEl(null);
  };

  const handleSelect = (array) => {
    let valueSelected = array;

    if (array.length === 0) {
      valueSelected = [countries[0]];
    } else if (array[array.length - 1].isoCode === "WW") {
      valueSelected = [array[array.length - 1]];
    } else if (
      array[array.length - 1].isoCode !== "WW" &&
      array.find(({ isoCode }) => isoCode === "WW")
    ) {
      valueSelected = [...array.filter(({ isoCode }) => isoCode !== "WW")];
    }

    onChange(valueSelected);
  };

  useEffect(() => {
    if (countries && countries.length > 0) {
      onChange([countries[0]]);
    }
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? "github-label" : undefined;

  return (
    value && (
      <>
        <div
          className="c-country-selector__input"
          onClick={handleClick}
          aria-hidden="true"
        >
          <div className="c-country-selector__input-flag-wrapper" ref={ref}>
            {value.slice(0, 1).map((country) => (
              <span
                key={country.isoCode}
                className="c-country-selector__list-item-flag"
              >
                {country.isoCode === "WW" ? (
                  <div className="c-country-selector__worldwide">
                    <GlobeIcon width="24" height="24" />
                  </div>
                ) : (
                  country &&
                  country.isoCode && <Flag country={country.isoCode} />
                )}
              </span>
            ))}
            {value.length > 1 && (
              <span className="c-country-selector__more-counter">{`+${
                value.length - 1
              }`}</span>
            )}
          </div>
        </div>
        {open &&
          createPortal(
            <div className="c-country-selector__backdrop" />,
            document.body
          )}
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          placement="bottom-end"
          className="c-country-selector__popper"
        >
          <ClickAwayListener onClickAway={handleClose}>
            <div>
              <Autocomplete
                open
                multiple
                onClose={(event, reason) => {
                  if (reason === "escape") {
                    handleClose();
                  }
                }}
                classes={{
                  paper: "c-country-selector__paper",
                  listbox: "c-country-selector__list-box",
                  option: "c-country-selector__option",
                  popperDisablePortal:
                    "c-country-selector__popper-disable-portal",
                }}
                value={value}
                onChange={(event, newValue, reason) => {
                  if (
                    event.type === "keydown" &&
                    event.key === "Backspace" &&
                    reason === "remove-option"
                  ) {
                    return;
                  }

                  handleSelect(newValue, event);
                }}
                disableCloseOnSelect
                PopperComponent={PopperComponent}
                renderTags={() => null}
                noOptionsText="No countries available"
                renderOption={(option, { selected }) => (
                  <div className="c-country-selector__list-item">
                    <div className="c-country-selector__list-item-field">
                      <Checkbox isChecked={selected} />
                      <span
                        className={`c-country-selector__list-item-label ${
                          selected
                            ? "c-country-selector__list-item-label--checked"
                            : ""
                        }`}
                      >
                        {option.country}
                      </span>
                    </div>
                    {option.isoCode === "WW" ? (
                      <div className="c-country-selector__worldwide">
                        <GlobeIcon width="24" height="24" />
                      </div>
                    ) : (
                      <Flag country={option.isoCode} />
                    )}
                  </div>
                )}
                options={countries}
                getOptionSelected={(option, val) =>
                  option.isoCode === val.isoCode
                }
                getOptionLabel={({ country }) => country}
                renderInput={(params) => (
                  <InputBase
                    ref={params.InputProps.ref}
                    inputProps={params.inputProps}
                    placeholder="Search country"
                    autoFocus
                    className="c-country-selector__input-base"
                  />
                )}
              />
            </div>
          </ClickAwayListener>
        </Popper>
      </>
    )
  );
};

export default CountrySelector;
