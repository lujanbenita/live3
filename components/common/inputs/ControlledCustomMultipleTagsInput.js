import InfiniteScroll from "react-infinite-scroll-component";
import { ClickAwayListener } from "@material-ui/core";
import { useController } from "react-hook-form";
import { useState } from "react";

import { limitCharacters } from "utils/formatters";

import CustomSelectOption from "./CustomSelectOption";
import SpinnerRing from "../spinner/SpinnerRing";
import Tag from "./Tag";

const ControlledCustomMultipleTagsInput = ({
  submitCTA,
  submitIcon = "",
  submitAction,
  getLabel,
  getType,
  options,
  handleSearch,
  isLoading,
  placeholder,
  control,
  name,
  error,
  altSelectedElements,
  getSelectedLabel,
  className = "",
  colorButton = "red",
  label = false,
  infiniteScroll,
  total,
  loadMore,
}) => {
  const [typedOption, setTypedOption] = useState("");
  const [hoveredOption, setHoveredOption] = useState(null);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [page, setPage] = useState(1);
  const {
    field: { ref, value, onChange },
  } = useController({
    name,
    control,
  });

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && typedOption && typedOption.length > 0) {
      setTypedOption("");
      onChange([...value, hoveredOption ? hoveredOption : typedOption]);
      setIsSelectOpen(false);
    }

    if (e.key === "Backspace") {
      if (typedOption.length === 0 && value && value.length > 0) {
        if (!typedOption.length === 0 && value && value.length > 0) {
          const newArray = value;
          newArray.pop();
          onChange([...newArray]);
        }
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
    setPage(1);
    setTypedOption(typed);
  };

  const handleScroll = () => {
    if (infiniteScroll) {
      setPage(page + 1);
      loadMore(typedOption, page + 1);
    }
  };

  return (
    <div
      className={`c-custom-multiple-tags-input__main-container ${className}`}
    >
      {label && (
        <span className="c-custom-multiple-tags-input__label">{label}</span>
      )}
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
                onChange(
                  value.filter((option) => getLabel(option) !== getLabel(tag))
                );
              }}
            />
          ))}
          <input
            placeholder={placeholder}
            value={typedOption}
            ref={ref}
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
          }
          ${colorButton && `c-custom-multiple-tags-input--${colorButton}`} ${
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
            id="scrollable-popper"
          >
            {isLoading ? (
              <SpinnerRing />
            ) : (
              <InfiniteScroll
                dataLength={options.length}
                next={handleScroll}
                loader={<SpinnerRing />}
                scrollThreshold="10px"
                hasMore={total > options.length}
                scrollableTarget="scrollable-popper"
              >
                {options.map((tag) => (
                  <CustomSelectOption
                    key={tag}
                    label={getLabel(limitCharacters(tag, 65))}
                    type={getType(tag)}
                    icon={getType ? getType(tag) : "red-tag"}
                    isHovered={
                      hoveredOption && tag.tagName === hoveredOption.tagName
                    }
                    onClick={
                      value.find((el) => el === tag)
                        ? () => onChange(value.filter((el) => el !== tag))
                        : () => {
                            onChange([...value, tag]);
                            setTypedOption("");
                          }
                    }
                    isSelected={
                      value.find((el) => el === tag) ||
                      (altSelectedElements &&
                        altSelectedElements.find(
                          (el) => getSelectedLabel(el) === tag
                        ))
                    }
                  />
                ))}
              </InfiniteScroll>
            )}
          </div>
        </ClickAwayListener>
      </div>
      {error && (
        <span className="c-input-box-tags--error">{error.message}</span>
      )}
    </div>
  );
};

export default ControlledCustomMultipleTagsInput;
