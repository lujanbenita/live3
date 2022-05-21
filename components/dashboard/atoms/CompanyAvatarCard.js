import styled from "@emotion/styled";
import Avatar from "../../common/avatar/CompanyAvatar";

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

const StyledAvatar = styled(Avatar)`
  && {
    background-color: #e0e0e0;
    border: solid 2.9px #ffffff;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.12);
    height: 55px;
    width: 55px;
  }
`;

const CompanyAvatarCard = ({ image, brand }) => (
  <>
    {!image && <StyledAvatar>{brand !== undefined && brand[0]}</StyledAvatar>}
    {image && (
      <StyledImg>
        <img src={image} alt={brand} />
      </StyledImg>
    )}
  </>
);

export default CompanyAvatarCard;
