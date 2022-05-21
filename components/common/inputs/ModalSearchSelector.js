import InfiniteScroll from "react-infinite-scroll-component";
import { TextField, Popper, ClickAwayListener } from "@material-ui/core";
import { useController, useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect, useRef } from "react";

import SelectOptionCheckBox from "./SelectOptionCheckBox";
import SelectOptionNoOptions from "./SelectOptionNoOptions";
import SpinnerRing from "../spinner/SpinnerRing";

const ModalSearchSelector = ({
  id = "",
  className = "",
  control,
  fetchFunction,
  name,
  register,
  title = "",
  type = "",
  renderModal,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [hoveredTag, setHoveredTag] = useState(null);
  const optionsContainer = useRef(null);
  const inputRef = useRef();
  const [search, setSearch] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, status, fetchNextPage, hasNextPage } = fetchFunction(search);

  useEffect(() => {
    setLoading(status === "loading");
  }, [status]);

  const {
    field: { ref, value = [], onChange },
  } = useController({
    name,
    control,
  });

  const { setValue } = useForm();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const getElementsToMap = (elements) => {
    if (!elements) {
      return [];
    }
    const mapping = elements?.pages
      .map((page) => page.results)
      .flat()
      .filter((d) => !!d)
      .map((filter) => ({ value: filter, label: filter }));

    return mapping;
  };

  useEffect(() => {
    setOptions(getElementsToMap(data));
  }, [data]);

  const handleScroll = () => {
    fetchNextPage();
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

  const handleInputChange = useDebouncedCallback((searchTerm) => {
    if (!searchTerm) {
      setSearch("");
      return;
    }
    setSearch(searchTerm);
  }, 300);

  const addTags = (tags) => {
    const newValue = [...value];
    tags.map((tag) => {
      newValue.push({
        value: tag.filterParameterValue,
        label: tag.filterParameterValue,
      });
    });
    const uniqueTags = newValue.reduce((acc, current) => {
      const x = acc.find((item) => item.value === current.value);
      if (!x) {
        return acc.concat([current]);
      }
      return acc;
    }, []);
    onChange(uniqueTags);
    setValue(name, uniqueTags);
  };

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
    if (tags.length === 0) return false;
    const firstTag = tags[0];
    const firstTagName =
      firstTag.length > 20 ? firstTag.substring(0, 20) : firstTag;
    if (tags.length === 1) {
      return `${firstTagName}...`;
    }
    if (tags.length > 1) {
      return `${firstTagName}... (+${tags.length - 1})`;
    }
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

    if (search === "") {
      return (
        <>
          <SelectOptionNoOptions
            noOptionText={`Enter a text in the search field to find ${type}`}
          />
        </>
      );
    }

    return (
      <>
        <SelectOptionNoOptions noOptionText={`No ${type} found`} />
      </>
    );
  };

  return (
    <>
      <ClickAwayListener
        onClickAway={() => {
          setOpen(false);
          setSearch("");
          setHoveredTag(null);
        }}
      >
        <div className={`c-multiple-search-selector ${className}`}>
          {renderModal(openModal, setOpenModal, type, addTags)}
          <input type="hidden" {...register(name)} />
          <input type="hidden" {...register(name)} />
          <TextField
            placeholder={title}
            label={title}
            InputLabelProps={{ shrink: value.length > 0 }}
            value={limitTags([...value.map((el) => el.label)]) || ""}
            ref={ref}
            className={`c-text-field c-text-field--select ${
              open ? "c-text-field--select--open" : ""
            }`}
            onClick={handleClick}
          />
          <Popper
            open={open}
            anchorEl={anchorEl}
            ref={optionsContainer}
            className="c-multiple-search-selector__popper"
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
                <span
                  className="c-multiple-search-selector__title"
                  style={{ color: "#a8a8a8" }}
                >
                  {title}
                  <span
                    className="c-multiple-search-selector__add-keylist"
                    role="button"
                    onKeyDown={handleOpenModal}
                    onClick={handleOpenModal}
                    tabIndex={0}
                  >
                    Add key list
                  </span>
                </span>
                <div className="c-multiple-search-selector__first-tags">
                  {value.map((option) => (
                    <SelectOptionCheckBox
                      key={option.label}
                      option={option.label}
                      handleSelect={() => handleSelect(option)}
                      handleDeselect={() => handleDeselect(option)}
                      isHovered={hoveredTag && option === hoveredTag.tag}
                      isSelected={value.find((el) => el === option)}
                    />
                  ))}
                </div>
                <div
                  className="c-multiple-search-selector__list-container"
                  id={`scrollableDiv-${id}`}
                  style={{
                    height: 300,
                  }}
                >
                  <InfiniteScroll
                    dataLength={options.length}
                    next={handleScroll}
                    loader={<SpinnerRing />}
                    hasMore={hasNextPage}
                    scrollableTarget={`scrollableDiv-${id}`}
                  >
                    {selectOptions()}
                  </InfiniteScroll>
                </div>
              </div>
            </div>
          </Popper>
        </div>
      </ClickAwayListener>
    </>
  );
};

export default ModalSearchSelector;
