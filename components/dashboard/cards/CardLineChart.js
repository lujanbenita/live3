import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsExportData from "highcharts/modules/export-data";
import HighchartsCustomEvents from "highcharts-custom-events";

import styled from "@emotion/styled";
import { memo, useRef } from "react";

import { useSelector } from "react-redux";

import Card from "components/dashboard/atoms/Card";
import { FONT_MUSEO_SANS } from "theme";

import { colorDefault } from "@/utils/colorsSeriesWidgets";
import CardHeader from "../atoms/CardHeader";
import commonConfig from "../../charts/commonConfig";
import { getDateFromGraphs } from "../../../utils/getDateFromGraphs";
import getFormatTypeDate from "../../../utils/getFormatTypeDate";
import OptionsButton from "../../common/buttons/OptionsButton";
import { exportChart, exportCSV } from "../../../utils/exportChart";
import CardSkeletonEmpty from "../skeletons/CardSkeletonEmpty";

if (typeof Highcharts === "object") {
  Highcharts.setOptions({
    lang: {
      decimalPoint: ".",
      thousandsSep: ",",
    },
  });
  HighchartsExporting(Highcharts);
  HighchartsExportData(Highcharts);
  HighchartsCustomEvents(Highcharts);
}

const formatLabel = function formatLabel() {
  return `
    <span class="c-legend__item-wrapper">
      <span class="c-legend__circle" 
        style="background-image: linear-gradient(225deg, ${this.color.stops[0][1]}, ${this.color.stops[1][1]});"></span>
      <span class="c-legend__item-text">${this.name}</span>
    </span>
  `;
};

const genSeries = (data) =>
  data.map(({ tagName, intervals }) => ({
    name: tagName,
    data: intervals.map(({ amplification }) => Math.round(amplification)),
  }));

const genCategories = (data) =>
  data[0]?.intervals.map(({ datePeriod }) => getFormatTypeDate(datePeriod));

const genExportCategories = (data) =>
  data[0].intervals.map(({ datePeriod }) => datePeriod);

const chartOptions = (data, onClick, labelClick, legendClick) => ({
  ...commonConfig,
  chart: {
    type: "spline",
  },
  colors: colorDefault,
  title: {
    text: "",
  },
  subtitle: {
    text: "",
  },
  xAxis: {
    categories: genCategories(data),
    labels: {
      format: "{value}",
      style: {
        color: "#9da6b2",
        fontSize: "10px",
        cursor: "pointer",
      },
      events: {
        click(e) {
          e.preventDefault();
          if (labelClick) {
            // eslint-disable-next-line react/no-this-in-sfc
            labelClick(this.value);
          }
        },
      },
    },
    maxPadding: 0.05,
    showLastLabel: true,
  },
  yAxis: {
    title: {
      text: "VISIBILITY",
      style: {
        color: "#5a646f",
        fontSize: "10px",
        fontFamily: FONT_MUSEO_SANS,
        fontWeight: "bold",
      },
    },
    labels: {
      style: {
        color: "#9da6b2",
        fontSize: "10px",
      },
    },
    lineWidth: 1,
  },
  tooltip: {
    headerFormat: "<b>{series.name}</b><br/>",
    pointFormat: "{point.y}",
  },
  legend: {
    symbolHeight: 0.0,
    symbolWidth: 0.0,
    symbolRadius: 0.0,
    useHTML: true,
    labelFormatter: formatLabel,
  },
  plotOptions: {
    series: {
      cursor: "pointer",
      label: {
        connectorAllowed: false,
      },
      marker: {
        fillColor: "#FFFFFF",
        lineWidth: 3,
        lineColor: null, // inherit from series
        symbol: "circle",
      },
      point: {
        events: {
          click(e) {
            onClick(e.point);
          },
        },
      },
      events: {
        legendItemClick(event) {
          event.preventDefault();
          if (legendClick) {
            legendClick(event.target.name);
          }
        },
      },
    },
    spline: {
      marker: {
        enable: false,
      },
    },
  },
  series: genSeries(data),
});

function CardLineChart({ title, subtitle, onClick, data, ...props }) {
  const dateRange = useSelector((state) => state.searchObject.dateRange);
  const tags = useSelector((state) => state.searchObject.tags);
  const chartComponent = useRef(null);

  if (data.length === 0) {
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

  const legendClick = (selectedTag) => {
    const tag = tags.find((el) => el.tagName === selectedTag);
    setTimeout(() => {
      onClick(tag, null);
    }, 1);
  };

  const labelClick = (dateSelected) => {
    setTimeout(() => {
      const date = getDateFromGraphs(dateRange, dateSelected);
      onClick(null, date);
    });
  };

  const idPrint = `print-${Buffer.from(title).toString("base64")}`;

  return (
    <>
      <StyledCard {...props} id={idPrint}>
        <CardHeader subtitle={subtitle} title={title} />
        <HighchartsReact
          highcharts={Highcharts}
          ref={chartComponent}
          options={chartOptions(data, handleClick, labelClick, legendClick)}
          onClick={onClick}
        />
        <div className="c-card__options-wrapper">
          <OptionsButton
            id={`widget-${Buffer.from(title).toString("base64")}`}
            color="#9b9b9b"
            className="c-export-button__chart"
            options={[
              // TODO: add modal info in RI
              /* {
                label: "What is this?",
                action: () => {
                  setIsOpenModal(true);
                },
                icon: "info",
              }, */
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
                    genExportCategories(data)
                  );
                },
                icon: "download-icon",
              },
            ]}
          />
        </div>
      </StyledCard>

      {/*   
      // TODO: add modal info in RI   
      <ModalInfo
        open={isOpenModal}
        onClose={() => {
          setIsOpenModal(false);
        }}
        message={`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`}
        acceptLabel="Done"
      /> */}
    </>
  );
}

// export default CardLineChart;

function areEqual(prevProps, nextProps) {
  // Works when you have objects without methods and DOM nodes inside>
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
}

export default memo(CardLineChart, areEqual);

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 450px;
  height: 450px;
  overflow: hidden;
  position: relative;
`;
