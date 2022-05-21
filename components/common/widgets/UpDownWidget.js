import { ArrowDown, ArrowUp } from "../../../icons/IconsLibrary";

const UpDownWidget = ({ isUp, extraClass = "" }) => (
  <div
    className={`c-up-down-widget ${
      isUp ? "c-up-down-widget--up" : "c-up-down-widget--down"
    } ${extraClass}`}
  >
    {isUp ? <ArrowUp /> : <ArrowDown />}
  </div>
);

export default UpDownWidget;
