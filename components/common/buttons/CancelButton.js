const Button = ({ children, className = "", ...props }) => (
  <button {...props} type="button" className={`c-cancel-button ${className}`}>
    {children}
  </button>
);

export default Button;
