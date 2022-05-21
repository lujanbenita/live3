import { useState } from "react";
import { ClickAwayListener } from "@material-ui/core";

import Tag from "./Tag";
import CustomSelectOption from "./CustomSelectOption";

const CustomMultipleTagsInput = ({
  submitCTA,
  submitIcon = "",
  submitAction,
  getLabel,
  getType,
  value,
  setValue,
  options,
  handleSearch,
  placeholder,
  noResults,
}) => {
  const [typedOption, setTypedOption] = useState("");
  const [hoveredOption, setHoveredOption] = useState(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && typedOption && typedOption.length > 0) {
      if (!value.find((el) => el === typedOption)) {
        setTypedOption("");
        setValue([...value, hoveredOption ? hoveredOption : typedOption]);
        setIsSelectOpen(false);
      }
    }

    if (e.key === "Backspace") {
      if (typedOption.length === 0 && value && value.length > 0) {
        const newArray = value;
        newArray.pop();
        setValue([...newArray]);
      }
      setIsSelectOpen(false);
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();

      if (hoveredOption === null) {
        setHoveredOption(options[0]);
      } else if (
        options.findIndex((el) => getLabel(el) === getLabel(hoveredOption)) +
          1 !==
        options.length
      ) {
        setHoveredOption(
          options[
            options.findIndex(
              (el) => getLabel(el) === getLabel(hoveredOption)
            ) + 1
          ]
        );
      }
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (
        hoveredOption === null ||
        options.findIndex((el) => getLabel(el) === getLabel(hoveredOption)) ===
          0
      ) {
        setHoveredOption(options[0]);
      } else {
        setHoveredOption(
          options[
            options.findIndex(
              (el) => getLabel(el) === getLabel(hoveredOption)
            ) - 1
          ]
        );
      }
    }
  };

  const handleChange = (typed) => {
    if (typed && typed.length >= 0) {
      setIsSelectOpen(true);
      handleSearch(typed);
    } else {
      setIsSelectOpen(false);
      setHoveredOption(null);
    }
    setTypedOption(typed);
  };

  return (
    <div className="c-custom-multiple-tags-input">
      <div
        className="c-custom-multiple-tags-input__input-container"
        aria-hidden="true"
      >
        {value.map((tag) => (
          <Tag
            key={tag}
            tag={tag}
            icon="tag"
            label={getLabel(tag)}
            extraClass="c-custom-multiple-tags-input__tag"
            onDelete={() => {
              setValue(
                value.filter((option) => getLabel(option) !== getLabel(tag))
              );
            }}
          />
        ))}
        <input
          placeholder={value.length === 0 ? placeholder : ""}
          value={typedOption}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          onKeyDown={(e) => handleKeyPress(e)}
          className="c-custom-multiple-tags-input__input"
        />
      </div>
      <button
        type="button"
        className={`c-custom-multiple-tags-input__button ${
          submitIcon && `c-custom-multiple-tags-input--${submitIcon}`
        } ${
          value.length === 0
            ? "c-custom-multiple-tags-input--disabled-button"
            : ""
        }`}
        onClick={value.length > 0 ? submitAction : () => {}}
      >
        {submitCTA}
      </button>
      <ClickAwayListener onClickAway={() => setIsSelectOpen(false)}>
        <div
          className={`c-custom-multiple-tags-input__popper ${
            isSelectOpen ? "c-custom-multiple-tags-input__popper--open" : ""
          }`}
        >
          {options.map((tag) => (
            <CustomSelectOption
              label={getLabel(tag)}
              type={getType(tag)}
              icon="red-tag"
              isHovered={hoveredOption && tag.tagName === hoveredOption.tagName}
              onClick={
                value.find((el) => el === tag)
                  ? () => setValue(value.filter((el) => el !== tag))
                  : () => {
                      setValue([...value, tag]);
                      setTypedOption("");
                    }
              }
              isSelected={value.find((el) => el === tag)}
            />
          ))}
          {options.length === 0 && noResults}
        </div>
      </ClickAwayListener>
    </div>
  );
};

export default CustomMultipleTagsInput;
