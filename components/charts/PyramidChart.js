import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsAccessibility from "highcharts/modules/accessibility";
// import HighchartsCustomEvents from "highcharts-custom-events";

import { FONT_MUSEO_SANS } from "theme";

import { positiveNegativeColors } from "@/utils/colorsSeriesWidgets";
import commonConfig from "./commonConfig";

if (typeof Highcharts === "object") {
  Highcharts.setOptions({
    lang: {
      decimalPoint: ".",
      thousandsSep: ",",
    },
  });
}

if (typeof Highcharts === "object") {
  HighchartsAccessibility(Highcharts);
  // HighchartsCustomEvents(Highcharts);
}

const getMax = (dataArray) => {
  if (dataArray.length === 0) return 0;
  return dataArray[0].sentimentScore;
};

const getMin = (dataArray) => {
  if (dataArray.length === 0) return 0;
  return dataArray[dataArray.length - 1].sentimentScore;
};

const genSeries = (dataArray) => {
  const resSeries = [
    {
      name: [],
      data: [],
    },
  ];

  dataArray.map((el) => {
    resSeries[0].name.push(el.issueTag);
    resSeries[0].data.push({
      y: el.sentimentScore,
      color:
        el.sentimentScore > 0
          ? positiveNegativeColors[0]
          : positiveNegativeColors[1],
    });
    return el;
  });

  return resSeries;
};

// eslint-disable-next-line
const chartOptions = (data, onClick) => ({
  ...commonConfig,
  chart: {
    type: "bar",
    height: 500,
    marginTop: 20,
  },
  title: {
    text: "",
  },
  xAxis: [
    {
      reversed: true,
      labels: {
        enabled: false,
      },
      lineWidth: 0,
      minorGridLineWidth: 0,
      lineColor: "transparent",
      minorTickLength: 0,
      tickLength: 0,
      gridLineWidth: 0,
    },
    {
      opposite: true,
      reversed: true,
      linkedTo: 0,
      labels: {
        enabled: false,
      },
      lineWidth: 0,
      minorGridLineWidth: 0,
      lineColor: "transparent",
      minorTickLength: 0,
      tickLength: 0,
    },
  ],
  yAxis: {
    gridLineWidth: 0,
    visible: true,
    softMax: getMax(data) + getMax(data) / 5,
    softMin: getMin(data) + getMin(data) / 5,
    title: {
      text: "SCORE CONTRIBUTION",
      style: {
        color: "#5a646f",
        fontSize: "10px",
        fontFamily: FONT_MUSEO_SANS,
        fontWeight: "bold",
      },
      y: 10,
    },
    labels: {
      style: {
        color: "#9da6b2",
        fontSize: "10px",
      },
    },
    lineWidth: 1,
    plotLines: [
      {
        value: 0,
        width: 1,
        color: "#bdc3d5",
      },
    ],
  },
  legend: {
    enabled: false,
  },
  plotOptions: {
    series: {
      point: {
        events: {
          click(event) {
            onClick(event.point.dataLabel.textStr);
          },
        },
      },
      cursor: "pointer",
      stacking: "normal",
      dataLabels: {
        textOverflow: "ellipsis", // dont work
        enabled: true,
        inside: false,
        style: {
          color: "#2b2b2b",
          fontSize: "10px",
        },
        formatter() {
          if (this.series.name[this.x] !== undefined) {
            if (this.y === 0) return "";
            return `${this.series.name[this.x]} `;
          }
          if (this.series.name[this.y] !== undefined) {
            if (this.y === 0) return "";
            return `${this.series.name[this.y]} `;
          }
        },
      },
    },
    bar: {
      pointWidth: 10,
    },
  },
  series: genSeries(data),

  tooltip: {
    followPointer: true,
    outside: true,
    style: {
      fontSize: "10px",
      fontFamily: FONT_MUSEO_SANS,
      fontWeight: 500,
    },
    formatter() {
      return `<b>${this.series.name[this.key]}: ${this.y}</b>`;
    },
  },
  // colors: positiveNegativeColors,
});

function PyramidChart(props) {
  const { chartComponent, data, onClick } = props;

  return (
    <HighchartsReact
      highcharts={Highcharts}
      ref={chartComponent}
      options={chartOptions(data, onClick)}
      // constructorType="sunburst"
      // styledMode
    />
  );
}

export default PyramidChart;
