import styled from "@emotion/styled";

import Cactus from "icons/Cactus";
import { Card } from "components/dashboard/atoms";
import { FONT_MUSEO_SLAB, FONT_MUSEO_SANS } from "theme";

const StyledCard = styled(Card)`
  align-items: center;
  color: #597d99;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  min-height: 140px;
`;

const StyledTitle = styled.span`
  color: #3a4557;
  font-family: ${FONT_MUSEO_SLAB};
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const StyledText = styled.span`
  color: #5a646f;
  font-family: ${FONT_MUSEO_SANS};
  font-size: 14px;
  font-weight: 300;
  line-height: 1.79;
  max-width: 450px;
  text-align: center;
  width: 100%;
`;

function MissingCard({
  text = "Your current search and/or filter settings did not return any results. Please try a different search.",
  ...props
}) {
  return (
    <StyledCard {...props}>
      <Cactus />
      <StyledTitle>Oops… nothing to see here!</StyledTitle>
      <StyledText>{text}</StyledText>
    </StyledCard>
  );
}

export default MissingCard;
