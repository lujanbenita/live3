import { useState, useRef } from "react";

import Highcharts from "highcharts";

import CardSkeletonEmpty from "@/components/dashboard/skeletons/CardSkeletonEmpty";
import OptionsButton from "@/components/common/buttons/OptionsButton";
import ModalInfo from "@/components/common/modal/ModalInfo";
import { exportChart, exportCSV } from "@/utils/exportChart";
import { useSelector } from "react-redux";
import PyramidChart from "@/components/charts/PyramidChart";

const genExportCategories = (dataRef) => {
  const dataGen = dataRef.xAxis[0].series[0].name;
  return dataGen;
};

function CardMostImpactfulIssues({ title, subtitle, data, onClick, ...props }) {
  const dateRange = useSelector((state) => state.searchObject.dateRange);
  const tags = useSelector((state) => state.searchObject.tags);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const chartComponent = useRef(null);

  if (data.length === 0) {
    return <CardSkeletonEmpty title={title} subtitle={subtitle} />;
  }

  const idPrint = `print-${Buffer.from(title).toString("base64")}`;

  return (
    <div className="c-card" id={idPrint}>
      <div className="c-card__header">
        {subtitle && <div className="c-card__subtitle">{subtitle}</div>}
        <div className="c-card__title">{title}</div>
      </div>
      <div className="c-card__body">
        <div className="c-most-impactful-issues">
          <PyramidChart
            chartComponent={chartComponent}
            data={data}
            onClick={onClick}
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
                  dateRange,
                  genExportCategories(chartComponent.current.chart),
                  {
                    csv: {
                      columnHeaderFormatter: (item, key) => {
                        if (!item || item instanceof Highcharts.Axis) {
                          return "Category";
                        }
                        return {
                          columnTitle: key === "y" ? "Score contribution" : key,
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

export default CardMostImpactfulIssues;
