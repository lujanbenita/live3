import SpinnerComponent from "../spinner/SpinnerComponent";

const SubmitButtonComponent = ({
  children,
  isLoading,
  className = "",
  buttonEnabled = true,
  ...props
}) => (
  <button
    {...props}
    className={`c-submit-button ${className}`}
    disabled={buttonEnabled ? false : "disabled"}
    type="submit"
    data-testid="loginBtn"
  >
    {isLoading ? <SpinnerComponent /> : children}
  </button>
);

export default SubmitButtonComponent;
