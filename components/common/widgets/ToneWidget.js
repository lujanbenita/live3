const ToneWidget = ({ value = 0, className = "", multiple = false }) => {
  const toneDirection = () => {
    if (value > 15) {
      return "c-tone-widget--up";
    }
    if (value < -15) {
      return "c-tone-widget--down";
    }
    return "c-tone-widget--neutral";
  };

  return (
    <div
      className={`c-tone-widget ${toneDirection()} ${className} ${
        multiple ? "c-tone-widget--multiple" : ""
      }`}
    ></div>
  );
};

export default ToneWidget;
