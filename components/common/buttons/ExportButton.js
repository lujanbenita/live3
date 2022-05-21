import ExportChartTutorial from "@/components/tutorial/ExportChartTutorial";

/* eslint-disable jsx-a11y/control-has-associated-label */
const ExportButton = ({ onClick, className = "" }) => (
  <>
    <button
      type="button"
      onClick={onClick}
      className={`c-export-button ${className}`}
    />
    <ExportChartTutorial />
  </>
);

export default ExportButton;
