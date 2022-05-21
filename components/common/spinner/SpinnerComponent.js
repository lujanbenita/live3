const SpinnerComponent = ({ color = "" }) => (
  <div className={`dot-flashing ${color && `dot-flashing--${color}`}`}></div>
);
export default SpinnerComponent;
