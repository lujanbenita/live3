import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartStock from "highcharts/modules/stock";
import styled from "@emotion/styled";
import { memo, useRef } from "react";

import { useSelector } from "react-redux";

import Card from "components/dashboard/atoms/Card";
import { FONT_MUSEO_SANS } from "theme";

import { colorDefault } from "@/utils/colorsSeriesWidgets";
// import { getDateFromGraphs } from "@/utils/getDateFromGraphs";
import getFormatTypeDate from "../../../utils/getFormatTypeDate";
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
}

if (typeof Highcharts === "object") {
  HighchartStock(Highcharts);
}

const formatYAxis = function formatYAxis() {
  const label = this.axis.defaultLabelFormatter.call(this);

  // Use thousands separator for four-digit numbers too
  if (/^[0-9]{4}$/.test(label)) {
    return Highcharts.numberFormat(this.value, 0);
  }
  return label;
};

const formatLabel = function formatLabel() {
  return `
    <span class="c-legend__item-wrapper">
      <span class="c-legend__circle" 
        style="background-image: linear-gradient(225deg, ${this.color.stops[0][1]}, ${this.color.stops[1][1]});"></span>
      <span class="c-legend__item-text">${this.name}</span>
    </span>
  `;
};

const genSeries = (data, seriesLabel) =>
  data.map(({ tagName, intervals }) => ({
    name: tagName,
    data: intervals.map((interval) => Math.round(interval[seriesLabel])),
  }));

const genCategories = (data, categoriesLabel) =>
  data[0]?.intervals.map((interval) => {
    if (categoriesLabel === "datePeriod") {
      return getFormatTypeDate(interval[categoriesLabel]);
    }
    return interval[categoriesLabel];
  });

const chartOptions = (
  data,
  onClick,
  seriesLabel,
  categoriesLabel,
  legendClick,
  labelClick
) => ({
  ...commonConfig,
  chart: {
    type: "column",
    style: {
      fontFamily: FONT_MUSEO_SANS,
      fontWeight: 500,
      fontSize: "10px",
    },
  },
  colors: colorDefault,
  title: {
    text: "",
  },
  subtitle: {
    text: "",
  },
  xAxis: {
    title: {
      enabled: false,
      style: {
        color: "#9da6b2",
      },
    },
    categories: genCategories(data, categoriesLabel),
    labels: {
      format: "{value}",
      style: {
        cursor: "pointer",
        color: "#9da6b2",
        fontSize: "10px",
      },
      events: {
        click(e) {
          e.preventDefault();
          if (labelClick) {
            // eslint-disable-next-line react/no-this-in-sfc
            labelClick(this.value);
          }
        },
      },
    },
    maxPadding: 0.05,
    showLastLabel: true,
  },
  yAxis: {
    title: {
      text: "SOV",
      style: {
        color: "#5a646f",
        fontFamily: FONT_MUSEO_SANS,
        fontWeight: "bold",
      },
    },
    labels: {
      formatter: formatYAxis,
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
    symbolHeight: 0.0001,
    symbolWidth: 0.0001,
    symbolRadius: 0.0001,
    useHTML: true,
    labelFormatter: formatLabel,
    itemStyle: {
      fontSize: "10px",
    },
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
          if (legendClick) {
            legendClick(event.target.name);
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
  series: genSeries(data, seriesLabel),
});

function CardBarSourceChart({
  title,
  subtitle,
  onClick,
  data,
  categoriesLabel = "sourceTypeName",
  seriesLabel = "articleCount",
  ...props
}) {
  const { dateRange, tags } = useSelector((state) => state.searchObject);
  // const [chart, setChart] = useState(null);
  const chartComponent = useRef(null);

  if (data.length === 0) {
    return <CardSkeletonEmpty title={title} subtitle={subtitle} />;
  }

  /* 
  const getDate = (category, options) => {
    if (
      dateRange === "1D" ||
      dateRange[0] === dateRange[1] ||
      JSON.stringify(dateRange[0]) === JSON.stringify(dateRange[1])
    ) {
      return dateRange;
    }

    const articleCount = Math.round(options.y);

    const foundTag = data.filter((item) =>
      item.intervals.some(
        (interval) => articleCount === Math.round(interval.articleCount)
      )
    );

    const date = foundTag[0].intervals.find((interval) =>
      interval.datePeriod.includes(category)
    ).datePeriod;

    return getDateFromGraphs(dateRange, date);
  }; 
  */

  const handleClick = (point) => {
    const { category, series } = point;
    const tag = tags.find((el) => el.tagName === series.name);
    onClick(tag, category);
  };

  const legendClick = (selectedTag) => {
    const tag = tags.find((el) => el.tagName === selectedTag);
    setTimeout(() => {
      onClick(tag, null);
    }, 1);
  };

  const labelClick = (dateSelected) => {
    setTimeout(() => {
      onClick(null, dateSelected);
    });
  };

  const idPrint = `print-${Buffer.from(title).toString("base64")}`;

  return (
    <StyledCard {...props} id={idPrint}>
      <CardHeader subtitle={subtitle} title={title} />
      <div style={{ marginTop: "10px" }}>
        <HighchartsReact
          highcharts={Highcharts}
          ref={chartComponent}
          options={chartOptions(
            data,
            handleClick,
            seriesLabel,
            categoriesLabel,
            legendClick,
            labelClick
          )}
          onClick={onClick}
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

export default memo(CardBarSourceChart, areEqual);

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 450px;
  height: 450px;
  overflow: hidden;
  position: relative;
`;
