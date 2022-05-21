import { Skeleton } from "@material-ui/lab";
import styled from "@emotion/styled";

const StyledSkeletonCard = styled(Skeleton)`
  && {
    border-radius: 3px;
    box-shadow: 2px 2px 8px 0 rgba(0, 0, 0, 0.14);
    background-color: #121f2a;
  }
`;
function SkeletonCard(props) {
  return <StyledSkeletonCard {...props} variant="rect" animation={false} />;
}
export default SkeletonCard;
