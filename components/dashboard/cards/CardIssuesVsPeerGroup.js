import { useState, useRef } from "react";

import Highcharts from "highcharts";

import CardSkeletonEmpty from "@/components/dashboard/skeletons/CardSkeletonEmpty";
import OptionsButton from "@/components/common/buttons/OptionsButton";
import ModalInfo from "@/components/common/modal/ModalInfo";
import IssuesSunburst from "@/components/charts/IssuesSunburst";
import { exportChart, exportCSV } from "@/utils/exportChart";
import { useSelector } from "react-redux";
import nFormatter from "@/utils/numberQuantityFormatter";

function CardIssuesVsPeerGroup({ title, subtitle, data, onClick, ...props }) {
  const dateRange = useSelector((state) => state.searchObject.dateRange);
  const tags = useSelector((state) => state.searchObject.tags);
  const focusTag = useSelector((state) => state.searchObject.selectedTag);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const chartComponent = useRef(null);

  if (data.issues === undefined) {
    return <CardSkeletonEmpty title={title} subtitle={subtitle} />;
  }

  const idPrint = `print-${Buffer.from(title).toString("base64")}`;

  const chartData = data;

  chartData.focusTag = focusTag;
  chartData.htmlTitle =
    '<div><div style="color: #9da6b2; font-size: 10px">OUTER CIRCLE</div><div style="color: #5a646f; font-size: 12px">Competitors avg.</div></div>';
  chartData.htmlSubtitle = `<div class="c-issues-vs-peer-group__inner-circle">
      <img class="c-issues-vs-peer-group__logo" src="${
        data.logo ? `data:image/png;base64,${data.logo}` : null
      }" />
      <div class="c-issues-vs-peer-group__inner-title">INNER CIRCLE</div>
      <div class="c-issues-vs-peer-group__company">${data.name}</div>
      <div class="c-issues-vs-peer-group__visibility">
        Total visibility: <span>${nFormatter(data.totalVisibility, 1)}</span>
      </div>
    </div>`;

  return (
    <div className="c-card" id={idPrint}>
      <div className="c-card__header">
        {subtitle && <div className="c-card__subtitle">{subtitle}</div>}
        <div className="c-card__title">{title}</div>
      </div>
      <div className="c-card__body">
        <div className="c-issues-vs-peer-group">
          <IssuesSunburst
            chartComponent={chartComponent}
            data={chartData}
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
                  null,
                  {
                    csv: {
                      columnHeaderFormatter: (item, key) => {
                        if (!item || item instanceof Highcharts.Axis) {
                          return "Peer group";
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

export default CardIssuesVsPeerGroup;
