import { memo, useRef } from "react";

import Highcharts from "highcharts";
import HighchartsMap from "highcharts/modules/map";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsExportData from "highcharts/modules/export-data";

import styled from "@emotion/styled";
import { useSelector } from "react-redux";

import Card from "components/dashboard/atoms/Card";
import mapData from "data/mapData";

import CardHeader from "../atoms/CardHeader";
import commonConfig from "../../charts/commonConfig";
import OptionsButton from "../../common/buttons/OptionsButton";
import { exportChart, exportCSV } from "../../../utils/exportChart";
import CardSkeletonEmpty from "../skeletons/CardSkeletonEmpty";

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
  // eslint-disable-next-line react/no-this-in-sfc
  return `${this.point.name}: ${new Intl.NumberFormat("en-EN").format(
    this.point.value
  )}`;
};

const mapOptions = (data, onClick) => ({
  ...commonConfig,
  chart: {
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
    min: 0,
    stops: [
      [0, "#ffffff"],
      [1, "#2d6ea3"],
    ],
    reversed: false,
    lineColor: "#ffffff",
    gridLineColor: "#ffffff",
    marker: {
      color: "#ffffff",
    },
    minorGridLineColor: "#ffffff",
    minorTickColor: "#ffffff",
    tickColor: "#ffffff",
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
      borderColor: "#2d6ea3",
      borderWidth: 0.5,
    },
  },
  tooltip: {
    formatter: tooltipFormatter,
    pointFormat: "{point.tooltip}",
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
    title: {
      text: "VOLUME",
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
          color: "#005fad",
        },
      },
      dataLabels: {
        enabled: false,
        format: "{point.name}",
      },
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

function CardMap({ title, subtitle, data, onClick, ...props }) {
  const selectedTag = useSelector((state) => state.searchObject?.selectedTag);
  const { tags, dateRange } = useSelector((state) => state.searchObject);
  const chartComponent = useRef(null);

  if (data.length === 0) {
    return <CardSkeletonEmpty title={title} subtitle={subtitle} />;
  }

  const seriesData = data.map((country) => ({
    name: country.countryName,
    value: country.articleCount,
  }));

  const idPrint = `print-${Buffer.from(title).toString("base64")}`;

  return (
    <StyledCard {...props} id={idPrint}>
      <CardHeader
        title={title}
        className="c-map__title"
        subtitle={selectedTag ? selectedTag.tagName : subtitle}
      />
      <div style={{ marginTop: "10px" }}>
        <HighchartsReact
          highcharts={Highcharts}
          ref={chartComponent}
          options={mapOptions(seriesData, onClick)}
          constructorType="mapChart"
          styledMode
        />
      </div>
      <div className="c-card__options-wrapper">
        <OptionsButton
          id={`widget-${Buffer.from(title).toString("base64")}`}
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

function areEqual(prevProps, nextProps) {
  // Works when you have objects without methods and DOM nodes inside>
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
}

export default memo(CardMap, areEqual);

const StyledCard = styled(Card)`
  display: flex;
  background: white;
  flex-direction: column;
  justify-content: space-between;
  min-height: 450px;
  padding: 0;
  height: 450px;
  overflow: hidden;
  position: relative;
`;
