import styled from "@emotion/styled";
import { Avatar } from "@material-ui/core";

import ToneWithValue from "components/dashboard/molecules/ToneWithValue";
import { Card } from "components/dashboard/atoms";
import { TITLE_COLOR, FONT_MUSEO_SANS } from "theme";

import nSignFormatter from "@/utils/numberQuantityFormatter";
import CardHeader from "../atoms/CardHeader";

function CardTotalVolume({ title, subtitle = "Leader", data, ...props }) {
  const image =
    data.base64TagImage !== "-" && data.base64TagImage !== null
      ? `data:image/png;base64,${data.base64TagImage}`
      : null;

  const brand = data.tagName;
  let info = "-";
  if (data.articleCount !== "-") {
    info = `${nSignFormatter(data.articleCount)} mentions`;
  }
  const variant = data.articleCountChangePercent;

  return (
    <StyledCard {...props}>
      <CardHeader subtitle={subtitle} title={title} />
      <div>
        <LeftContent>
          {!image && <StyledAvatar>{brand ? brand[0] : "-"}</StyledAvatar>}
          {image && (
            <StyledImg>
              <img src={image} alt={brand} />
            </StyledImg>
          )}
          <MainContent>
            <MainInfoText>{brand}</MainInfoText>
            <MentionsText>{info} </MentionsText>
          </MainContent>
        </LeftContent>

        <ToneWithValue value={variant} />
        <style jsx>
          {`
            div {
              display: flex;
              min-height: 72px;
              justify-content: space-between;
              align-items: center;
            }
          `}
        </style>
      </div>
    </StyledCard>
  );
}

export default CardTotalVolume;

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 3px;
  box-shadow: 0 8px 9px -3px rgba(0, 0, 0, 0.53);
  border: solid 1px #ffffff;
  background-color: #deeaf3;
`;

const LeftContent = styled.div`
  display: flex;
`;

const MainContent = styled.div`
  display: flex;
  flex-flow: wrap;
  align-self: center;
  margin-left: 12px;
`;

const MainInfoText = styled.span`
  width: 100%;
  color: ${TITLE_COLOR};
  font-family: ${FONT_MUSEO_SANS};
  line-height: initial;
  font-size: 14px;
  font-weight: bold;
`;

const MentionsText = styled.span`
  color: #a8a8a8;
  font-size: 12px;
`;

const StyledAvatar = styled(Avatar)`
  && {
    background-color: #e0e0e0;
    border: solid 2.9px #ffffff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.12);
    height: 55px;
    width: 55px;
  }
`;

const StyledImg = styled.div`
  align-items: center;
  background-color: #ffffff;
  border-radius: 100%;
  border: solid 2.9px #ffffff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.12);
  display: flex;
  justify-content: center;
  max-height: 55px;
  max-width: 55px;
  min-height: 55px;
  min-width: 55px;
  padding: 5px;
  & img {
    height: 100%;
    object-fit: contain;
    width: 100%;
  }
`;
