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

export const POSITIVE_TYPE = "POSITIVE_TYPE";
export const NEGATIVE_TYPE = "NEGATIVE_TYPE";
export const NEUTRAL_TYPE = "NEUTRAL_TYPE";

const types = {
  [POSITIVE_TYPE]: {
    background: POSITIVE,
    color: POSITIVE_TEXT,
  },
  [NEGATIVE_TYPE]: {
    background: NEGATIVE,
    color: NEGATIVE_TEXT,
  },
  [NEUTRAL_TYPE]: {
    background: NEUTRAL,
    color: NEUTRAL_TEXT,
  },
};

export default function ToneWithCount({
  main,
  secondary,
  type,
  isReputation,
  style,
}) {
  const tone = useMemo(() => types[type], [type]);

  if (main === "-%" || main === "--") {
    /* eslint-disable no-param-reassign */
    main = "-";
  }

  if (secondary === "-%") {
    secondary = "-";
    style.color = "#3a4557";
  }

  return isReputation ? (
    <ToneStyled height="70px" width="70px" value={tone.background}>
      <ToneTitle value={tone.color}>{main}</ToneTitle>
      <ToneText style={style}>{secondary}</ToneText>
    </ToneStyled>
  ) : (
    <ToneStyled height="64px" width="64px" value={tone.background}>
      <ToneTitle value={tone.color}>{main}</ToneTitle>
      <ToneText value={secondary.color}>{secondary.data}</ToneText>
    </ToneStyled>
  );
}

const ToneStyled = styled(Tone)`
  display: flex;
  flex-direction: column;
`;

const ToneTitle = styled.span`
  font-family: ${FONT_MUSEO_SLAB};
  font-size: 20px;
  font-weight: 900;
  color: ${TITLE_COLOR};
  line-height: normal;
`;
