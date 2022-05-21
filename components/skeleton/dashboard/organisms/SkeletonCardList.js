import styled from "@emotion/styled";

import SkeletonBigCard from "../atoms/SkeletonBigCard";
import SkeletonSmallCard from "../atoms/SkeletonSmallCard";

const CardsWrap = styled.div`
  padding: 20px 0;
`;

const StyledDoubleCard = styled.div`
  display: block;
  gap: 20px;
  padding: 10px 0;
  max-width: 1480px;
  width: 100%;
`;

const StyledList = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, 100%);
  padding: 10px 0;

  @media (min-width: 540px) {
    grid-template-columns: repeat(auto-fill, calc(50% - 20px));
  }

  @media (min-width: 790px) {
    grid-template-columns: repeat(auto-fill, calc(33% - 20px));
  }

  @media (min-width: 1580px) {
    grid-template-columns: repeat(auto-fill, 230px);
  }
`;

const StyledBigList = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, 100%);
  padding: 10px 0;

  @media (min-width: 540px) {
    grid-template-columns: repeat(auto-fill, calc(100% - 20px));
  }

  @media (min-width: 790px) {
    grid-template-columns: repeat(auto-fill, calc(50% - 25px));
  }

  @media (min-width: 1580px) {
    grid-template-columns: repeat(auto-fill, 730px);
  }
`;

function SkeletonCardList({ small, big }) {
  return (
    <CardsWrap>
      <StyledList index="small_cards">
        {new Array(small)
          .fill()
          .map((_, idx) => idx)
          .map((index) => (
            <SkeletonSmallCard key={`small_card_${index}`} />
          ))}
      </StyledList>
      {big.map((cols, index) => {
        const bigIdx = index;
        const cardContent = new Array(cols)
          .fill()
          .map((_, idx) => idx)
          .map((index2) => (
            <SkeletonBigCard key={`big_card_${bigIdx}_${index2}`} />
          ));

        if (cols > 1) {
          return (
            <StyledBigList key={`big_cards_list_${bigIdx}`}>
              {cardContent}
            </StyledBigList>
          );
        }

        return (
          <StyledDoubleCard key={`big_cards_list_${bigIdx}`}>
            {cardContent}
          </StyledDoubleCard>
        );
      })}
    </CardsWrap>
  );
}

export default SkeletonCardList;
