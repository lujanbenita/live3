import styled from "@emotion/styled";
import { Avatar } from "@material-ui/core";

import ToneText from "components/dashboard/atoms/ToneText";
import ToneWithValue from "components/dashboard/molecules/ToneWithValue";
import { Card } from "components/dashboard/atoms";
import { TITLE_COLOR, FONT_MUSEO_SANS } from "theme";

import CardHeader from "../atoms/CardHeader";
import CompanyAvatar from "../atoms/CompanyAvatarCard";

// background-color: #e0e0e0;

function CardToneInfo({
  title,
  subtitle,
  brand,
  info,
  variant,
  image,
  ...props
}) {
  const { positive, negative, neutral } = info;

  const isSkeleton = (data) => {
    if (data.main === "-%") {
      /* eslint no-param-reassign: ["error", { "props": false }] */
      data.main = "-";
      return data;
    }
    return data;
  };

  return (
    <StyledCard {...props}>
      <CardHeader subtitle={subtitle} title={title} />
      {brand && (
        <div>
          <LeftContent>
            {image !== null ? (
              <CompanyAvatar brand={brand} image={image} />
            ) : (
              <StyledAvatar>{brand ? brand[0] : "-"}</StyledAvatar>
            )}
            <MainContent>
              <MainInfoText>{brand}</MainInfoText>
              <span style={{ color: "#B7C1C9", fontSize: "12px" }}>
                <ToneText value={positive.color} style={{ fontSize: "12px" }}>
                  {isSkeleton(positive).main}
                </ToneText>
                /
                <ToneText value={neutral.color} style={{ fontSize: "12px" }}>
                  {isSkeleton(neutral).main}
                </ToneText>
                /
                <ToneText value={negative.color} style={{ fontSize: "12px" }}>
                  {isSkeleton(negative).main}
                </ToneText>
              </span>
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
      )}
    </StyledCard>
  );
}

export default CardToneInfo;

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

const StyledAvatar = styled(Avatar)`
  && {
    background-color: #e0e0e0;
    border: solid 2.9px #ffffff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.12);
    height: 55px;
    width: 55px;
  }
`;
