import { useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import { TextIcon } from "../../../icons/IconsLibrary";
import { formatTagType } from "../../../utils/formatters";

const InputSearchOption = ({
  option,
  optionsSelected,
  selectOption,
  isHovered,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (optionsSelected.length > 1) {
      if (optionsSelected.find((el) => el.tagId === option.tagId)) {
        setIsSelected(true);
      }
    } else if (
      optionsSelected &&
      optionsSelected.length === 1 &&
      optionsSelected[0].tagId === option.tagId
    ) {
      setIsSelected(true);
    }
  }, []);

  const handleClick = () => {
    if (!isSelected) {
      selectOption(option);
    }
  };

  return (
    <div
      aria-hidden="true"
      className={`c-input-search-option c-input-search-option--${formatTagType(
        option.tagTypeName
      )}
    ${isSelected ? "c-input-search-option--selected" : ""}
    ${isHovered ? "c-input-search-option--hovered" : ""}
    `}
      onClick={handleClick}
    >
      <span className="c-input-search-option__title">{option.tagName}</span>
      <div className="c-input-search-option__type-container">
        {option.tagTypeName === "Text" && (
          <>
            <ReactTooltip
              id="text-tooltip"
              className="c-input-search-option__tooltip"
            >
              <div>
                <p>
                  Text search: you can combine search words with operators AND,
                  NOT and OR to fine-tune relevant results.{" "}
                </p>
                <p>
                  For example, a Boolean search could be `hotel AND New York AND
                  NOT Downtown`.
                </p>
                <p>
                  Combine modifiers and use brackets to create a more complex
                  search. For example: `network AND (problem OR degradation OR
                  outage)`
                </p>
                <p>
                  You can filter for words within a certain number of words of
                  each other. For example: `environment {`<4>`} concern`
                </p>
              </div>
            </ReactTooltip>
            <a
              aria-hidden="true"
              data-tip
              data-for="text-tooltip"
              className="c-input-search-option__tooltip-icon"
            >
              <TextIcon />
            </a>
          </>
        )}
        <span className="c-input-search-option__type">
          {option.tagTypeName}
        </span>
      </div>
    </div>
  );
};

export default InputSearchOption;
