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

const CardRankingTableItem = ({ item, isFocus }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { name, logo, rank, rankChange, score, scoreChange, id } = item;
  const img = logo ? `data:image/png;base64,${logo}` : null;
  const pos = ordinalSuffixOfSeparated(rank);
  const rankStyle = getStyle(rankChange);
  const scoreStyle = getStyle(scoreChange);

  let style = "gray";

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
        className={`c-card-ranking-table-item__item c-card-ranking-table-item__item--${style}`}
        onClick={() => handleClick()}
        role="presentation"
      >
        <div className="c-card-ranking-table-item__column">
          <div className="c-card-ranking-table-item__position">
            <span className="c-card-ranking-table-item__position-ordinals-1">
              {pos[0]}
            </span>
            <span className="c-card-ranking-table-item__position-ordinals">
              {pos[1]}
            </span>
          </div>
          <div className="c-card-ranking-table-item__logo">
            {img !== null ? (
              <img src={img} alt={name} title={name} />
            ) : (
              <span className="o-avatar">{name ? name[0] : "-"}</span>
            )}
          </div>
          <span className="c-card-ranking-table-item__title">{name}</span>
        </div>

        <div className="c-card-ranking-table-item__column">
          <div className="c-card-ranking-table-item__content">
            <div className="c-card-ranking-table-item__score">
              <div className="c-card-ranking-table-item__score-wrapper">
                {score && (
                  <span className="c-card-ranking-table-item__score-number">
                    {getSign(score) + Math.abs(score)}
                  </span>
                )}
                {scoreChange && (
                  <span
                    className={`c-card-ranking-table-item__score-change c-card-ranking-table-item__score-change--${scoreStyle}`}
                  >
                    ({getSign(scoreChange) + Math.abs(scoreChange)})
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="c-card-ranking-table-item__column">
          <div>
            <div
              className={`c-card-ranking-table-item__rank-change c-card-ranking-table-item__rank-change--${rankStyle}`}
            >
              {rankChange > 0 && <ArrowUpStyled />}
              {rankChange === 0 && <NeutralStyled />}
              {rankChange < 0 && <ArrowDownStyled />}
              {rankChange !== 0 && Math.abs(rankChange)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardRankingTableItem;
