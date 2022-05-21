/* eslint-disable no-nested-ternary */
import { numberFormatter } from "@/utils/formatters";
import { ordinalSuffixOfSeparated } from "@/utils/ordinalSuffixOf";
import styled from "@emotion/styled";
import ReactTooltip from "react-tooltip";
import { FONT_MUSEO_SLAB } from "theme";
import CompanyAvatarCard from "../atoms/CompanyAvatarCard";

const formatVariations = (value) =>
  Math.round(value) > 0 ? `+${value}` : value;

const formatTopVariations = (variation) => {
  if (variation > 0) return <VariationPositive>{variation}</VariationPositive>;
  if (variation === 0) return <Neutral />;
  if (variation < 0)
    return <VariationNegative>{Math.abs(variation)}</VariationNegative>;
};

const CardRankItem = ({
  isLastItem,
  tag,
  isHover,
  handleClick,
  companyClass,
  addClassWithHover,
}) => {
  let firstPlaces = 3;
  if (isLastItem) {
    firstPlaces = 8;
  }

  const {
    volume,
    score,
    companyTag,
    volumeVariation,
    scoreVariation,
    rankVariation,
    rank,
  } = tag;

  const pos = ordinalSuffixOfSeparated(rank);

  return (
    <div
      role="presentation"
      // key={rank}
      onClick={() => handleClick(companyTag)}
    >
      <Item
        data-tip
        data-for={`card-rank-item-${companyTag}`}
        onMouseEnter={() => addClassWithHover(true, companyTag)}
        onMouseLeave={() => addClassWithHover(false, companyTag)}
        className={
          isHover && companyClass === companyTag
            ? "active"
            : isHover
            ? "inactive"
            : rank > 3 && rank < 9
            ? "is-neutral"
            : rank > 8
            ? "c-border-dot__is-last"
            : ""
        }
      >
        <div
          className="c-ranking-item__rank"
          style={
            isLastItem
              ? { color: rank > firstPlaces ? "#2a4f6b" : "#9da6b2" }
              : { color: pos[0] > firstPlaces ? "#9da6b2" : "#008a19" }
          }
        >
          <div className="c-ranking-item__ranking">
            <span className="c-ranking-item__rank-number">
              {isLastItem ? rank : pos[0]}
            </span>
            <span className="c-ranking-item__rank-ordinals">
              {isLastItem ? "th" : pos[1]}
            </span>
          </div>
          <CompanyAvatarCard image={false} brand={companyTag} />
          <div className="c-ranking-item__rank-gradient"></div>
        </div>

        <div className="c-ranking-item__content">
          <div className="c-ranking-item__company">{companyTag}</div>
          <div className="c-ranking-item__data">
            <div className="c-ranking-item__score">
              <span className="c-ranking-item__score-title">Score</span>
              <span className="c-ranking-item__score-data">
                {formatVariations(score)}
              </span>
              <span
                className="c-ranking-item__score-data-little"
                isPositive={scoreVariation > 0}
              >
                {`(${formatVariations(scoreVariation)})`}
              </span>
            </div>
            <div
              className="c-ranking-item__data-img-container"
              variation={rankVariation}
            >
              {formatTopVariations(rankVariation)}
            </div>
          </div>
        </div>
      </Item>

      <Tooltip
        id={`card-rank-item-${companyTag}`}
        borderColor="#bdc3d5"
        border
        backgroundColor="#fff"
        effect="solid"
      >
        <TooltipTag>{companyTag}</TooltipTag>
        <TooltipVolume>{numberFormatter(volume)}</TooltipVolume>
        <VariationScore isPositive={scoreVariation > 0}>
          {`${formatVariations(volumeVariation)}%`}
        </VariationScore>
      </Tooltip>
    </div>
  );
};
export default CardRankItem;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 15px;
  margin-right: 15px;
  cursor: pointer;
  background-color: #d7fdf2;
  margin: 0 0 5px;
  border-radius: 20px;
  overflow: hidden;

  &.inactive {
    background-color: #f1f1f1;
    color: #3a4557;
  }
`;

const VariationScore = styled.span`
  color: #162a3a;
  font-family: ${FONT_MUSEO_SLAB};
  font-size: 10px;
  color: ${(props) => (props.isPositive ? "#008a19" : "#ff004c")};
  font-weight: 500;
  width: 36px;
  margin-right: 10px;
  white-space: pre;
  line-height: 1;

  .inactive & {
    color: #9da6b2 !important;
  }
`;

const Tooltip = styled(ReactTooltip)`
  && {
    background-color: white;
    font-family: ${FONT_MUSEO_SLAB};
    color: black;
    box-shadow: "2px 2px 8px 0 rgba(0, 0, 0, 0.1)";
    border-radius: 3px;
    padding: 5px 10px;
  }
`;

const TooltipTag = styled.span`
  font-family: ${FONT_MUSEO_SLAB};
  font-size: 10px;
  font-weight: 500;
  padding-right: 15px;
  margin-right: 10px;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
`;

const TooltipVolume = styled.span`
  font-family: ${FONT_MUSEO_SLAB};
  font-size: 10px;
  font-weight: bold;
  color: "#2b2b2b";
  margin-right: 10px;
`;

const VariationPositive = styled.div`
  position: relative;
  padding-left: 8px;
  font-weight: 900;
  font-size: 16px;

  &&:before {
    content: "";
    position: relative;
    left: -2px;
    width: 12px;
    height: 17px;
    background: url(${process.env.BASE_PATH}"/img/icons/arrow-up.svg");
    background-size: cover !important;

    .inactive & {
      background: url(${process.env.BASE_PATH}"/img/icons/arrow-up-grey.svg") !important;
    }
  }
`;

const VariationNegative = styled.div`
  position: relative;
  padding-left: 8px;
  font-weight: 900;
  font-size: 16px;

  &&:before {
    content: "";
    position: relative;
    left: -2px;
    width: 12px;
    height: 17px;
    background: url(${process.env.BASE_PATH}"/img/icons/arrow-down.svg");
    background-size: cover !important;

    .inactive & {
      background: url(${process.env.BASE_PATH}"/img/icons/arrow-down-grey.svg") !important;
    }
  }
`;

const Neutral = styled.div`
  width: 24px;
  height: 24px;
  background: url(${process.env.BASE_PATH}"/img/icons/tone-neutral.svg");
  background-size: cover !important;
`;
