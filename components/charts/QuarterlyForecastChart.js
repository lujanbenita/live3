import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsExportData from "highcharts/modules/export-data";
import { FONT_MUSEO_SANS } from "theme";

import { forecastGradientColors } from "@/utils/colorsSeriesWidgets";
import commonConfig from "@/components/charts/commonConfig";

if (typeof Highcharts === "object") {
  Highcharts.setOptions({
    lang: {
      decimalPoint: ".",
      thousandsSep: ",",
    },
  });
  HighchartsExporting(Highcharts);
  HighchartsExportData(Highcharts);
}

const formatLegend = function formatLegend() {
  return `
    <span class="c-legend__item-wrapper" style="position: relative; left: 25px; top: 3px; height: 24px; display: block;">
      <span class="c-legend__circle--dotted-green"></span>
      <span class="c-legend__circle--dotted-red"></span>
      <span class="c-legend__item-text" style="position:relative; right:-20px;">${this.name}</span>
    </span>
    `;
};

const getStops = (data) => {
  const min = data[0][1] < data[1][1] ? data[0][1] : data[1][1];
  const max = data[0][1] >= data[1][1] ? data[0][1] : data[1][1];

  if (min > 0) {
    return [
      [0, "#c9e0d9"],
      [1, "#07cb91"],
    ];
  }
  if (max < 0) {
    return [
      [0, "#ff0151"],
      [1, "#ed83a4"],
    ];
  }
  const intervalLength = -(min - max);
  const zeroStop = (-min * 100) / intervalLength / 100;

  return [
    [0, "#ff0151"],
    [zeroStop - 0.1, "#ed83a4"],
    [zeroStop, "#cccccc82"],
    [zeroStop + 0.1, "#c9e0d9"],
    [1, "#07cb91"],
  ];
};

const labelFormatter = function labelFormatter() {
  let className = "c-side-marker--neutral";
  if (this.y > 0) className = "c-side-marker--positive";
  if (this.y < 0) className = "c-side-marker--negative";
  const classNameSpan = `c-side-marker ${className}`;
  return `<span class="${classNameSpan}">${this.y}</span>`;
};

const genSeries = (originalData) => {
  const series = [];

  originalData.ranges.map((range, index) => {
    series.push({
      type: "arearange",
      name: `${
        index === 0 ? "Max range prediction" : "Medium range prediction"
      }`,
      showInLegend: false,
      data: range.map((item, itemIdex) => {
        const result = {
          x: itemIdex,
          low: item[1],
          high: item[2],
          dataLabels: {
            enabled: (() => itemIdex === 1)(),
            formatter: labelFormatter,
            align: "left",
            useHTML: true,
            allowOverlap: true,
            padding: 0,
            verticalAlign: "middle",
            x: -5,
            y: 3,
          },
        };
        return result;
      }),
      lineWidth: 0,
      color: forecastGradientColors[index],
      marker: {
        enabled: false,
      },
      trackByArea: false,
      fillOpacity: 0.3,
      zIndex: 0,
    });
  });

  series.push({
    type: "line",
    name: "Reputation prediction",
    data: originalData.line.map((item, index) => {
      const basicDataLabelsConfig = {
        enabled: true,
        useHTML: true,
      };
      const dataLabels =
        index === 0
          ? {
              ...basicDataLabelsConfig,
              className: (() => {
                if (item[1] === 0) return "c-marker c-marker--neutral";
                return item[1] >= 0
                  ? "c-marker c-marker--positive"
                  : "c-marker c-marker--negative";
              })(),
              x: -7,
              y: 0,
            }
          : {
              ...basicDataLabelsConfig,
              formatter: labelFormatter,
              align: "left",
              useHTML: true,
              allowOverlap: true,
              padding: 0,
              verticalAlign: "middle",
              x: -5,
              y: 3,
            };
      return {
        x: index,
        y: item[1],
        dataLabels,
      };
    }),
    color: {
      linearGradient: {
        x1: 0,
        x2: 0,
        y1: 1,
        y2: 0,
      },
      stops: getStops(originalData.line),
    },
    marker: {
      enabled: false,
    },
  });

  return series;
};

const chartOptions = (data, onClick, labelClick) => ({
  ...commonConfig,
  chart: {
    height: 370,
    marginRight: 100,
  },
  title: {
    text: "",
  },
  subtitle: {
    text: "",
  },
  xAxis: {
    type: "category",
    categories: data.categories, // genCategories(data),
    labels: {
      format: "{value}",
      align: "center",
      style: {
        color: "#9da6b2",
        fontSize: "10px",
      },
    },
    showLastLabel: true,
    plotLines: [
      {
        value: 0,
        color: "#bdc3d5",
        dashStyle: "ShortDot",
        width: 1,
      },
      {
        value: 1,
        color: "#bdc3d5",
        dashStyle: "ShortDot",
        width: 1,
      },
    ],
  },
  legend: {
    symbolHeight: 0.0,
    symbolWidth: 0.0,
    symbolRadius: 0.0,
    useHTML: true,
    className: "c-legend-wrapper",
    itemWidth: 160,
    labelFormatter: formatLegend,
  },
  yAxis: {
    max: data.max,
    min: data.min,
    lineWidth: 1,
    title: {
      text: "REPUTATION",
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
    plotLines:
      data.min < 0 && data.max > 0
        ? [
            {
              value: 0,
              color: "#bdc3d5",
              dashStyle: "ShortDot",
              width: 1,
            },
          ]
        : [],
  },
  tooltip: {
    backgroundColor: "rgba(255,255,255,1)",
    borderColor: "#bdc3d5",
    borderRadius: 5,
    distance: 30,
    className: "highcharts-custom-tooltip",
    useHTML: true,
  },
  series: genSeries(data),
});

const QuarterlyForecastChart = (props) => {
  const { chartComponent, data, onClick, labelClick, handleClick } = props;
  return (
    <HighchartsReact
      highcharts={Highcharts}
      ref={chartComponent}
      options={chartOptions(data, handleClick, labelClick)}
      onClick={onClick}
    />
  );
};

export default QuarterlyForecastChart;
