import styled from "@emotion/styled";
import { FONT_MUSEO_SLAB } from "theme";

const ToneText = styled.span`
  color: ${({ value }) => value};
  font-family: ${FONT_MUSEO_SLAB};
  font-size: 13px;
  font-weight: bold;
  line-height: normal;
  text-align: center;
`;

export default ToneText;
