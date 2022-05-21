import { useState } from "react";

import { useSelector } from "react-redux";

import CardSkeletonEmpty from "@/components/dashboard/skeletons/CardSkeletonEmpty";
import OptionsButton from "@/components/common/buttons/OptionsButton";
import ModalInfo from "@/components/common/modal/ModalInfo";
import CardScoringRankingItem from "@/components/dashboard/items/CardScoringRankingItem";
import { exportChart } from "@/utils/exportChart";

// import positiveMockData from "@/data/mocks/topPositiveTopics.json";
// import negativeMockData from "@/data/mocks/topNegativeTopics.json";

function CardScoringRanking({ title, subtitle, data, ...props }) {
  const dateRange = useSelector((state) => state.searchObject.dateRange);
  const tags = useSelector((state) => state.searchObject.tags);
  // const cardData = data;
  const [isOpenModal, setIsOpenModal] = useState(false);

  if (data.length === 0) {
    return <CardSkeletonEmpty title={title} subtitle={subtitle} />;
  }
  const idPrint = `print-${Buffer.from(title).toString("base64")}`;

  return (
    <div className="c-card c-card--big" id={idPrint}>
      <div className="c-card__header">
        {subtitle && <div className="c-card__subtitle">{subtitle}</div>}
        <div className="c-card__title">{title}</div>
      </div>
      <div className="c-card__body">
        <div className="c-card-ranking">
          <div className="c-card-ranking__separator"></div>
          <div className="c-card-ranking__header">
            <div className="c-card-ranking__th"></div>
            <div className="c-card-ranking__th">
              <span className="c-card-ranking__label">
                <span>Score</span>
              </span>
            </div>
            <div className="c-card-ranking__th">
              <span className="c-card-ranking__label">
                <span>Volume</span>
              </span>
            </div>
          </div>
          <div
            className="c-card__scroll-container"
            style={{
              height: 325,
              overflowY: "auto",
            }}
          >
            <div className="c-card-ranking__body">
              {data.map((tag) => (
                <CardScoringRankingItem
                  tag={tag}
                  key={tag.tagId}
                  style={props.style}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="c-card__options-wrapper">
        <OptionsButton
          id={`widget-${Buffer.from(title).toString("base64")}`}
          color="#9b9b9b"
          className="c-export-button__chart"
          options={[
            {
              label: "What is this?",
              action: () => {
                setIsOpenModal(true);
              },
              icon: "info",
            },
            {
              label: `Download image`,
              action: () => {
                exportChart(title, tags, dateRange, idPrint);
              },
              icon: "camera",
            },
          ]}
        />
      </div>
      <ModalInfo
        open={isOpenModal}
        onClose={() => {
          setIsOpenModal(false);
        }}
        message={props.modalContent}
      />
    </div>
  );
}

export default CardScoringRanking;
