import styled from "@emotion/styled";
import { useMemo } from "react";

import Tone from "components/dashboard/atoms/Tone";
import ToneText from "components/dashboard/atoms/ToneText";

import {
  POSITIVE,
  POSITIVE_TEXT,
  NEGATIVE,
  NEGATIVE_TEXT,
  NEUTRAL,
  NEUTRAL_TEXT,
  FONT_MUSEO_SLAB,
  TITLE_COLOR,
} from "theme";

import ArrowDownStyled from "icons/ArrowDownStyled";
import ArrowUpStyled from "icons/ArrowUpStyled";
import NeutralStyled from "icons/NeutralStyled";

export const POSITIVE_TYPE = "POSITIVE_TYPE";
export const NEGATIVE_TYPE = "NEGATIVE_TYPE";
export const NEUTRAL_TYPE = "NEUTRAL_TYPE";

const StyledWrap = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const ToneTitle = styled.span`
  color: ${TITLE_COLOR};
  font-family: ${FONT_MUSEO_SLAB};
  font-size: 20px;
  font-weight: 900;
  line-height: normal;
  margin-top: 0.5rem;
`;

const types = {
  [POSITIVE_TYPE]: {
    background: POSITIVE,
    color: POSITIVE_TEXT,
    icon: <ArrowUpStyled />,
  },
  [NEGATIVE_TYPE]: {
    background: NEGATIVE,
    color: NEGATIVE_TEXT,
    icon: <ArrowDownStyled />,
  },
  [NEUTRAL_TYPE]: {
    background: NEUTRAL,
    color: NEUTRAL_TEXT,
    icon: <NeutralStyled />,
  },
};

function ToneWithCountPercent({ main, secondary, type }) {
  const tone = useMemo(() => types[type], [type]);

  return (
    <StyledWrap value={tone.background}>
      <Tone value={tone.background} height="43px" width="43px">
        {tone.icon}
      </Tone>

      <ToneTitle value={tone.color}>{main}</ToneTitle>
      <ToneText value={tone.color}>{secondary} %</ToneText>
    </StyledWrap>
  );
}

export default ToneWithCountPercent;
