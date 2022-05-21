import ReactTooltip from "react-tooltip";

import { formatTagType } from "utils/formatters";

import ToneWidget from "./ToneWidget";

const MultipleToneWidget = ({ tags, id }) => {
  const thereIsANegativeTone = tags.some((tone) => tone.sentimentScore < -15);
  const thereIsANeutralTone = tags.some(
    (tone) => tone.sentimentScore >= -15 && tone.sentimentScore <= 15
  );
  const thereIsAPositiveTone = tags.some((tone) => tone.sentimentScore > 15);

  const thereAreMultipleTones = () => {
    const tones = [];

    thereIsAPositiveTone && tones.push(thereIsAPositiveTone);
    thereIsANeutralTone && tones.push(thereIsANeutralTone);
    thereIsANegativeTone && tones.push(thereIsANegativeTone);

    if (tones.length > 1) {
      return true;
    }
    return false;
  };

  return (
    <>
      <div
        data-tip
        data-for={`multiple-tone-tooltip-${id}`}
        className="c-multiple-tone-widget"
      >
        {tags.length > 0 ? (
          <div className="c-multiple-tone-widget__tones-container">
            {thereIsANegativeTone && (
              <ToneWidget value={-16} multiple={thereAreMultipleTones()} />
            )}
            {thereIsANeutralTone && (
              <ToneWidget value={0} multiple={thereAreMultipleTones()} />
            )}
            {thereIsAPositiveTone && (
              <ToneWidget value={16} multiple={thereAreMultipleTones()} />
            )}
          </div>
        ) : (
          <ToneWidget value={tags[0].sentimentScore} />
        )}
      </div>
      <ReactTooltip
        delayShow={300}
        multiline
        borderColor="#bdc3d5"
        border
        backgroundColor="#fff"
        effect="solid"
        style={{ boxShadow: "2px 2px 8px 0 rgba(0, 0, 0, 0.1)" }}
        place="top"
        id={`multiple-tone-tooltip-${id}`}
        className="c-multiple-weight-bar__tooltip"
      >
        {tags.map((tag) => (
          <div className="c-multiple-tone-widget__row" key={tag.tagId}>
            <div className="c-multiple-tone-widget__tone-wrapper">
              <ToneWidget
                multiple
                value={tag.sentimentScore}
                className="c-multiple-tone-widget__tone"
              />
            </div>

            <span
              className={`c-multiple-weight-bar__class-name c-input-search-option--${formatTagType(
                tag.tagTypeName
              )}`}
            >
              {tag.tagName}
            </span>
          </div>
        ))}
      </ReactTooltip>
    </>
  );
};

export default MultipleToneWidget;
