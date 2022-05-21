import styled from "@emotion/styled";
import { Avatar } from "@material-ui/core";
import { format } from "date-fns";
import { useState } from "react";
import { useSelector } from "react-redux";

import { ordinalSuffixOfSeparated } from "utils/ordinalSuffixOf";
import Card from "components/dashboard/atoms/Card";
import { FONT_MUSEO_SLAB, FONT_MUSEO_SANS } from "theme";

import CardHeader from "../atoms/CardHeader";
import ArticleDetailComponent from "../../articleDetail/ArticleDetailComponent";
import FeedModalTags from "../../feed/Table/FeedModalTags";
import CardSkeletonEmpty from "../skeletons/CardSkeletonEmpty";

const removePublicationSuffixes = (publication) => {
  // eslint-disable-next-line no-unused-vars
  const [publicationName, ...suffix] = publication.split(
    "(",
    publication.length
  );
  return publicationName;
};

const formatDate = (date) => format(new Date(date), "dd/MM/yyyy");

function CardTable({ title, subtitle, data, ...props }) {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedTagArticles, setSelectedTagArticles] = useState([]);
  const [isTagsModalOpen, setIsTagsModalOpen] = useState(false);

  if (data.results.length === 0) {
    return <CardSkeletonEmpty title={title} subtitle={subtitle} />;
  }

  const rows = data.results;

  const selectedTag = useSelector((state) => state.searchObject?.selectedTag);

  return (
    <>
      <StyledCard {...props}>
        <StyledCardHeader
          subtitle={selectedTag ? selectedTag.tagName : subtitle}
          title={title}
        />
        <StyledCardContent>
          {rows
            .sort((a, b) => (a.position > b.position ? 1 : -1))
            .map((row) => {
              const {
                articleId,
                headline,
                loadDate,
                position,
                publicationName,
              } = row;
              const pos = ordinalSuffixOfSeparated(position);
              return (
                <StyledItem
                  onClick={() => {
                    setSelectedArticle(row);
                  }}
                  key={articleId}
                >
                  <StyledPosition
                    style={{ color: pos[0] > 3 ? "#9da6b2" : "#008a19" }}
                  >
                    {pos[0]}
                    <span>{pos[1]}</span>
                  </StyledPosition>
                  <StyledHeadline>{headline}</StyledHeadline>
                  <StyledLoadDate>{formatDate(loadDate)}</StyledLoadDate>
                  <StyledItemRight>
                    <StyledAvatar>{publicationName[0]}</StyledAvatar>
                    <StyledName>
                      {removePublicationSuffixes(publicationName)}
                    </StyledName>
                  </StyledItemRight>
                </StyledItem>
              );
            })}
        </StyledCardContent>
      </StyledCard>
      <ArticleDetailComponent
        isDashboard
        article={selectedArticle}
        close={() => setSelectedArticle(null)}
        openTagsModal={(art) => {
          setSelectedTagArticles([art]);
          setIsTagsModalOpen(true);
        }}
        isModal
      />
      <FeedModalTags
        selectedArticles={selectedTagArticles}
        isOpen={isTagsModalOpen}
        handleClose={() => setIsTagsModalOpen(false)}
        width={670}
        title="Add Custom Tags"
      />
    </>
  );
}

export default CardTable;

const StyledCardHeader = styled(CardHeader)`
  padding-left: 15px;
  padding-right: 15px;
  height: 35px;
`;

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: start;
  min-height: 450px;
  overflow: hidden;
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 0;

  position: relative;
  &::after {
    content: "";
    background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0) 20%
    );
    border-radius: 3px;
    bottom: 0;
    height: 100%;
    left: 0;
    pointer-events: none;
    position: absolute;
    width: calc(100% - 9px);
  }
`;

const StyledCardContent = styled.ul`
  border-top: solid 1px #cfcfcf;
  max-height: 390px;
  overflow-y: scroll;
  margin-bottom: 0;
  margin-top: 10px;

  &::-webkit-scrollbar {
    border-left: solid 1px #cfcfcf;
    width: 9px;
  }

  &::-webkit-scrollbar-thumb {
    border: 2.5px solid transparent;
    background-color: #ff004c;
    border-radius: 25px;
    background-clip: content-box;
  }
`;

const StyledItemRight = styled.span`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-left: 23px;
  position: relative;
  &::before {
    content: "";
    background-color: #979797;
    height: 32px;
    left: 0;
    opacity: 0.2;
    position: absolute;
    width: 1px;
    width: 1px;
  }
`;

const StyledItem = styled.li`
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 1px #cfcfcf;
  margin-left: 15px;
  margin-right: 15px;
  cursor: pointer;
`;

const StyledPosition = styled.span`
  align-items: center;
  color: #008a19;
  display: flex;
  justify-content: flex-end;
  font-family: ${FONT_MUSEO_SLAB};
  font-size: 20px;
  font-weight: 900;
  margin-right: 14px;
  min-width: 57px;
  & span {
    font-size: 12px;
    font-weight: 500;
    margin-left: 3px;
    min-width: 17px;
  }
`;

const StyledHeadline = styled.span`
  color: #3a4557;
  font-family: ${FONT_MUSEO_SLAB};
  font-size: 12px;
  font-weight: bold;
  max-width: 48%;
  overflow: hidden;
  text-overflow: ellipsis;
  // white-space: pre;
  width: 100%;
`;

const StyledLoadDate = styled.span`
  color: #597d99;
  font-family: ${FONT_MUSEO_SANS};
  font-size: 12px;
  font-weight: 500;
  margin: 0 14px;
  white-space: pre;
`;

const StyledName = styled.span`
  color: #162a3a;
  font-family: ${FONT_MUSEO_SLAB};
  font-size: 12px;
  font-weight: 500;
  max-width: 110px;
  width: 110px;
  overflow: hidden;
  text-overflow: clip;
  white-space: pre;
`;

const StyledAvatar = styled(Avatar)`
  && {
    background-color: #ea5555;
    border: solid 2px #ffffff;
    color: #ffffff;
    font-family: ${FONT_MUSEO_SLAB};
    font-size: 14px;
    font-weight: bold;
    height: 28px;
    margin-right: 9px;
    width: 28px;
    line-height: 29px;
  }
`;
