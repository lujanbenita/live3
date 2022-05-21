import styled from "@emotion/styled";
import { Subtitle, Title } from "components/dashboard/atoms";

const Header = styled.div``;

// export default function CardHeader({ title, subtitle }) {
export default function CardHeader({ title, subtitle, ...props }) {
  return (
    <Header {...props}>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      <Title>{title}</Title>
    </Header>
  );
}
