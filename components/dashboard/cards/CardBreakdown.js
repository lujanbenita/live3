import styled from "@emotion/styled";
import { memo, useRef } from "react";
import { useSelector } from "react-redux";

import { colorDefault } from "@/utils/colorsSeriesWidgets";
import Highcharts from "highcharts";

import { FONT_MUSEO_SANS } from "theme";

import HighchartsReact from "highcharts-react-official";
import HighchartStock from "highcharts/modules/stock";

import Card from "components/dashboard/atoms/Card";

import commonConfig from "@/components/charts/commonConfig";
import CardHeader from "../atoms/CardHeader";
import OptionsButton from "../../common/buttons/OptionsButton";
import { exportChart, exportCSV } from "../../../utils/exportChart";
import CardSkeletonEmpty from "../skeletons/CardSkeletonEmpty";

if (typeof Highcharts === "object") {
  HighchartStock(Highcharts);
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

const genSeries = (chartData) => {
  const intervals = [
    {
      name: "Positive",
      color: {
        linearGradient: {
          x1: 0,
          x2: 0,
          y1: 1,
          y2: 0,
        },
        stops: [
          [0, "#008a19"],
          [1, "#75d48e"],
        ],
      },
    },
    {
      name: "Neutral",
      color: {
        linearGradient: {
          x1: 0,
          x2: 0,
          y1: 1,
          y2: 0,
        },
        stops: [
          [0, "#cccccc"],
          [1, "#ebebeb"],
        ],
      },
    },
    {
      name: "Negative",
      color: {
        linearGradient: {
          x1: 0,
          x2: 0,
          y1: 1,
          y2: 0,
        },
        stops: [
          [0, "#ee295c"],
          [1, "#ff8494"],
        ],
      },
    },
  ];

  return intervals.map((intervalSettings) => ({
    name: intervalSettings.name,
    color: intervalSettings.color,
    data: chartData?.map(
      (tag) =>
        tag.intervals
          ?.filter(
            (interval) =>
              interval.tone.toLowerCase() ===
              intervalSettings.name.toLowerCase()
          )
          ?.map((interval) => interval.articleCount)[0]
    ),
  }));
};

const genCategories = (data) => {
  const categoriesData = data.map(({ tagName }) => tagName);
  return categoriesData;
};

const chartOptions = (data, onClick, labelClick, legendClick) => ({
  ...commonConfig,
  colors: colorDefault,
  chart: {
    type: "column",
    style: {
      fontFamily: FONT_MUSEO_SANS,
      fontWeight: 500,
      fontSize: "10px",
    },
  },
  title: {
    text: "",
  },
  xAxis: {
    categories: genCategories(data),
    labels: {
      style: {
        color: "#9da6b2",
        fontSize: "10px",
        fontWeight: "bold",
        cursor: "pointer",
      },
      events: {
        click(e) {
          e.preventDefault();
          if (legendClick) {
            // eslint-disable-next-line react/no-this-in-sfc
            legendClick(this.value);
          }
        },
      },
    },
  },
  yAxis: {
    // reversedStacks,
    title: {
      text: "VOLUME",
      style: {
        fontWeight: 500,
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
    pointFormat: `<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br />`,
    shared: true,
    style: {
      fontWeight: 500,
    },
  },
  legend: {
    symbolHeight: 0.0001,
    symbolWidth: 0.0001,
    symbolRadius: 0.0001,
    useHTML: true,
    labelFormatter: formatLabel,
  },
  plotOptions: {
    series: {
      cursor: "pointer",
      stacking: "normal",
      label: {
        // connectorAllowed: false,
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
          if (labelClick) {
            labelClick(event.target.name);
          }
        },
      },
    },
    spline: {
      marker: {
        //  enable: false,
      },
    },
  },
  series: genSeries(data, genSeries),
});

function CardBreakdown({ title, subtitle, data, onClick, ...props }) {
  const { dateRange } = useSelector((state) => state.searchObject);
  const tags = useSelector((state) => state.searchObject.tags);
  const chartComponent = useRef(null);

  if (data.length === 0) {
    return <CardSkeletonEmpty title={title} subtitle={subtitle} />;
  }

  const handleClick = ({ category, series }) => {
    const tag = tags.find((el) => el.tagName === category);
    onClick(tag, series.name);
  };

  const labelClick = (tone) => {
    setTimeout(() => {
      onClick(null, tone);
    }, 1);
  };

  const legendClick = (selectedTag) => {
    const tag = tags.find((el) => el.tagName === selectedTag);
    setTimeout(() => {
      onClick(tag, null);
    }, 1);
  };

  const idPrint = `print-${Buffer.from(title).toString("base64")}`;

  return (
    <StyledCard {...props} id={idPrint}>
      <CardHeader subtitle={subtitle} title={title} />
      <div style={{ marginTop: "10px" }}>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions(data, handleClick, labelClick, legendClick)}
          ref={chartComponent}
          onClick={onClick}
        />
      </div>

      <div className="c-card__options-wrapper">
        <OptionsButton
          id={idPrint}
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
                exportCSV(chartComponent.current.chart, title, tags, dateRange);
              },
              icon: "download-icon",
            },
          ]}
        />
      </div>
    </StyledCard>
  );
}

// export default CardBreakdown;

function areEqual(prevProps, nextProps) {
  // Works when you have objects without methods and DOM nodes inside>
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
}

export default memo(CardBreakdown, areEqual);

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 450px;
  height: 450px;
  overflow: hidden;
  position: relative;
  font-family: "Museo Sans";
`;
