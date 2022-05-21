import styled from "@emotion/styled";
import { memo, useState } from "react";
import { useSelector } from "react-redux";

import DonutChart from "components/charts/DonutChart";
import Card from "components/dashboard/atoms/Card";
import ToneWithCountPercent, {
  POSITIVE_TYPE,
  NEUTRAL_TYPE,
  NEGATIVE_TYPE,
} from "components/dashboard/molecules/ToneWithCountPercent";

import CardHeader from "../atoms/CardHeader";
import OptionsButton from "../../common/buttons/OptionsButton";
import { exportChart, exportCSV } from "../../../utils/exportChart";

const donutData = (data) => [
  {
    name: "Positive",
    tooltip: `Positive Tone</br>
      Total: ${data.positive.main}</br>
      Percentage: ${data.positive.secondary}%`,
    y: data.positive.secondary,
    dataLabels: {
      enabled: false,
    },
    type: "Positive",
  },
  {
    name: "Neutral",
    tooltip: `Neutral Tone</br>
      Total: ${data.neutral.main}</br>
      Percentage: ${data.neutral.secondary}%`,
    y: data.neutral.secondary,
    dataLabels: {
      enabled: false,
    },
    type: "Neutral",
  },
  {
    name: "Negative",
    tooltip: `Negative Tone</br>
      Total: ${data.negative.main}</br>
      Percentage: ${data.negative.secondary}%`,
    y: data.negative.secondary,
    dataLabels: {
      enabled: false,
    },
    type: "Negative",
  },
];

const color = (data) => [
  data.positive.color,
  data.neutral.color,
  data.negative.color,
];

function CardDonut({ title, subtitle, info, total, onClick, ...props }) {
  const { positive, negative, neutral } = info;
  const [chart, setChart] = useState(null);

  const selectedTag = useSelector((state) => state.searchObject?.selectedTag);
  const dateRange = useSelector((state) => state.searchObject.dateRange);
  const tags = useSelector((state) => state.searchObject.tags);

  const idPrint = `print-${Buffer.from(title).toString("base64")}`;

  return (
    <StyledCard {...props} id={idPrint}>
      <CardHeader
        title={title}
        subtitle={selectedTag ? selectedTag.tagName : subtitle}
      />

      <StyledCardContent>
        <StyledWrapHr>
          <ToneWithCountPercent
            type={POSITIVE_TYPE}
            main={positive.main}
            secondary={positive.secondary}
          />
          <ToneWithCountPercent
            type={NEUTRAL_TYPE}
            main={neutral.main}
            secondary={neutral.secondary}
          />
          <ToneWithCountPercent
            type={NEGATIVE_TYPE}
            main={negative.main}
            secondary={negative.secondary}
          />
        </StyledWrapHr>
        <DonutChart
          onClick={onClick}
          setChart={setChart}
          data={donutData(info)}
          colors={color(info)}
          total={total}
        />
      </StyledCardContent>

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
                exportCSV(chart.current.chart, title, tags, dateRange);
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
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
}

export default memo(CardDonut, areEqual);

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 450px;
  height: 450px;
  overflow: hidden;
  position: relative;
`;

const StyledCardContent = styled.div`
  align-content: center;
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  height: calc(100% - 35px);
  justify-content: space-around;
`;

const StyledWrapHr = styled.div`
  min-width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > * {
    position: relative;

    &:after {
      content: "";
      background-color: #f1f1f1;
      height: 130px;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(19px, -50%);
      width: 1px;
    }
    &:last-child:after {
      content: "";
      background-color: none;
    }
  }
`;
