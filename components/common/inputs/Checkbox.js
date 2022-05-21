const Checkbox = ({ isChecked, ...props }) => (
  <div
    {...props}
    aria-hidden="true"
    role="checkbox"
    aria-checked={isChecked}
    className={`c-checkbox ${isChecked ? "c-checkbox--checked" : ""}`}
  ></div>
);
export default Checkbox;
