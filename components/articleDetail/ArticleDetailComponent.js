import { useEffect, useState } from "react";
import { animateScroll } from "react-scroll";

import { format } from "date-fns";
import { useSelector, useDispatch } from "react-redux";
import Highlighter from "react-highlight-words";

import CustomTagsTutorial from "@/components/tutorial/CustomTagsTutorial";

import { fetchArticleDetail } from "../../redux/articleDetail/articleDetailActions";

import AddButton from "../common/buttons/AddButton";
import ArticleDetailHeader from "./articleDetailHeader/ArticleDetailHeader";
import ArticleDetailSidebar from "./articleDetailSidebar/ArticleDetailSidebar";
import ArticleDetailSyndicated from "./articleDetailSyndicated/ArticleDetailSyndicated";
import ArticleDetailTags from "./articleDetailTags/ArticleDetailTags";
import LanguageWidget from "../common/widgets/LanguageWidget";
import { Modal } from "../common/modal";
import MultipleWeightBar from "../common/widgets/MultipleWeightBar";
import { getAuthorsLists } from "../../redux/lists/listsActions";
import {
  updateAuthorsList,
  fetchAuthorsList,
} from "../../services/listsServices/listsServices";
import { exportNLA } from "../../services/feedServices/exportServices";
import NLATooltip from "../tooltip/NLATooltip";

