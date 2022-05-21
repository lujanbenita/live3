import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartStock from "highcharts/modules/stock";
import HighchartsCustomEvents from "highcharts-custom-events";

import { FONT_MUSEO_SANS } from "theme";

import { positiveNeutralNegativeColors } from "@/utils/colorsSeriesWidgets";
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
  HighchartStock(Highcharts);
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

const genSeries = (data) => {
  const nameLabels = ["Positive", "Neutral", "Negative"];

  const series = nameLabels.map((label) => ({
    name: label,
    data: data.map((value) => {
      if (label === "Positive") {
        return value.positiveVolume;
      }
      if (label === "Neutral") {
        return value.neutralVolume;
      }
      return value.negativeVolume;
    }),
  }));

  return series;
};

const genCategories = (data) => {
  const resData = data.map((el) => el.issueTag);
  return resData;
};

// eslint-disable-next-line
const chartOptions = (data, onClick) => ({
  ...commonConfig,
  chart: {
    type: "bar",
    height: 550,
    marginTop: 20,
  },
  title: {
    text: "",
  },
  xAxis: {
    categories: genCategories(data),
    title: {
      text: "",
    },
    labels: {
      style: {
        color: "#2b2b2b",
        fontSize: "10px",
        cursor: "pointer",
        fontFamily: FONT_MUSEO_SANS,
      },
      events: {
        click() {
          onClick(null, this.value);
        },
      },
    },
  },
  yAxis: {
    min: 0,
    lineWidth: 1,
    gridLineWidth: 0,
    plotLines: [
      {
        color: "#bdc3d5",
        width: 1,
        value: 0,
      },
    ],
    title: {
      text: "VOLUME",
      align: "low",
      y: 35,
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
        fontWeight: 500,
      },
    },
  },
  legend: {
    symbolHeight: 0.0001,
    symbolWidth: 0.0001,
    symbolRadius: 0.0001,
    useHTML: true,
    align: "right",
    labelFormatter: formatLabel,
    itemStyle: {
      fontFamily: FONT_MUSEO_SANS,
    },
  },
  plotOptions: {
    series: {
      stacking: "normal",
      cursor: "pointer",
      borderWidth: 0,
      point: {
        events: {
          click(event) {
            onClick(event.point.series.name, event.point.category);
          },
        },
      },
      events: {
        legendItemClick(event) {
          event.preventDefault();
          onClick(this.name);
        },
      },
      label: {
        enabled: false,
      },
    },
    bar: {
      pointWidth: 10,
    },
  },
  series: genSeries(data),

  tooltip: {
    outside: true,
    style: {
      fontSize: "10px",
      fontFamily: FONT_MUSEO_SANS,
      fontWeight: 500,
    },
    formatter() {
      return `${this.x} ${this.series.name} | <b>${this.y}</b>`;
    },
  },
  colors: positiveNeutralNegativeColors,
});

function TopIssuesByVolumeChart(props) {
  const { chartComponent, data, onClick } = props;

  return (
    <HighchartsReact
      highcharts={Highcharts}
      ref={chartComponent}
      options={chartOptions(data, onClick)}
      // constructorType="bar"
      // styledMode
    />
  );
}

export default TopIssuesByVolumeChart;
