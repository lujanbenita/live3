import styled from "@emotion/styled";

const Tone = styled.div`
  align-items: center;
  background-color: ${({ value }) => value};
  border-radius: 100%;
  display: flex;
  height: ${(props) => props.height || "36px"};
  justify-content: center;
  position: relative;
  width: ${(props) => props.width || "36px"};
  margin: auto;
`;

export default Tone;
