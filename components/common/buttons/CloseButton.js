const CloseButton = ({ className = "", action }) => (
  <button
    onClick={action}
    type="button"
    aria-hidden="true"
    className={`${className} c-close-button`}
  ></button>
);

export default CloseButton;
