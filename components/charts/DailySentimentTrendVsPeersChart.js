import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsExportData from "highcharts/modules/export-data";

import { FONT_MUSEO_SANS } from "theme";

import { colorDefault } from "@/utils/colorsSeriesWidgets";
import commonConfig from "@/components/charts/commonConfig";
import getFormatTypeDate from "@/utils/getFormatTypeDate";
import { transformRelativeDates } from "@/components/search/searchBar/DatePicker";

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

const formatLabel = function formatLabel() {
  if (this.name === "Selected date range") {
    return `
      <span class="c-legend__item-wrapper">
        <span class="c-legend__square"></span>
        <span class="c-legend__item-text">${this.name}</span>
      </span>
    `;
  }
  return `
      <span class="c-legend__item-wrapper">
        <span class="c-legend__circle" 
          style="background-image: linear-gradient(225deg, ${this.color.stops[0][1]}, ${this.color.stops[1][1]}); opacity: 0.5"></span>
        <span class="c-legend__item-text">${this.name}</span>
      </span>
    `;
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

const genCategories = (data) => data.map(({ date }) => date);
// const genCategories = (data) => data.map(({ date }) => getFormatTypeDate(date));

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

const getDateIndex = (data, day) => {
  if (!data || data.length === 0) {
    return -1;
  }
  const timestampDay = new Date(format(new Date(day), "yyyy-MM-dd")).getTime();
  let key = -1;
  data.map((interval) => {
    if (interval.date === timestampDay) {
      key = interval.date;
    }
  });
  return key;
};

const chartOptions = (data, onClick, labelClick, focusTag, dateRangeValue) => {
  const series = genSeries(data, focusTag);

  const max = getMax(data);
  const min = getMin(data);

  const dateRange = transformRelativeDates(dateRangeValue);

  const minPlotband = getDateIndex(data, dateRange[0]);
  const maxPlotband = getDateIndex(data, dateRange[1]);

  const showPlotband =
    data &&
    data.length > 0 &&
    minPlotband >= 0 &&
    !(
      minPlotband === data[0].date &&
      (maxPlotband === -1 || maxPlotband === data[data.length - 1].date)
    );

  let fromPlotband = 0;
  let toPlotband = 0;

  if (showPlotband) {
    fromPlotband = minPlotband;
    toPlotband = maxPlotband >= 0 ? maxPlotband : data[data.length - 1].date;
    series.push({
      name: "Selected date range",
      connectNulls: false,
      data: [
        /* {
          x: fromPlotband,
          y: min
        }, {
          x: toPlotband,
          y: min,
        } */
      ],
      enableMouseTracking: false,
      includeInDataExport: false,
      skipKeyboardNavigation: true,
      showInLegend: true,
      marker: {
        enabled: false,
      },
    });
  }

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
      plotBands: showPlotband
        ? [
            {
              from: fromPlotband,
              to: toPlotband,
              color: "#F0F5F8",
            },
          ]
        : [],
      labels: {
        // format: "{value}",
        style: {
          color: "#9da6b2",
          fontSize: "10px",
        },
      },
    },
    yAxis: {
      softMax: 2.5,
      softMin: -2.5,
      max,
      min,
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
    series,
  };
};

const DailySentimentTrendVsPeersChart = (props) => {
  const {
    chartComponent,
    data,
    onClick,
    labelClick,
    handleClick,
    focusTag,
    dateRange,
  } = props;
  return (
    <HighchartsReact
      highcharts={Highcharts}
      ref={chartComponent}
      options={chartOptions(data, handleClick, labelClick, focusTag, dateRange)}
      onClick={onClick}
    />
  );
};

export default DailySentimentTrendVsPeersChart;
