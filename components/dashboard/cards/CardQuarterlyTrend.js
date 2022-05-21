import { useState, useRef } from "react";

import { useSelector } from "react-redux";

import CardSkeletonEmpty from "@/components/dashboard/skeletons/CardSkeletonEmpty";
import OptionsButton from "@/components/common/buttons/OptionsButton";
import ModalInfo from "@/components/common/modal/ModalInfo";
import QuarterlyReputationVsPeersChart from "@/components/charts/QuarterlyReputationVsPeersChart";
import { exportChart, exportCSV } from "@/utils/exportChart";
import { getDateFromGraphs } from "@/utils/getDateFromGraphs";

/* const genExportCategories = (data) =>
  data[0].intervals.map(({ datePeriod }) => datePeriod); */

function CardQuarterlyTrend({ title, subtitle, data, onClick, ...props }) {
  const dateRange = useSelector((state) => state.searchObject.dateRange);
  const tags = useSelector((state) => state.searchObject.tags);
  const focusTag = useSelector((state) => state.searchObject.selectedTag);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const chartComponent = useRef(null);

  if (!data || data?.length === 0) {
    return <CardSkeletonEmpty title={title} subtitle={subtitle} />;
  }

  const handleClick = ({ category, options, series }) => {
    const tag = tags.find((el) => el.tagName === series.name);

    if (
      dateRange === "1D" ||
      dateRange[0] === dateRange[1] ||
      JSON.stringify(dateRange[0]) === JSON.stringify(dateRange[1])
    ) {
      onClick(tag, dateRange);
      return;
    }

    const amplification = Math.round(options.y);

    const foundTag = data.filter((item) =>
      item.intervals.some(
        (interval) => amplification === Math.round(interval.amplification)
      )
    );

    const date = foundTag[0].intervals.find((interval) =>
      interval.datePeriod.includes(category)
    ).datePeriod;

    const formattedDate = getDateFromGraphs(dateRange, date);

    onClick(tag, formattedDate);
  };

  const idPrint = `print-${Buffer.from(title).toString("base64")}`;
  return (
    <div className="c-card c-card--big" id={idPrint}>
      <div className="c-card__header">
        {subtitle && <div className="c-card__subtitle">{subtitle}</div>}
        <div className="c-card__title">{title}</div>
      </div>
      <div className="c-card__body">
        <div className="c-card-daily-line">
          <QuarterlyReputationVsPeersChart
            chartComponent={chartComponent}
            focusTag={focusTag}
            data={data}
            dateRange={dateRange}
            handleClick={handleClick}
          />
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
            {
              label: `Download data`,
              action: () => {
                exportCSV(
                  chartComponent.current.chart,
                  title,
                  tags,
                  dateRange
                  // genExportCategories(data)
                );
              },
              icon: "download-icon",
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

export default CardQuarterlyTrend;
