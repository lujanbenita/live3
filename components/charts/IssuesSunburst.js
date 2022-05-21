import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from "highcharts/highcharts-more";
import { FONT_MUSEO_SANS } from "theme";

import { sunburstColorsSeries } from "@/utils/colorsSeriesWidgets";
import commonConfig from "./commonConfig";

if (typeof Highcharts === "object") {
  Highcharts.setOptions({
    lang: {
      decimalPoint: ".",
      thousandsSep: ",",
    },
  });
  Highcharts.AST.allowedReferences.push("data:");
  Highcharts.AST.allowedAttributes.push("style");
  Highcharts.AST.allowedTags.push("div");
}

if (typeof Highcharts === "object") {
  HighchartsMore(Highcharts);
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
  if (data.issues.length === 0) return [];
  const series = data.issues.map((topic) => ({
    id: topic.issueTagId,
    name: topic.issueTag,
    data: [topic.competitorsVisibility, topic.targetVisibility],
  }));

  return series;
};

const chartOptions = (data, onClick) => ({
  ...commonConfig,
  chart: {
    type: "column",
    inverted: true,
    polar: true,
    height: 560,
  },
  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 550,
        },
        chartOptions: {
          chart: {
            spacingTop: 0,
            spacingLeft: 0,
            marginBottom: 120,
            height: 560,
          },
          legend: {
            width: 400,
            align: "left",
            verticalAlign: "bottom",
            layout: "horizontal",
            floating: false,
            x: 0,
            y: 0,
          },
          title: {
            text: "",
          },
          subtitle: {
            text: "",
          },
        },
      },
    ],
  },
  title: {
    text: data.htmlTitle,
    align: "center",
    verticalAlign: "bottom",
    useHTML: true,
    style: {
      color: "#FF00FF",
      fontWeight: "bold",
      fontSize: 10,
      fontFamily: FONT_MUSEO_SANS,
    },
  },
  subtitle: {
    useHTML: true,
    text: data.htmlSubtitle,
    align: "center",
    style: {
      height: "calc(100% - 70px)",
      display: "flex",
      textAlign: "center",
      flexDirection: "column",
      justifyContent: "center",
      pointerEvents: "none",
    },
    verticalAlign: "center",
  },
  tooltip: {
    useHTML: true,
    outside: true,
    formatter() {
      return `
          <span class="c-tooltip__row"><span class="c-tooltip__border" 
              style="background-image: linear-gradient(225deg, ${this.color.stops[0][1]}, ${this.color.stops[1][1]});"></span>          
            <span class="c-tooltip__title">${this.series.name}</span>
          </span>
          <span class="c-tooltip__row">
            <span class="c-tooltip__label">${data.name}:</span>&nbsp;<span class="c-tooltip__value">${this.series.yData[1]}%</span>
          </span>
          <span class="c-tooltip__row">
            <span class="c-tooltip__label">Competitors:</span>&nbsp;<span class="c-tooltip__value">${this.series.yData[0]}%</span>
          </span>
        `;
    },
  },
  legend: {
    align: "left",
    verticalAlign: "top",
    layout: "vertical",
    symbolHeight: 0.0001,
    symbolWidth: 0.0001,
    symbolRadius: 0.0001,
    useHTML: true,
    labelFormatter: formatLabel,
    floating: true,
    x: 0,
    y: 40,
    itemDistance: 10,
    margin: 10,
    itemWidth: 120,
  },
  pane: {
    size: "95%",
    innerSize: "40%",
    endAngle: 360,
  },
  xAxis: {
    reversedStacks: true,
    tickInterval: 0,
    lineWidth: 0,
    gridLineWidth: 0,
    labels: {
      enabled: false,
    },
    categories: ["Competitors avg", data.focusTag.tagName],
  },
  yAxis: {
    labels: {
      enabled: false,
    },
    lineWidth: 0,
    tickInterval: 0,
    reversedStacks: false,
    endOnTick: true,
    showLastLabel: true,
    gridLineWidth: 0,
  },
  plotOptions: {
    series: {
      cursor: "pointer",
      events: {
        click() {
          onClick(this.name);
        },
        legendItemClick(event) {
          event.preventDefault();
          onClick(this.name);
        },
      },
      label: {
        enabled: false,
      },
    },
    column: {
      stacking: "normal",
      pointPadding: 0,
      groupPadding: 0.1,
      borderWidth: 1,
    },
  },
  colors: sunburstColorsSeries,
  series: genSeries(data),
});

function IssuesSunburst(props) {
  const { chartComponent, data, onClick } = props;

  return (
    <>
      <HighchartsReact
        highcharts={Highcharts}
        ref={chartComponent}
        options={chartOptions(data, onClick)}
        // constructorType="bar"
        // styledMode
      />
    </>
  );
}

export default IssuesSunburst;
