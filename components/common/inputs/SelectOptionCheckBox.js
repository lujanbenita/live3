/* eslint-disable no-unused-expressions */
import Checkbox from "./Checkbox";

const SelectOption = ({
  option,
  handleDeselect,
  handleSelect,
  isSelected,
  onKeyDown,
  isHovered,
}) => (
  <div
    className={`c-select-option-checkbox ${
      isSelected ? "c-select-option-checkbox--checked" : ""
    }
    ${isHovered ? "c-select-option-checkbox--hovered" : ""}
    `}
    onKeyDown={onKeyDown}
    onClick={() => {
      isSelected ? handleDeselect(option) : handleSelect(option);
    }}
    role="button"
    tabIndex="0"
  >
    <Checkbox isChecked={isSelected} />
    <span
      title={option}
      className={`c-select-option-checkbox__option  ${
        isSelected ? "c-select-option-checkbox__option--checked" : ""
      }`}
    >
      {option}
    </span>
  </div>
);

export default SelectOption;
