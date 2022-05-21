const SelectOption = ({ option, onClick, onKeyDown }) => (
  <div
    className="c-select-option"
    onKeyDown={onKeyDown}
    onClick={() => onClick(option)}
    role="button"
    tabIndex="0"
  >
    {option}
  </div>
);

export default SelectOption;
