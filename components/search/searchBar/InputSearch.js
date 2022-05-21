import React, { useState, useEffect, useRef } from "react";
import { ClickAwayListener } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useController } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";

import InputSearchOption from "./InputSearchOption";
import { fetchSearchTags } from "../../../redux/search/searchActions";
import { setData } from "../../../redux/searchObject/actions";
import Tag from "../../common/inputs/Tag";
import { DotsIcon } from "../../../icons/IconsLibrary";
import { formatTagType } from "../../../utils/formatters";

const InputSearch = ({ name, control }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [query, setQuery] = useState("");
  const [hoveredTag, setHoveredTag] = useState(null);
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.search.tags);
  const searchInput = useRef(null);
  const searchObject = useSelector((state) => state.searchObject);
  const selectedTag = useSelector((state) => state.searchObject.selectedTag);

  const {
    field: { reference, value = [], onChange },
  } = useController({
    name,
    control,
  });

  const optionsContainer = useRef(null);

  const handleSearch = useDebouncedCallback((q) => {
    dispatch(fetchSearchTags(q), 250);
  });

  useEffect(() => {
    (async () => {
      if (query.length > 0 && query.length < 2) {
        setOpen(true);
        setOptions([
          { tagName: query, tagTypeName: "Text", tagId: query },
          ...tags,
        ]);
      } else if (query.length >= 2) {
        handleSearch(query);
      } else {
        setOptions([]);
      }
    })();
  }, [query]);

  useEffect(() => {
    if (query.length > 0) {
      setOptions([
        { tagName: query, tagTypeName: "Text", tagId: query },
        ...tags,
      ]);
    }
  }, [tags]);

  useEffect(() => {
    if (hoveredTag && hoveredTag.index > 4) {
      optionsContainer.current.scrollTop = (hoveredTag.index - 4) * 46.88;
    } else if (hoveredTag) {
      optionsContainer.current.scrollTop = 0;
    }
  }, [hoveredTag]);

  const handleSelect = (el) => {
    setQuery("");
    setOptions([]);
    setOpen(false);
    setHoveredTag(null);
    if (value && value.length > 0) {
      onChange([...value, el]);
    } else {
      onChange([el]);
    }
  };

  const handleDeleteKey = () => {
    setOpen(false);
    if (value.length === 1) {
      onChange([]);
    } else {
      const actualvalue = value;
      actualvalue.pop();

      if (!Array.isArray(actualvalue)) {
        onChange([actualvalue]);
      } else {
        onChange([...actualvalue]);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Backspace" && query.length === 0) {
      handleDeleteKey();
      return;
    }

    if (e.key === "Enter") {
      if (hoveredTag) {
        handleSelect(hoveredTag.tag);
      } else if (options && options.length > 0) {
        handleSelect(options[0]);
      }
    } else if (e.key === "ArrowDown") {
      if (hoveredTag === null) {
        setHoveredTag({ index: 0, tag: options[0] });
      } else if (hoveredTag.index + 1 < options.length) {
        setHoveredTag({
          index: hoveredTag.index + 1,
          tag: options[hoveredTag.index + 1],
        });
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (hoveredTag && hoveredTag.index !== 0) {
        setHoveredTag({
          index: hoveredTag.index - 1,
          tag: options[hoveredTag.index - 1],
        });
      }
    }
  };

  const handleSelectTag = (tag) => {
    const data = {
      ...searchObject,
    };

    if (selectedTag?.tagId === tag.tagId) {
      data.selectedTag = null;
      dispatch(setData(data));
    } else {
      data.selectedTag = tag;
      dispatch(setData(data));
    }
  };

  const handleClearSelectedTag = (tag) => {
    if (selectedTag?.tagId === tag.tagId) {
      const newValue = value.filter((option) => option.tagId !== tag.tagId);
      const data = {
        ...searchObject,
        selectedTag: null,
        tags: newValue,
      };
      dispatch(setData(data));
    }
  };

  const focusInput = () => {
    if (open) {
      searchInput.current.focus();
    }
  };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className="c-input-search__absolute-position-reference">
        <div className="c-input-search" aria-hidden="true" onClick={focusInput}>
          <div
            ref={reference}
            className={`c-input-search__input-container ${
              open ? "c-input-search__input-container--open" : ""
            }`}
          >
            {value &&
              value.map((tag) => (
                <Tag
                  key={tag.tagName || tag}
                  tag={tag}
                  isSelected={selectedTag?.tagId === tag.tagId}
                  icon={formatTagType(tag.tagTypeName)}
                  label={tag.tagName}
                  onDelete={() => {
                    onChange(
                      value.filter((option) => option.tagId !== tag.tagId)
                    );
                    handleClearSelectedTag(tag);
                  }}
                  onClick={handleSelectTag}
                />
              ))}

            <input
              className="c-input-search__input"
              value={query}
              type="text"
              onKeyDown={(e) => handleKeyPress(e)}
              onClick={() => setOpen(true)}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              ref={searchInput}
              placeholder="Add Tag"
            />
          </div>

          {options.length > 0 && open ? (
            <div className="c-input-search__list-box" ref={optionsContainer}>
              {options.map((option) => (
                <InputSearchOption
                  key={option.tagId}
                  option={option}
                  isHovered={
                    hoveredTag && hoveredTag.tag.tagId === option.tagId
                  }
                  optionsSelected={value}
                  selectOption={handleSelect}
                />
              ))}
            </div>
          ) : null}
        </div>
        {value.length > 2 && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="c-input-search__open-help-button"
          >
            <DotsIcon />
          </button>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default InputSearch;
