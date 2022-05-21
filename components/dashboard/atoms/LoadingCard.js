import styled from "@emotion/styled";

import Spinner from "icons/Spinner";
import { Card } from "components/dashboard/atoms";

const StyledCard = styled(Card)`
  position: relative;
  min-height: 140px;
  height: 100%;
`;

const StyledSpinner = styled(Spinner)`
  position: absolute;
  top: 50%;
  left: 50%;
`;

function LoadingCard(props) {
  return (
    <StyledCard {...props}>
      <StyledSpinner />
    </StyledCard>
  );
}

export default LoadingCard;
