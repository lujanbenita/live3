const TagButton = ({ children, className = "", ...props }) => (
  <button type="button" {...props} className={`c-tag-button ${className}`}>
    {children}
  </button>
);

export default TagButton;
