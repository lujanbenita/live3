import { useEffect, useRef } from "react";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsExportData from "highcharts/modules/export-data";
import commonConfig from "./commonConfig";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
  HighchartsExportData(Highcharts);
}

const DonutChart = ({ setChart, data, colors, total, onClick }) => {
  const chartComponent = useRef(null);

  useEffect(() => {
    setChart(chartComponent);
  }, [chartComponent]);

  const chartOptions = () => ({
    ...commonConfig,
    chart: {
      height: 320,
      style: {
        fontFamily: "Museo Slab",
      },
    },
    colors: colors.map((color) => ({
      radialGradient: {
        cx: 1,
        cy: 0.9,
        r: 1.2,
      },
      stops: [
        [0, color],
        [1, Highcharts.color(color).brighten(0.28).get("rgb")],
      ],
    })),
    title: {
      text: total,
      align: "center",
      verticalAlign: "middle",
      y: 50,
    },
    tooltip: {
      formatter() {
        // eslint-disable-next-line react/no-this-in-sfc
        return this.point.tooltip;
      },
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      series: {
        cursor: "pointer",
      },
      pie: {
        dataLabels: {
          enabled: true,
          distance: -50,
          style: {
            fontWeight: "bold",
            color: "white",
          },
        },
        startAngle: 0,
        endAngle: 0,
        center: ["50%", "50%"],
        size: "288px",
      },
    },
    series: [
      {
        type: "pie",
        innerSize: "190px",
        name: "Volume %",
        data,
        point: {
          events: {
            click() {
              // eslint-disable-next-line react/no-this-in-sfc
              onClick(this.type);
            },
          },
        },
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 310,
          },
        },
      ],
    },
  });

  return (
    <div style={{ width: 320, height: 320 }}>
      <HighchartsReact
        ref={chartComponent}
        highcharts={Highcharts}
        options={chartOptions()}
      />
    </div>
  );
};

export default DonutChart;
