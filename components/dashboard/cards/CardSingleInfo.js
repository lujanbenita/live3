import styled from "@emotion/styled";
import { useSelector } from "react-redux";

import ToneWithValue from "components/dashboard/molecules/ToneWithValue";
import { Card } from "components/dashboard/atoms";
import { TITLE_COLOR, FONT_MUSEO_SLAB } from "theme";

import nFormatter from "@/utils/numberQuantityFormatter";
import CardHeader from "../atoms/CardHeader";

import { checkNumberForColor } from "../../../utils/checkNumberFor";

export default function CardSingleInfo({
  title,
  subtitle,
  isReputation,
  data,
  ...props
}) {
  const selectedTag = useSelector((state) => state.searchObject?.selectedTag);

  let mainInfo = "";
  let toneValue = "";
  let colorMainInfo = "";

  if (data !== undefined) {
    if (isReputation) {
      mainInfo = data.sentimentScore;
      toneValue = data.variation;
      colorMainInfo = checkNumberForColor(mainInfo).color;
    } else {
      mainInfo = data.score || data.visibility || data.avgMentionsPerDay;
      toneValue = data.variation || data.avgMentionsPerDayChangePercent;
    }

    if (title === "Total Volume") {
      mainInfo = data.articleCount;
      toneValue = data.articleCountChangePercent;
    }

    if (title === "Mentions per Day (avg)") {
      mainInfo = data.avgMentionsPerDay;
      toneValue = data.avgMentionsPerDayChangePercent;
    }

    if (mainInfo !== "-") {
      mainInfo = nFormatter(mainInfo);
    }
  }

  return (
    <StyledCard {...props}>
      <CardHeader
        subtitle={selectedTag ? selectedTag.tagName : subtitle}
        title={title}
      />
      <div>
        {isReputation ? (
          <MainInfoText style={{ color: colorMainInfo.color }}>
            {mainInfo}
          </MainInfoText>
        ) : (
          <MainInfoText>{mainInfo}</MainInfoText>
        )}
        <ToneWithValue value={toneValue} />
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

const MainInfoText = styled.span`
  color: ${TITLE_COLOR};
  font-family: ${FONT_MUSEO_SLAB};
  font-size: 60px;
  font-weight: bold;
  line-height: initial;
`;
