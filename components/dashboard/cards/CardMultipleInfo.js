import styled from "@emotion/styled";
import { useSelector } from "react-redux";

import { Card } from "components/dashboard/atoms";
import ToneWithCount, {
  POSITIVE_TYPE,
  NEUTRAL_TYPE,
  NEGATIVE_TYPE,
} from "components/dashboard/molecules/ToneWithCount";
import percentSignFormatter from "@/utils/percentSignQuantityFormatter";
import nSignFormatter from "@/utils/numberQuantityFormatter";
import CardHeader from "../atoms/CardHeader";

export default function CardMultipleInfo({ title, subtitle, data, ...props }) {
  const selectedTag = useSelector((state) => state.searchObject?.selectedTag);

  if (data === undefined) {
    return (
      <StyledCard {...props}>
        <CardHeader
          subtitle={selectedTag ? selectedTag.tagName : subtitle}
          title={title}
        />
        <div>
          <ToneWithCount type={POSITIVE_TYPE} main="-" secondary="-" />
          <ToneWithCount type={NEUTRAL_TYPE} main="-" secondary="-" />
          <ToneWithCount type={NEGATIVE_TYPE} main="-" secondary="-" />
          <style jsx>
            {`
              div {
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
            `}
          </style>
        </div>
      </StyledCard>
    );
  }

  const {
    positiveMentionsPercent,
    positiveMentionsPercentChangePercent,
    negativeMentionsPercent,
    negativeMentionsPercentChangePercent,
    neutralMentionsPercent,
    neutralMentionsPercentChangePercent,
    positiveVisibility,
    positiveVisibilityPercentChangePercent,
    negativeVisibility,
    negativeVisibilityPercentChangePercent,
    neutralVisibility,
    neutralVisibilityPercentChangePercent,
  } = data;

  let info = {
    positive: {
      main: "",
      secondary: "",
    },
    negative: {
      main: "",
      secondary: "",
    },
    neutral: {
      main: "",
      secondary: "",
    },
  };

  if (title === "Tone by Visibility") {
    info = {
      positive: {
        main: nSignFormatter(positiveVisibility),
        secondary: percentSignFormatter(positiveVisibilityPercentChangePercent),
      },
      negative: {
        main: nSignFormatter(negativeVisibility),
        secondary: percentSignFormatter(negativeVisibilityPercentChangePercent),
      },
      neutral: {
        main: nSignFormatter(neutralVisibility),
        secondary: percentSignFormatter(neutralVisibilityPercentChangePercent),
      },
    };
  }

  if (title === "Tone by Volume") {
    info = {
      positive: {
        main: `${positiveMentionsPercent}%`,
        secondary: percentSignFormatter(positiveMentionsPercentChangePercent),
      },
      negative: {
        main: `${negativeMentionsPercent}%`,
        secondary: percentSignFormatter(negativeMentionsPercentChangePercent),
      },
      neutral: {
        main: `${neutralMentionsPercent}%`,
        secondary: percentSignFormatter(neutralMentionsPercentChangePercent),
      },
    };
  }

  const { positive, negative, neutral } = info;

  return (
    <StyledCard {...props}>
      <CardHeader
        subtitle={selectedTag ? selectedTag.tagName : subtitle}
        title={title}
      />
      <div>
        <ToneWithCount
          type={POSITIVE_TYPE}
          main={positive.main}
          secondary={positive.secondary}
        />
        <ToneWithCount
          type={NEUTRAL_TYPE}
          main={neutral.main}
          secondary={neutral.secondary}
        />
        <ToneWithCount
          type={NEGATIVE_TYPE}
          main={negative.main}
          secondary={positive.secondary}
        />
        <style jsx>
          {`
            div {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
          `}
        </style>
      </div>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
