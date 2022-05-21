import { Progress } from "rsuite";

const { Line } = Progress;

const WeightBar = ({
  hideIcon = false,
  weight,
  className = "",
  color = "#ff0050",
}) => (
  <div
    className={`c-weight-bar ${className} ${
      hideIcon ? "c-weight-bar--hide-icon" : ""
    }`}
  >
    <Line percent={(weight / 250) * 100} strokeColor={color} showInfo={false} />
  </div>
);

export default WeightBar;
