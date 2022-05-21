import Flag from "react-flagkit";

const LanguageWidget = ({
  isoLanguageCode,
  countryCode,
  country,
  className = "",
}) => (
  <div className={`c-language-widget ${className}`}>
    {countryCode && <Flag country={countryCode.toUpperCase()} />}
    <span className="c-language-widget__language">{`${country} (${isoLanguageCode.toUpperCase()})`}</span>
  </div>
);

export default LanguageWidget;
