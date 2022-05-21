const EditInput = ({ label, onClick, className = "" }) => (
  <div
    className={`c-edit-input ${className}`}
    onClick={onClick}
    aria-hidden="true"
  >
    <span className="c-edit-input__label">{label}</span>
  </div>
);
export default EditInput;
