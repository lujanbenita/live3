import Highcharts from "highcharts";
import HighchartsMap from "highcharts/modules/map";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsExportData from "highcharts/modules/export-data";

import commonConfig from "@/components/charts/commonConfig";
import mapData from "@/data/mapData";

if (typeof Highcharts === "object") {
  Highcharts.setOptions({
    lang: {
      decimalPoint: ".",
      thousandsSep: ",",
    },
  });

  HighchartsMap(Highcharts);
  HighchartsExporting(Highcharts);
  HighchartsExportData(Highcharts);
}

const tooltipFormatter = function tooltipFormatter() {
  const colorY = () => {
    if (Math.sign(this.point.value) === 1) return "#008a19";
    if (Math.sign(this.point.value) === -1) return "#ff004c";
    return "#9da6b2";
  };

  const signal = () => {
    if (Math.sign(this.point.value) === 1) return "+";
    return "";
  };

  // eslint-disable-next-line react/no-this-in-sfc
  return `<span style="fontSize="10px">${
    this.point.name
  } &nbsp;</span> <span style="color:#f1f1f1; fontWeight: 900"> | &nbsp;</span> <span style="color:${colorY()};"><b>${signal()}${new Intl.NumberFormat(
    "en-EN"
  ).format(this.point.value)}%</b></span>`;
};

const mapOptions = (data, onClick) => ({
  ...commonConfig,
  chart: {
    height: 370,
    spacing: [0, 0, 0, 0],
    style: {
      fontFamily: "Museo Slab",
    },
  },
  title: "",
  mapNavigation: {
    enabled: true,
    buttonOptions: {
      verticalAlign: "bottom",
      align: "right",
      theme: {
        "stroke-width": 0,
        fill: "transparent",
        style: { "justify-content": "center", "align-items": "center" },
      },
    },
    buttons: {
      zoomIn: {
        text: "+",
        style: {
          fontSize: "20px !important",
          transform: "translate(85%, 86%)",
          border: "1px solid #597d99",
          color: "#597d99",
        },
      },
      zoomOut: {
        text: "-",
        style: {
          fontSize: "20px !important",
          transform: "translate(91%, 86%)",
          color: "#597d99",
        },
      },
    },
  },
  colorAxis: {
    min: -100,
    max: 100,
    minColor: "#ff0151",
    maxColor: "#07cb91",
    stops: [
      [0, "#ff0151"],
      [0.15, "#f5467d"],
      [0.3, "#ed83a4"],
      [0.4, "#e7b9c8"],
      [0.49, "#e2e4e4"],
      [0.5, "#cccccc82"],
      [0.51, "#c9e0d9"],
      [0.7, "#4ad1a9"],
      [1, "#07cb91"],
    ],
    reversed: false,
    // lineColor: "#ffffff",
    // gridLineColor: "#ffffff",
    marker: {
      color: "#2d6ea3",
    },
    // minorGridLineColor: "#ffffff",
    // minorTickColor: "#ffffff",
    // tickColor: "#ffffff",
  },

  plotOptions: {
    series: {
      cursor: "pointer",
      point: {
        events: {
          click(e) {
            onClick(e.point.name);
          },
        },
      },
    },
    map: {
      borderColor: "#ffffff",
      borderWidth: 0.5,
    },
  },
  tooltip: {
    formatter: tooltipFormatter,
    pointFormat: "{point.tooltip}",
    backgroundColor: "#FFF",
    borderColor: "#bdc3d5",
    borderRadius: 5,
  },
  accessibility: {
    point: {
      valueSuffix: "%",
    },
  },

  legend: {
    layout: "vertical",
    floating: true,
    align: "left",
    verticalAlign: "middle",
    padding: 25,
    symbolHeight: 190,
    title: {
      text: "SENTIMENT",
      style: {
        position: "absolute",
        transform: "rotate(-90deg) translate(-165px, 0px)",
        color: "#5a646f",
        fontSize: "10px",
        fontFamily: "Museo Sans",
      },
    },
  },

  series: [
    {
      data,
      mapData,
      name: "Volume",
      joinBy: "name",
      states: {
        hover: {
          color: "#2d6ea3",
        },
      },
      dataLabels: {
        enabled: false,
        format: "{point.name}",
      },
      nullColor: "#cccccc",
    },
  ],

  xAxis: {
    maxPadding: 0.01,
    minPadding: 0.14,
  },

  yAxis: {
    maxPadding: 0.01,
    minPadding: 0.01,
  },
});

const SentimentMap = (props) => {
  const { chartComponent, data, onClick } = props;
  return (
    <HighchartsReact
      highcharts={Highcharts}
      ref={chartComponent}
      options={mapOptions(data, onClick)}
      constructorType="mapChart"
      styledMode
    />
  );
};

export default SentimentMap;
