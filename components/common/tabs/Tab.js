const Tab = ({ label, onClick, isActive, className = "", tab }) => (
  <div
    aria-hidden="true"
    onClick={() => onClick(tab)}
    className={`c-tab ${isActive ? "c-tab--active" : ""} ${className}`}
  >
    {label}
  </div>
);

export default Tab;
