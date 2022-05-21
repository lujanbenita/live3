import styled from "@emotion/styled";

import Cactus from "icons/Cactus";
import { Card } from "components/dashboard/atoms";
import { useSelector } from "react-redux";
import CardHeader from "../atoms/CardHeader";

const CardSkeletonEmpty = ({
  title,
  subtitle,
  message = "No data was obtained for this search",
  size,
  ...props
}) => {
  const selectedTag = useSelector((state) => state.searchObject?.selectedTag);

  const StyledCard = styled(Card)`
    align-items: flex-start;
    background-color: #ffffff;
    color: #3a4557;
    display: flex;
    flex-direction: column;
    height: ${size === "middle" ? "140px" : "100%"};
    text-align: center;
    justify-content: space-between;
    min-height: ${size === "middle" ? "140px" : "450px"};
    overflow: hidden;
    position: relative;
    text-align: left;

    svg {
      width: 100%;
      opacity: 1;
      opacity: 0.1;
      height: ${size === "middle" && "72px"};
    }
  `;

  let Message = styled.div`
    position: relative;
    width: 100%;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    top: -60px;
    top: -200px;
  `;

  if (size === "middle") {
    Message = styled.div`
      position: absolute;
      top: 38px;
      bottom: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    `;
  }

  return (
    <StyledCard {...props}>
      <CardHeader
        title={title}
        subtitle={selectedTag ? selectedTag.tagName : subtitle}
      />
      <Cactus />
      <Message>{message}</Message>
    </StyledCard>
  );
};

export default CardSkeletonEmpty;
