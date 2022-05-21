const Button = ({
  children,
  icon = "",
  type = "button",
  className = "",
  ...props
}) => (
  <button
    {...props}
    // eslint-disable-next-line react/button-has-type
    type={type}
    className={`c-button ${icon && `c-button--${icon}`} ${className}`}
  >
    {children}
  </button>
);

export default Button;
