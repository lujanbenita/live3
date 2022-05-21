const CustomSelectOption = ({
  label,
  isSelected,
  isHovered,
  onClick,
  extraClass = "",
  icon,
  type,
}) => (
  <div
    className={`c-custom-select-option ${extraClass} ${
      isSelected ? "c-custom-select-option--selected" : ""
    } ${isHovered ? "c-custom-select-option--hovered" : ""}`}
    onClick={onClick}
    aria-hidden="true"
    type="select"
  >
    <span
      className={`c-custom-select-option__label ${
        icon ? `c-custom-select-option--${icon}` : ""
      }`}
    >
      {label}
    </span>
    {type && type}
  </div>
);

export default CustomSelectOption;