const ArticleDetailComponent = ({
  article,
  isModal,
  close,
  syndicatedArticles,
  openTagsModal,
  isDashboard = false,
}) => {
  const [showSyndicated, setShowSyndicated] = useState(false);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlighterTag, setHighlighterTag] = useState([""]);

  const keyAuthorsLists = useSelector((state) => state.lists.keyAuthorsLists);
  const articleDetail = useSelector((state) => state.articleDetail);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (article) {
        setLoading(true);
        await dispatch(fetchArticleDetail(article));
        setLoading(false);
      }

      setShowSyndicated(false);
    })();
  }, [article]);

  const getImage = () => {
    if (articleDetail.authorImageURL) {
      return articleDetail.authorImageURL;
    }
    if (articleDetail.twitterImagePath) {
      return articleDetail.twitterImagePath;
    }
    if (articleDetail.bannerImagePath) {
      return `${process.env.NEXT_PUBLIC_API_URL}/viewImageServlet?imagePath=${articleDetail.smallImagePath}`;
    }

    return null;
  };

  const handleAddToAuthorsList = async ({ filterId, filterName }) => {
    const { filterParameters } = await fetchAuthorsList(filterId);
    const updatedAuthors = filterParameters.length
      ? [...filterParameters, { filterParameterValue: articleDetail.author }]
      : [{ filterValue: articleDetail.author }];

    await updateAuthorsList(filterId, filterName, updatedAuthors);
  };

  const findChunks = ({
    // TODO: remove warnings?
    // eslint-disable-next-line no-unused-vars
    autoEscape,
    // eslint-disable-next-line no-unused-vars
    caseSensitive,
    // eslint-disable-next-line no-unused-vars
    sanitize,
    searchWords,
    textToHighlight,
  }) => {
    const chunks = [];
    const textLow = textToHighlight.toLowerCase();
    searchWords.forEach((sw) => {
      const swLow = sw.toLowerCase();
      const pattern = new RegExp(`(^|\\s)${swLow}(\\W|\\s|$)`);
      let textIndex = 0;
      let wordIndex = -1;
      let auxText = textLow;
      if (sw.length === 0) {
        return;
      }

      do {
        wordIndex = auxText.search(pattern);
        if (wordIndex === -1) {
          break;
        }
        if (auxText[wordIndex] !== swLow[0]) {
          wordIndex += 1;
        }
        textIndex += wordIndex;
        chunks.push({ start: textIndex, end: textIndex + swLow.length });
        textIndex += swLow.length;
        auxText = textLow.slice(textIndex);
      } while (wordIndex >= 0);
    });
    return chunks;
  };

  const handleLoadAuthors = async () => {
    setIsLoadingOptions(true);
    await dispatch(getAuthorsLists({ pageSize: 30, page: 1 }));
    setIsLoadingOptions(false);
  };

  const handleOpenUrl = async ({
    headline,
    publication,
    articleId,
    loadDate,
  }) => {
    await exportNLA(articleId, `${headline} - ${publication}`, loadDate);
  };

  return isModal ? (
    <Modal
      open={article ? true : false}
      onClose={close}
      width={1080}
      isLoading={loading}
    >
      {articleDetail && articleDetail.articleId && (
        <div className="c-article-detail">
          <div className="c-article-detail__main">
            <ArticleDetailHeader
              article={articleDetail}
              isoLanguageCode={articleDetail.isoLanguageCode}
              close={close}
              syndicatedArticles={syndicatedArticles}
              showSyndicated={showSyndicated}
              setShowSyndicated={() => {
                setShowSyndicated(!showSyndicated);
                if (!showSyndicated === true) {
                  animateScroll.scrollToBottom({
                    containerId: "scrollDiv",
                    delay: 300,
                  });
                }
              }}
            />
            <div
              className={`c-article-detail__body-layout ${
                !getImage() ? "c-article-detail--no-image" : ""
              }`}
              id="scrollDiv"
            >
              <div
                className="c-article-detail__image"
                style={{
                  background: `url(${getImage()}) no-repeat`,
                }}
              />
              <div
                className={`c-article-detail__body ${
                  !getImage() ? "c-article-detail__body--no-image" : ""
                }`}
              >
                <h1 className="c-article-detail__title">
                  {articleDetail.headline}
                </h1>
                <div className="c-article-detail__widgets-row-one">
                  {!isDashboard && article && article.tags && (
                    <MultipleWeightBar
                      tags={article.tags}
                      id={article.articleId}
                    />
                  )}
                  <span className="c-feed-table-info__date">
                    {format(
                      new Date(articleDetail.publishDateTime),
                      "dd/MM/yyyy HH:mm"
                    )}
                  </span>
                  <span className="c-feed-table-info__author c-feed-table-info__separator">
                    {articleDetail.author}
                  </span>
                  {articleDetail.author !== "uncredited" && (
                    <AddButton
                      label="Save Author to Keylist"
                      handleLoadOptions={handleLoadAuthors}
                      isLoadingOptions={isLoadingOptions}
                      options={keyAuthorsLists}
                      action={(list) => {
                        handleAddToAuthorsList(list);
                      }}
                      noOptionsMessage="Theres is no Key List created, please create a list"
                      position="bottom-center"
                    />
                  )}
                </div>
                <div className="c-article-detail__widgets-row-two">
                  <div className="c-article-detail__language-widget-container">
                    <LanguageWidget
                      isoLanguageCode={articleDetail.isoLanguageCode}
                      countryCode={articleDetail.countryCode}
                      country={articleDetail.countryName}
                    />
                    <span className="c-feed-table-info__source c-feed-table-info__separator">
                      {articleDetail.channel}
                    </span>
                    <span className="c-feed-table-info__source c-feed-table-info__separator">
                      {articleDetail.sourceType}
                    </span>
                  </div>
                  <div className="c-article-detail__widget-badges">
                    {articleDetail.articleUrl.includes("nlaapi") && (
                      <NLATooltip
                        content={() => (
                          <span
                            className="c-feed-table-info__link"
                            onClick={() => handleOpenUrl(articleDetail)}
                            aria-hidden="true"
                          />
                        )}
                      />
                    )}
                    {!articleDetail.articleUrl.includes("nlaapi") && (
                      <a
                        href={articleDetail.articleUrl}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <span
                          className="c-feed-table-info__link"
                          aria-hidden="true"
                        />
                      </a>
                    )}
                  </div>
                </div>
                <div className="c-article-detail__description">
                  {articleDetail.body && (
                    <Highlighter
                      highlightClassName="c-feed-table-info__highlight"
                      searchWords={highlighterTag}
                      findChunks={findChunks}
                      textToHighlight={articleDetail.body}
                    />
                  )}
                </div>
              </div>
              <ArticleDetailSyndicated
                isVisible={showSyndicated && syndicatedArticles.length > 0}
                syndicatedArticles={syndicatedArticles}
              />
            </div>
          </div>
          <div className="c-article-detail__sidebar">
            <ArticleDetailSidebar article={articleDetail} />
            <ArticleDetailTags
              tags={articleDetail.tags}
              customTags={articleDetail.customTags}
              openTagsModal={openTagsModal}
              articleDetail={articleDetail}
              setHighlighterTag={setHighlighterTag}
            />
          </div>
          <CustomTagsTutorial />
        </div>
      )}
    </Modal>
  ) : (
    <div></div>
  );
};

export default ArticleDetailComponent;
