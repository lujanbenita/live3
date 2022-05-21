import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsExportData from "highcharts/modules/export-data";

import { FONT_MUSEO_SANS } from "theme";

import { colorDefault } from "@/utils/colorsSeriesWidgets";
import commonConfig from "@/components/charts/commonConfig";

import { format } from "date-fns";

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

const formatterTooltip = function formatterTooltip() {
  const colorY = () => {
    if (Math.sign(this.y) === 1) return "#008a19";
    if (Math.sign(this.y) === -1) return "#ff004c";
    return "#9da6b2";
  };

  const signal = () => {
    if (Math.sign(this.y) === 1) return "+";
    return "";
  };

  return `<span style="color:#9da6b2;">${format(
    new Date(this.x),
    "dd/MM/uuuu"
  )} |
        </span> <span style="padding-right:5px;"> <b> ${
          this.series.name
        } </b></span>
        <span style="color:${colorY()};"> <b>${signal()}${this.y}</b></span>`;
};

const formatLegend = function formatLegend() {
  return `
      <span class="c-legend__item-wrapper">
        <span class="c-legend__circle" 
          style="background-image: linear-gradient(225deg, ${this.color.stops[0][1]}, ${this.color.stops[1][1]}); opacity: 0.5"></span>
        <span class="c-legend__item-text">${this.name}</span>
      </span>
    `;
};

const formatLabel = function formatLabel() {
  const date = new Date(this.value);
  const year = date.getFullYear();
  const quarter = (date.getMonth() + 1) / 3;
  return `Q${quarter} ${year}`;
};

const tickPositioner = (data) => {
  const positions = [];
  data.map((item) => {
    const itemDate = new Date(item.date);
    const lastDayOfMonth = new Date(
      itemDate.getFullYear(),
      itemDate.getMonth() + 1,
      0
    ).getDate();
    const isQuarter = [2, 5, 8, 11].includes(itemDate.getMonth());
    if (itemDate.getDate() === lastDayOfMonth && isQuarter) {
      positions.push(item.date);
    }
  });
  return positions;
};

const genSeries = (originalData, focusTag) => {
  const keys = [...new Set(Array.from(originalData, (item) => item.name))];
  return keys.map((name) => ({
    name,
    connectNulls: true,
    data: originalData
      .filter((originalItem) => originalItem.name === name)
      .map((originalItem) => ({
        x: originalItem.date,
        y: originalItem.score,
      })),
    lineWidth: focusTag.tagName === name ? 2 : 1,
    // shadow: (focusTag.tagName === name),
    marker: {
      enabled: false,
    },
  }));
};

const getMax = (data) => {
  let max = -100;
  data.map((current) => {
    const maxCurrentValue =
      current.trend > current.score ? current.trend : current.score;
    if (max < maxCurrentValue) {
      max = maxCurrentValue;
    }
  });
  max = max + 2.5 < 100 ? max + 2.5 : 100;
  return max;
};

const getMin = (data) => {
  let min = 100;
  data.map((current) => {
    const minCurrentValue =
      current.trend < current.score ? current.trend : current.score;
    if (min > minCurrentValue) {
      min = minCurrentValue;
    }
  });
  min = min - 2.5 > -100 ? min - 2.5 : -100;
  return min;
};

const chartOptions = (data, onClick, labelClick, focusTag) => {
  const series = genSeries(data, focusTag);

  const max = getMax(data);
  const min = getMin(data);

  return {
    ...commonConfig,
    chart: {
      type: "spline",
      height: 370,
      marginRight: 100,
    },
    colors: colorDefault,
    title: {
      text: "",
    },
    subtitle: {
      text: "",
    },
    xAxis: {
      type: "datetime",
      min: data.length >= 1 ? data[0]?.date : 0,
      showLastLabel: true,
      labels: {
        formatter: formatLabel,
        style: {
          color: "#9da6b2",
          fontSize: "10px",
        },
      },
      tickPositions: tickPositioner(data),
    },
    yAxis: {
      softMax: 2.5,
      softMin: -2.5,
      max,
      min,
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
      plotLines: [
        {
          value: 0,
          color: "#bdc3d5",
          dashStyle: "ShortDot",
          width: 1,
          label: {
            text: "Neutral",
            align: "right",
            x: 60,
            style: {
              color: "#bdc3d5",
              fontSize: "9px",
              backgroundColor: "#d8d8d833",
              textTransform: "uppercase",
              borderRadius: "10px",
              padding: "0 5px",
            },
            useHTML: true,
          },
        },
      ],
      lineWidth: 1,
    },
    tooltip: {
      formatter: formatterTooltip,
      backgroundColor: "#FFF",
      borderColor: "#bdc3d5",
      borderRadius: 5,
      stickOnContact: true,
    },
    legend: {
      symbolHeight: 0.0,
      symbolWidth: 0.0,
      symbolRadius: 0.0,
      useHTML: true,
      labelFormatter: formatLegend,
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
    series,
  };
};

const QuarterlyReputationVsPeersChart = (props) => {
  const { chartComponent, data, onClick, labelClick, handleClick, focusTag } =
    props;
  return (
    <HighchartsReact
      highcharts={Highcharts}
      ref={chartComponent}
      options={chartOptions(data, handleClick, labelClick, focusTag)}
      onClick={onClick}
    />
  );
};

export default QuarterlyReputationVsPeersChart;
