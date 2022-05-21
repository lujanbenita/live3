import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { FONT_MUSEO_SANS } from "theme";

import commonConfig from "@/components/charts/commonConfig";
import { colorDefault } from "@/utils/colorsSeriesWidgets";
import getFormatTypeDate from "@/utils/getFormatTypeDate";

if (typeof Highcharts === "object") {
  Highcharts.setOptions({
    lang: {
      decimalPoint: ".",
      thousandsSep: ",",
    },
  });
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

const genSeries = (data) => {
  const series = [
    {
      name: "Tag Name",
      data: data.map((item) => [item.date, item.score]),
      type: "line",
      marker: {
        enabled: false,
      },
    },
    {
      name: "Sentiment Trend",
      connectNulls: true,
      data: data
        .filter((item) => item.trend !== null)
        .map((item) => [item.date, item.trend]),
      marker: {
        enabled: false,
      },
    },
  ];
  return series;
};

const genCategories = (data) => data.map(({ date }) => getFormatTypeDate(date));

const chartOptions = (data, onClick, labelClick) => ({
  ...commonConfig,
  chart: {
    type: "spline",
    height: 370,
  },
  colors: [
    {
      linearGradient: {
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 1,
      },
      stops: [
        [0, "#008a19"],
        [1, "#ee295c"],
      ],
    },
    {
      linearGradient: {
        x1: 0,
        x2: 0,
        y1: 1,
        y2: 0,
      },
      stops: [
        [0, "#2d6ea3"],
        [1, "#2d6ea3"],
      ],
    },
  ],
  title: {
    text: "",
  },
  subtitle: {
    text: "",
  },
  xAxis: {
    crosshair: true,
    categories: genCategories(data),
    labels: {
      format: "{value}",
      style: {
        color: "#9da6b2",
        fontSize: "10px",
      },
    },
    maxPadding: 0.05,
    showLastLabel: true,
  },
  yAxis: {
    endOfTick: false,
    softMax: 0,
    softMin: 0,
    title: {
      text: "SENTIMENT",
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
          if (labelClick) {
            labelClick(event.target.name);
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

const DailySentimentTrendChart = (props) => {
  const { chartComponent, data, onClick, labelClick } = props;
  return (
    <HighchartsReact
      highcharts={Highcharts}
      ref={chartComponent}
      options={chartOptions(data, onClick, labelClick)}
      onClick={onClick}
    />
  );
};

export default DailySentimentTrendChart;
