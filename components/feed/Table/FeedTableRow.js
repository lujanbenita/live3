import { useState, useEffect } from "react";

import ArticleTutorial from "@/components/tutorial/ArticleTutorial";

import FeedInfoColumn from "./FeedInfoColumn";
import FeedStatsColumn from "./FeedStatsColumn";
import Checkbox from "../../common/inputs/Checkbox";
import SyndicatedArticle from "./SyndicatedArticle";

const FeedTableRow = ({
  article,
  openModal,
  select,
  isLoading,
  isSyndicated,
  selectedArticles,
  setActiveArticle,
  setActiveSyndicatedArticles,
  setSelectedArticles,
  selectedTag,
  index,
}) => {
  const [syndicatedSort, setSyndicatedSort] = useState([]);
  const [showSyndicated, setShowSyndicated] = useState(false);

  useEffect(() => {
    if (isSyndicated) {
      const sorted = article.sort(
        (a, b) => a.circulationSize > b.circulationSize
      );

      setSyndicatedSort(sorted);
    }
  }, []);

  const getIfIsDisabled = (tags) => {
    if (selectedTag) {
      if (tags.some((tag) => tag.tagName === selectedTag.tagName)) {
        return false;
      }
      return true;
    }
    return false;
  };

  const isSelected =
    selectedArticles &&
    selectedArticles.find((el) => el.articleId === article.articleId);

  return !isSyndicated ? (
    <div
      className={`c-feed-table-row ${
        getIfIsDisabled(article.tags) ? "c-feed-table-row--disabled" : ""
      }`}
    >
      <div className="c-feed-table-row__checkbox" aria-checked={isSelected}>
        <Checkbox isChecked={isSelected} onClick={() => select(article)} />
      </div>
      <div className="c-feed-table-row__info-column">
        <FeedInfoColumn
          article={article}
          isLoading={isLoading}
          openArticle={() => {
            setActiveArticle(article);
            setActiveSyndicatedArticles(false);
          }}
          isFirstArticle={index === 0}
        />
      </div>
      <div className="c-feed-table-row__stats-column">
        <FeedStatsColumn
          openModal={() => {
            setSelectedArticles([article]);
            openModal();
          }}
          article={article}
          isLoading={isLoading}
          isFirstArticle={index === 0}
        />
      </div>
    </div>
  ) : (
    syndicatedSort.length > 0 && (
      <>
        <div
          className={`c-feed-table-row ${
            getIfIsDisabled(article[0].tags) ? "c-feed-table-row--disabled" : ""
          }`}
        >
          <div className="c-feed-table-row__checkbox" aria-checked={isSelected}>
            <Checkbox
              isChecked={selectedArticles.find(
                (el) => el.articleId === syndicatedSort[0].articleId
              )}
              onClick={() => select(syndicatedSort[0])}
            />
          </div>
          <div className="c-feed-table-row__info-column">
            <FeedInfoColumn
              openArticle={() => {
                setActiveArticle(syndicatedSort[0]);
                setActiveSyndicatedArticles(
                  syndicatedSort.slice(1, syndicatedSort.length)
                );
              }}
              openModal={() => {
                select(syndicatedSort[0], true);
                openModal();
              }}
              article={syndicatedSort[0]}
              isLoading={isLoading}
              isSyndicated
              isVisibleSyndicated={showSyndicated}
              showSyndicated={() => {
                setShowSyndicated(!showSyndicated);
              }}
              syndicatedLength={article.length}
              isFirstArticle={index === 0}
            />
          </div>
          <div className="c-feed-table-row__stats-column">
            <FeedStatsColumn
              openModal={() => {
                select(syndicatedSort[0], true);
                openModal();
              }}
              article={syndicatedSort[0]}
              isLoading={isLoading}
              isFirstArticle={index === 0}
            />
          </div>
        </div>
        <div
          className={`c-feed-table-row__syndicated-container ${
            showSyndicated
              ? "c-feed-table-row__syndicated-container--visible"
              : ""
          }
          ${
            getIfIsDisabled(article[0].tags) ? "c-feed-table-row--disabled" : ""
          }
          `}
        >
          {syndicatedSort.slice(1, syndicatedSort.length).map((art, i) => (
            <SyndicatedArticle
              key={art.articleId || i}
              isSelected={selectedArticles.find(
                (el) => el.articleId === art.articleId
              )}
              article={art}
              isLoading={isLoading}
              select={() => select(art)}
            />
          ))}
        </div>
        <ArticleTutorial />
      </>
    )
  );
};

export default FeedTableRow;
