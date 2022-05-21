import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import CompanyAvatar from "@/components/dashboard/atoms/CompanyAvatarCard";

import { setTopics } from "@/redux/searchObject/actions";
import { ordinalSuffixOfSeparated } from "@/utils/ordinalSuffixOf";
import { getSign } from "@/utils/numberSignQuantityFormatter";
import ArrowUpStyled from "@/icons/ArrowUpStyled";
import NeutralStyled from "@/icons/NeutralStyled";
import ArrowDownStyled from "@/icons/ArrowDownStyled";

const getStyle = (value) => {
  let style = "neutral";
  if (value > 0) {
    style = "positive";
  }
  if (value < 0) {
    style = "negative";
  }
  return style;
};

const CardRankingItem = ({ item, isFocus }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { name, logo, rank, rankChange, score, scoreChange, id } = item;
  const img = logo ? `data:image/png;base64,${logo}` : null;
  const pos = ordinalSuffixOfSeparated(rank);
  const rankStyle = getStyle(rankChange);
  const scoreStyle = getStyle(scoreChange);

  let style = "gray";
  if (rank === 1) {
    style = "green";
  }

  if (isFocus) {
    style = "blue";
  }

  const handleClick = () => {
    // router
    //   .push("/reputation-intelligence/feed")
    //   .then(() => dispatch(setTopics(tag)));
  };

  return (
    <>
      <div
        className={`c-card-ranking__item c-card-ranking__item--${style}`}
        onClick={() => handleClick()}
        role="presentation"
      >
        <div
          className={`c-card-ranking__position c-card-ranking__position--${style}`}
        >
          <span className="c-card-ranking__position-ordinals-1">{pos[0]}</span>
          <span className="c-card-ranking__position-ordinals">{pos[1]}</span>
        </div>
        <div>
          <div className="c-card-ranking__logo">
            {img !== null ? (
              <img src={img} alt={name} title={name} />
            ) : (
              <span className="o-avatar">{name ? name[0] : "-"}</span>
            )}
          </div>
        </div>
        <div className="c-card-ranking__content">
          <div className="c-card-ranking__info">
            <div className="c-card-ranking__title">{name}</div>
          </div>

          <div className="c-card-ranking__score">
            <span className="c-card-ranking__score-title">Score: </span>
            {score && (
              <span className="c-card-ranking__score-number">
                {getSign(score) + Math.abs(score)}
              </span>
            )}
            {scoreChange && (
              <span
                className={`c-card-ranking__score-change c-card-ranking__score-change--${scoreStyle}`}
              >
                ({getSign(scoreChange) + Math.abs(scoreChange)})
              </span>
            )}
          </div>
        </div>
        <div>
          <div
            className={`c-card-ranking__rank-change c-card-ranking__rank-change--${rankStyle}`}
          >
            {rankChange > 0 && <ArrowUpStyled />}
            {rankChange === 0 && <NeutralStyled />}
            {rankChange < 0 && <ArrowDownStyled />}
            {rankChange !== 0 && Math.abs(rankChange)}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardRankingItem;
