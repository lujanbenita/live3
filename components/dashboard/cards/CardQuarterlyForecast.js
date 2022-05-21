import { useState, useRef } from "react";

import { useSelector } from "react-redux";
import Highcharts from "highcharts";

import CardSkeletonEmpty from "@/components/dashboard/skeletons/CardSkeletonEmpty";
import OptionsButton from "@/components/common/buttons/OptionsButton";
import ModalInfo from "@/components/common/modal/ModalInfo";
import { exportChart, exportCSV } from "@/utils/exportChart";
import QuarterlyForecastChart from "@/components/charts/QuarterlyForecastChart";

function CardQuarterlyForecast({ title, subtitle, data, onClick, ...props }) {
  const tags = useSelector((state) => state.searchObject.tags);
  const chartData = data.quarterlyForecastData;

  const [isOpenModal, setIsOpenModal] = useState(false);
  const chartComponent = useRef(null);

  if (!chartData?.ranges) {
    return <CardSkeletonEmpty title={title} subtitle={subtitle} />;
  }

  const handleClick = (e) => {
    console.log(e);
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
          <QuarterlyForecastChart
            chartComponent={chartComponent}
            data={chartData}
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
                exportChart(title, tags, null, idPrint);
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
                  null,
                  null,
                  {
                    csv: {
                      columnHeaderFormatter: (item, key) => {
                        if (!item || item instanceof Highcharts.Axis) {
                          return "Quarter";
                        }
                        return {
                          columnTitle:
                            key === "y" ? item.name : `${item.name} (${key})`,
                        };
                      },
                    },
                  }
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

export default CardQuarterlyForecast;
