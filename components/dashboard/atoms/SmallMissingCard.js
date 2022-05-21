import styled from "@emotion/styled";

import Cactus from "icons/Cactus";
import { Card } from "components/dashboard/atoms";
import { FONT_MUSEO_SLAB } from "theme";

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

function SmallMissingCard(props) {
  return (
    <StyledCard {...props}>
      <Cactus width="60px" height="auto" />
      <StyledTitle>Ups… nothing to see here!</StyledTitle>
    </StyledCard>
  );
}

export default SmallMissingCard;
