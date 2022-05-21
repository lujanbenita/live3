import styled from "@emotion/styled";
import { useMemo } from "react";

import ArrowDownStyled from "icons/ArrowDownStyled";
import ArrowUpStyled from "icons/ArrowUpStyled";
import NeutralStyled from "icons/NeutralStyled";
import Tone from "components/dashboard/atoms/Tone";

import {
  POSITIVE,
  POSITIVE_TEXT,
  NEGATIVE,
  NEGATIVE_TEXT,
  NEUTRAL,
  NEUTRAL_TEXT,
} from "theme";

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
`;

export default function ToneCircle({ value }) {
  const tone = useMemo(() => {
    if (value > 0)
      return {
        background: POSITIVE,
        color: POSITIVE_TEXT,
        icon: <ArrowUpStyled />,
      };
    if (value < 0)
      return {
        background: NEGATIVE,
        color: NEGATIVE_TEXT,
        icon: <ArrowDownStyled />,
      };
    return {
      background: NEUTRAL,
      color: NEUTRAL_TEXT,
      icon: <NeutralStyled />,
    };
  }, [value]);

  if (value !== "-") {
    if (Math.round(value) > 0) {
      /* eslint-disable no-param-reassign */
      value = `+${Math.round(value)}`;
    } else {
      value = `${Math.round(value)}`;
    }
  }

  return (
    <Wrap>
      <Tone value={tone.background} style={{ height: "45px", width: "45px" }}>
        {tone.icon}
      </Tone>
    </Wrap>
  );
}
