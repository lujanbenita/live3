import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { format } from "date-fns";

import { FONT_MUSEO_SANS } from "theme";

import commonConfig from "@/components/charts/commonConfig";

if (typeof Highcharts === "object") {
  Highcharts.setOptions({
    lang: {
      decimalPoint: ".",
      thousandsSep: ",",
    },
  });
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

  return `<span class="highcharts-tooltip-span"><span style="color:#9da6b2;">${format(
    new Date(this.x),
    "dd/MM/uuuu"
  )} |
        </span> <span style="padding-right:5px;"> <b> ${
          this.series.name
        } </b></span> <span style="color:#9da6b2;"> | </span> 
        <span style="color:${colorY()};"> <b>${signal()}${
    this.y
  }</b></span></span>`;
};

const formatLegend = function formatLegend() {
  if (this.name === "Quarterly reputation") {
    return `
      <span class="c-legend__item-wrapper" style="position: relative; left: 25px; top: 3px; height: 24px; display: block;">
        <span class="c-legend__circle--dotted-green"></span>
        <span class="c-legend__circle--dotted-red"></span>
        <span class="c-legend__item-text" style="position:relative; right:-20px;">${this.name}</span>
      </span>
    `;
  }
  return `
      <span class="c-legend__item-wrapper">
        <span class="c-legend__circle" 
          style="background-image: linear-gradient(225deg, #ff0151, #07cb91); opacity: 0.5"></span>
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

const genSeries = (chartData) => {
  const series = [
    {
      name: "Quarterly reputation",
      data: chartData.map((item) => ({
        x: item.date,
        y: item.reputation,
        dataLabels: {
          enabled: (() => {
            const itemDate = new Date(item.date);
            const lastDayOfMonth = new Date(
              itemDate.getFullYear(),
              itemDate.getMonth() + 1,
              0
            ).getDate();
            const isQuarter = [2, 5, 8, 11].includes(itemDate.getMonth());
            return itemDate.getDate() === lastDayOfMonth && isQuarter;
          })(),
          className: (() => {
            if (item.reputation === 0) return "c-marker c-marker--neutral";
            return item.reputation >= 0
              ? "c-marker c-marker--positive"
              : "c-marker c-marker--negative";
          })(),
          useHTML: true,
          x: -5,
          y: 3,
        },
      })),
      marker: {
        enabled: false,
      },
    },
    {
      name: "Sentiment Trend",
      connectNulls: true,
      dashStyle: "ShortDot",
      lineWidth: 1,
      data: chartData
        .filter((item) => item.trend !== null)
        .map((item) => ({
          x: item.date,
          y: item.trend,
        })),
      marker: {
        enabled: false,
      },
    },
  ];
  return series;
};

const getMaxInSeries = (data, attr) => {
  let max = -100;
  data.map((current) => {
    const maxCurrentValue = current[attr];
    if (max < maxCurrentValue) {
      max = maxCurrentValue;
    }
  });
  return max;
};

const getMinInSeries = (data, attr) => {
  let min = 100;
  data.map((current) => {
    const minCurrentValue = current[attr];
    if (min > minCurrentValue) {
      min = minCurrentValue;
    }
  });
  return min;
};

const getStops = (min, max) => {
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

const chartOptions = (data, onClick, labelClick) => {
  const series = genSeries(data.seriesData);

  return {
    ...commonConfig,
    chart: {
      type: "spline",
      height: 370,
      marginRight: 100,
    },
    colors: [
      {
        linearGradient: {
          x1: 0,
          x2: 0,
          y1: 1,
          y2: 0,
        },
        stops: getStops(
          getMinInSeries(data.seriesData, "reputation"),
          getMaxInSeries(data.seriesData, "reputation")
        ),
      },
      {
        linearGradient: {
          x1: 0,
          x2: 0,
          y1: 1,
          y2: 0,
        },
        stops: getStops(
          getMinInSeries(data.seriesData, "trend"),
          getMaxInSeries(data.seriesData, "trend")
        ),
      },
    ],
    title: {
      text: "",
    },
    subtitle: {
      text: "",
    },
    xAxis: {
      type: "datetime",
      min: data.seriesData.length >= 1 ? data.seriesData[0]?.date : 0,
      labels: {
        style: {
          color: "#9da6b2",
          fontSize: "10px",
        },
        formatter: formatLabel,
      },
      tickPositions: tickPositioner(data.seriesData),
      showLastLabel: true,
    },
    yAxis: {
      max: data.max,
      min: data.min,
      title: {
        text: "Score",
        style: {
          color: "#5a646f",
          fontSize: "10px",
          textTransform: "uppercase",
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
      backgroundColor: "rgba(255,255,255,1)",
      borderColor: "#bdc3d5",
      borderRadius: 5,
      distance: 30,
      className: "highcharts-custom-tooltip",
      useHTML: true,
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
    plotOptions: {
      series: {
        cursor: "pointer",
        lineWidth: 2,
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

const QuarterlyReputationTrendChart = (props) => {
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

export default QuarterlyReputationTrendChart;
