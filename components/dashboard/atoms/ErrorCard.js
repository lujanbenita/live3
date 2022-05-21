import styled from "@emotion/styled";

import Invisible from "icons/Invisible";
import { Card } from "components/dashboard/atoms";

const StyledCard = styled(Card)`
  align-items: center;
  background-color: #121f2a;
  color: #597d99;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  min-height: 140px;
  text-align: center;
`;

const Message = styled.div`
  margin-top: 10px;
  // display: inline-block;display
  font-size: 12px;
  display: -webkit-box;
  max-width: 100%;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

function ErrorCard({
  message = "Not available for this filter configuration",
  ...props
}) {
  return (
    <StyledCard {...props}>
      <Invisible />
      <Message>{message}</Message>
    </StyledCard>
  );
}

export default ErrorCard;
