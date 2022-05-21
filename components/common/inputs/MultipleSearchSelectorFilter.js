import InfiniteScroll from "react-infinite-scroll-component";
import { TextField, Popper, ClickAwayListener } from "@material-ui/core";
import { useController } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect, useRef } from "react";

import SelectOptionCheckBox from "./SelectOptionCheckBox";
import SelectOptionNoOptions from "./SelectOptionNoOptions";

const MultipleSearchSelectorFilter = ({
  className = "",
  control,
  label,
  name,
  noOptionText,
  options = [],
  register,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const [hoveredTag, setHoveredTag] = useState(null);

  const optionsContainer = useRef(null);
  const inputRef = useRef(null);

  const {
    field: { ref, value = [], onChange },
  } = useController({
    name,
    control,
  });

  useEffect(() => {
    if (hoveredTag) {
      if (hoveredTag.index > 7) {
        optionsContainer.current.scrollTop = (hoveredTag.index - 4) * 38.89;
      } else {
        optionsContainer.current.scrollTop = 0;
      }
    }
  }, [hoveredTag]);

  const handleInputChange = useDebouncedCallback((search) => {
    setQuery(search);
  }, 300);

  const handleSelect = (option) => {
    onChange([...value, option]);
  };

  const handleDeselect = (option) => {
    onChange(value.filter((el) => el !== option));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  useEffect(() => {
    inputRef.current?.focus();
    if (open) {
      setQuery("");
    }
  }, [open]);

  const limitTags = (tags) => {
    if (tags.length > 1) {
      return `${tags[0]}  ...+(${tags.length - 1})`;
    }
    return tags;
  };

  const selectedFirstOptions = () => {
    if (options.length > 0) {
      const returnOptions = (array) =>
        array.map((option) => (
          <SelectOptionCheckBox
            key={option}
            option={option}
            handleSelect={() => handleSelect(option)}
            handleDeselect={() => handleDeselect(option)}
            isHovered={hoveredTag && option === hoveredTag.tag}
            isSelected={value.find((el) => el === option)}
          />
        ));

      const optionsSelected = returnOptions(value.filter((option) => option));

      return <>{optionsSelected}</>;
    }
    return <SelectOptionNoOptions noOptionText={noOptionText} />;
  };

  const selectFirstOptions = () => {
    if (options.length > 0) {
      const returnOptions = (array) =>
        array
          .filter((option) =>
            option.toLowerCase().startsWith(query.toLowerCase())
          )
          .map((option) => (
            <SelectOptionCheckBox
              key={option}
              option={option}
              handleSelect={() => handleSelect(option)}
              handleDeselect={() => handleDeselect(option)}
              isHovered={hoveredTag && option === hoveredTag.tag}
              isSelected={value.find((el) => el === option)}
            />
          ));

      const optionsWithoutSelected = returnOptions(
        options.filter((option) =>
          value.find((el) => el === option) ? false : true
        )
      );

      return options.length > 0 ? (
        <>{optionsWithoutSelected}</>
      ) : (
        <>{query && <SelectOptionNoOptions noOptionText={noOptionText} />}</>
      );
    }
    return <></>;
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        setOpen(false);
        setHoveredTag(null);
      }}
    >
      <div className={`c-multiple-search-selector ${className}`}>
        <input type="hidden" {...register(name)} />
        <input type="hidden" {...register(name)} />
        <TextField
          label={label}
          InputLabelProps={{ shrink: value.length > 0 }}
          value={limitTags([...value]) || ""}
          ref={ref}
          className={`c-text-field c-text-field--select ${
            open ? "c-text-field--select--open" : ""
          }`}
          onClick={handleClick}
          // onKeyDown={handleSelectKeys}
        />
        <Popper
          open={open}
          anchorEl={anchorEl}
          ref={optionsContainer}
          className="c-multiple-search-selector__popper--simple"
          // onKeyDown={handleSelectKeys}
        >
          <div>
            <div className="c-multiple-search-selector__input-container">
              <input
                ref={(input) => {
                  if (input !== null) input.focus();
                }}
                onChange={(e) => handleInputChange(e.target.value)}
                className="c-multiple-search-selector__input"
                placeholder="Search..."
              />
            </div>
            <div className="c-multiple-search-selector__container">
              <div className="c-multiple-search-selector__first-tags">
                {selectedFirstOptions()}
              </div>
              <div
                className="c-multiple-search-selector__list-container"
                id="scrollableDiv"
                style={{
                  height: 345,
                }}
              >
                <InfiniteScroll
                  dataLength={options.length}
                  scrollableTarget="scrollableDiv"
                >
                  {selectFirstOptions()}
                </InfiniteScroll>
              </div>
            </div>
          </div>
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

export default MultipleSearchSelectorFilter;
