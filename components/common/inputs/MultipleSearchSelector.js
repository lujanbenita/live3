import InfiniteScroll from "react-infinite-scroll-component";
import { TextField, Popper, ClickAwayListener } from "@material-ui/core";
import { useController } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect, useRef } from "react";

import SelectOptionCheckBox from "./SelectOptionCheckBox";
import SelectOptionNoOptions from "./SelectOptionNoOptions";
import SpinnerRing from "../spinner/SpinnerRing";

const MultipleSearchSelector = ({
  className = "",
  control,
  firstLoading = false,
  firstNext,
  firstOptions = [],
  firstTitle = "",
  getLabel,
  handleSearch,
  hasMore,
  label,
  loadMore,
  loading = false,
  name,
  noOptionText,
  options = [],
  register,
  secondNoOptionText = "",
  secondTitle = "",
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

  const handleScroll = () => {
    loadMore();
  };

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
    if (search) {
      handleSearch(search);
    } else {
      handleSearch("a");
    }
  }, 300);

  const handleSelect = (option) => {
    onChange([...value, option]);
  };

  const handleDeselect = (option) => {
    onChange(value.filter((el) => el.label !== option.label));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [open]);

  const limitTags = (tags) => {
    if (tags) {
      const formattedTags = tags.map((tag) => {
        if (typeof tag === "number") {
          const res = firstOptions.find(({ filterId }) => filterId === tag);
          return res ? res.filterName : tag;
        }
        return tag;
      });

      if (tags.length > 1) {
        return `${formattedTags[0]}  ...+(${formattedTags.length - 1})`;
      }
      return formattedTags;
    }
    return tags;
  };

  // const handleSelectKeys = (e) => {
  // if (e.key === "Enter") {
  //   const isHoveredSelected = value.find((el) => el === hoveredTag.tag);
  //   if (isHoveredSelected) {
  //     handleDeselectValue(hoveredTag.tag);
  //   } else {
  //     handleSelect(hoveredTag ? hoveredTag.tag : options[0]);
  //   }
  // } else if (e.key === "ArrowDown") {
  //   if (!hoveredTag) {
  //     setHoveredTag({ index: 0, tag: options[0] });
  //   } else if (hoveredTag.index + 1 < options.length) {
  //     setHoveredTag({
  //       index: hoveredTag.index + 1,
  //       tag: options[hoveredTag.index + 1],
  //     });
  //   }
  // } else if (e.key === "ArrowUp") {
  //   e.preventDefault();
  //   if (hoveredTag && hoveredTag.index !== 0) {
  //     setHoveredTag({
  //       index: hoveredTag.index - 1,
  //       tag: options[hoveredTag.index - 1],
  //     });
  //   }
  // }
  // if (e.key === 'Backspace') {
  //   onChange([]);
  // }
  // };

  const firstOptionsOrderName = firstOptions.sort((a, b) => {
    const textA = a.filterName.toUpperCase();
    const textB = b.filterName.toUpperCase();
    if (textA < textB) return -1;
    if (textA > textB) return 1;
    return 0;
    // return textA < textB ? -1 : textA > textB ? 1 : 0;
  });

  const selectedFirstOptions = () => {
    if (firstOptionsOrderName.length > 0) {
      const returnOptions = (array) =>
        array.map((option) => (
          <SelectOptionCheckBox
            key={option.filterId}
            option={option.label}
            handleSelect={() => handleSelect(option)}
            handleDeselect={() => handleDeselect(option)}
            isHovered={hoveredTag && option === hoveredTag.tag}
            isSelected={value.find((el) => el === option)}
          />
        ));

      const optionsSelected = returnOptions(
        value.filter((option) => option.isKeyList)
      );

      return <>{optionsSelected}</>;
    }
    return <SelectOptionNoOptions noOptionText={noOptionText} />;
  };

  const selectFirstOptions = () => {
    if (firstOptions.length > 0) {
      const filterFirstOptions = firstOptions.filter(
        ({ filterName }) =>
          !!filterName.toLowerCase().includes(query.toLowerCase().trim())
      );

      const returnOptions = (array) =>
        array.map((option) => (
          <SelectOptionCheckBox
            key={option.filterId}
            option={option.label}
            handleSelect={() => handleSelect(option)}
            handleDeselect={() => handleDeselect(option)}
            isHovered={hoveredTag && option === hoveredTag.tag}
            isSelected={value.find((el) => el === option)}
          />
        ));

      const optionsWithoutSelected = returnOptions(
        filterFirstOptions.filter((option) =>
          value.find((el) => el.label === option.filterName) ? false : true
        )
      );

      return filterFirstOptions.length > 0 ? (
        <>{optionsWithoutSelected}</>
      ) : (
        <>{query && <SelectOptionNoOptions noOptionText={noOptionText} />}</>
      );
    }
    return <SelectOptionNoOptions noOptionText={noOptionText} />;
  };

  const selectedOptions = () => {
    const returnOptions = (array) =>
      array.map((option) => (
        <SelectOptionCheckBox
          key={option.label}
          option={option.label}
          handleSelect={() => handleSelect(option)}
          handleDeselect={() => handleDeselect(option)}
          isHovered={hoveredTag && option === hoveredTag.tag}
          isSelected={value.find((el) => el === option)}
        />
      ));

    const optionsSelected = returnOptions(
      value.filter((option) => !option.isKeyList)
    );

    return <>{optionsSelected}</>;
  };

  const selectOptions = () => {
    const returnOptions = (array) =>
      array.map((option) => (
        <SelectOptionCheckBox
          key={option.label}
          option={option.label}
          handleSelect={() => handleSelect(option)}
          handleDeselect={() => handleDeselect(option)}
          isHovered={hoveredTag && option === hoveredTag.tag}
          isSelected={value.find((el) => el === option)}
        />
      ));

    const optionsWithoutSelected = returnOptions(
      options.filter((option) =>
        value.find((el) => el.label === option.label) ? false : true
      )
    );

    if (loading) {
      return (
        <>
          <SpinnerRing />
        </>
      );
    }

    if (options.length > 0) {
      return <>{optionsWithoutSelected}</>;
    }
    return (
      <>
        <SelectOptionNoOptions noOptionText={secondNoOptionText} />
      </>
    );
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
          value={limitTags([...value.map((el) => getLabel(el))]) || ""}
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
          className="c-multiple-search-selector__popper"
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
              <span className="c-multiple-search-selector__title">
                {firstTitle}
              </span>
              <div className="c-multiple-search-selector__first-tags">
                {selectedFirstOptions()}
              </div>
              <div
                className="c-multiple-search-selector__list-container"
                id="scrollableDiv"
              >
                <InfiniteScroll
                  dataLength={options.length}
                  next={firstNext}
                  // loader={<SpinnerRing />}
                  hasMore={firstLoading}
                  scrollableTarget="scrollableDiv"
                >
                  {selectFirstOptions()}
                </InfiniteScroll>
              </div>
              <span
                className="c-multiple-search-selector__title"
                style={{ color: "#a8a8a8" }}
              >
                {secondTitle}
              </span>
              <div className="c-multiple-search-selector__first-tags">
                {selectedOptions()}
              </div>
              <div
                className="c-multiple-search-selector__list-container"
                id="scrollableDiv2"
                style={{
                  height: 180,
                }}
              >
                <InfiniteScroll
                  dataLength={options.length}
                  next={handleScroll}
                  loader={<SpinnerRing />}
                  hasMore={hasMore}
                  scrollableTarget="scrollableDiv2"
                >
                  {selectOptions()}
                </InfiniteScroll>
              </div>
            </div>
          </div>
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

export default MultipleSearchSelector;
