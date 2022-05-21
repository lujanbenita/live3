import React, { useState, useEffect } from "react";
import { ClickAwayListener } from "@material-ui/core";
import { top100Films } from "utils/mock";
import CompanyAvatar from "../../common/avatar/CompanyAvatar";

const InputSearch = () => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([...top100Films]);
  const [optionSelected, setOptionSelected] = useState(null);
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (query.length > 0) {
      setOpen(true);
      const filteredOptions = top100Films.filter((option) =>
        option.title.toLowerCase().trim().includes(query.toLowerCase().trim())
      );
      setOptions(filteredOptions);
    } else {
      setOptions(top100Films);
    }
  }, [query]);

  const handleDeleteKey = (e) => {
    if (e.key === "Backspace" && query.length === 0) {
      setOpen(false);
      if (optionSelected) {
        setOptionSelected(null);
        setQuery("");
      }
    }
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        setFocused(false);
        setOpen(false);
      }}
    >
      <div className={`c-focus-tag ${focused ? "c-focus-tag--focused" : ""}`}>
        <div
          className={`c-focus-tag__input-container ${
            open ? "c-focus-tag__input-container--open" : ""
          }`}
        >
          {optionSelected && (
            <CompanyAvatar
              alt={optionSelected.title}
              src="/img/icons/user.svg"
            />
          )}
          <input
            className="c-focus-tag__input"
            value={(optionSelected && optionSelected.title) || query}
            type="text"
            onKeyDown={(e) => handleDeleteKey(e)}
            onClick={() => {
              setFocused(true);
              setOpen(true);
            }}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            placeholder="Focus tag"
          />
        </div>

        {options.length > 0 && open ? (
          <div className="c-focus-tag__list-box">
            {options.map((option) => (
              <div
                aria-hidden="true"
                key={option.title}
                onClick={() => {
                  setOpen(false);
                  setOptionSelected(option);
                }}
                className={`c-focus-tag__option ${
                  optionSelected && optionSelected.title === option.title
                    ? "c-focus-tag--option-selected"
                    : ""
                }`}
              >
                <CompanyAvatar alt={option.title} src="/img/icons/user.svg" />
                <span className="c-focus-tag__option-label">
                  {option.title}
                </span>
                <span className="c-focus-tag__option-number">{54}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </ClickAwayListener>
  );
};

export default InputSearch;
