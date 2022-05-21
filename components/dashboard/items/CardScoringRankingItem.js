import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Progress } from "rsuite";

import ReactTooltip from "react-tooltip";
import styled from "@emotion/styled";
import { FONT_MUSEO_SLAB } from "theme";
import { setTopics } from "@/redux/searchObject/actions";
import { ordinalSuffixOfSeparated } from "@/utils/ordinalSuffixOf";
import nFormatter from "@/utils/numberQuantityFormatter";
import { getSign } from "@/utils/numberSignQuantityFormatter";

const CardScoringRankingItem = ({ tag, style }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { volume, score, tagName, rank, impactScore, tagId } = tag;
  const pos = ordinalSuffixOfSeparated(rank);
  const colorBar = style === "negative" ? "rgb(255, 0, 76)" : "rgb(0, 138, 25)";
  const volumeFormatted = nFormatter(volume, 2);

  const { Line } = Progress;

  const handleClick = () => {
    // router
    //   .push("/reputation-intelligence/feed")
    //   .then(() => dispatch(setTopics(tag)));
  };

  return (
    <>
      <div
        className={`c-card-scoring-ranking-item__item c-card-scoring-ranking-item__item--${style}`}
        onClick={() => handleClick()}
        role="presentation"
      >
        <div className="c-card-scoring-ranking-item__column">
          <div
            className={`c-card-scoring-ranking-item__position c-card-scoring-ranking-item__position--${style}`}
          >
            <span className="c-card-scoring-ranking-item__position-ordinals-1">
              {pos[0]}
            </span>
            <span className="c-card-scoring-ranking-item__position-ordinals">
              {pos[1]}
            </span>
          </div>

          <div className="c-card-scoring-ranking-item__title" title={tagName}>
            {tagName}
          </div>
        </div>

        <div className="c-card-scoring-ranking-item__column">
          <div className="c-card-scoring-ranking-item__score-wrapper">
            <div className="c-card-scoring-ranking-item__score">
              <span
                className={`c-card-scoring-ranking-item__score-number c-card-scoring-ranking-item__score-number--${style}`}
              >
                {getSign(score) + Math.abs(score)}
              </span>
              <div
                data-tip
                data-for={`c-card-scoring-ranking-item-item-${tagId}-${style}`}
              >
                <div className="c-weight-bar">
                  <Line
                    percent={Math.abs(impactScore)}
                    strokeColor={colorBar}
                    showInfo={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="c-card-scoring-ranking-item__column">
          <div className="c-card-scoring-ranking-item__volume">
            <div className="c-card-scoring-ranking-item__volume-number">
              {volumeFormatted}
            </div>
          </div>
        </div>
      </div>
      <Tooltip
        id={`c-card-scoring-ranking-item-item-${tagId}-${style}`}
        borderColor="#bdc3d5"
        border
        backgroundColor="#fff"
        effect="solid"
      >
        <TooltipTag>{tagName}</TooltipTag>
        <TooltipVolume>{impactScore}%</TooltipVolume>
      </Tooltip>
    </>
  );
};

export default CardScoringRankingItem;

// Styles

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
