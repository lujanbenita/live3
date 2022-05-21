/* eslint-disable no-nested-ternary */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import _ from "lodash";

import FeedTableRow from "./Table/FeedTableRow";
import FeedHeader from "./Table/FeedHeader";
import FeedModalTags from "./Table/FeedModalTags";
import Pagination from "../common/table/Pagination";
import { useFeedHooks } from "./feedHooks";
import ArticleDetailComponent from "../articleDetail/ArticleDetailComponent";
import MissingCard from "../dashboard/atoms/MissingCard";

const LOADING_MOCK = [1, 2, 3, 4, 5];

const FeedSearch = ({ handleSubmitSearch, totalCount }) => {
  const feedResults = useSelector((state) => state.search.feedResults);
  const isLoading = useSelector((state) => state.search.isPendingFeed);
  const selectedTag = useSelector((state) => state.searchObject.selectedTag);
  const searchObject = useSelector((state) => state.searchObject);
  const rowsPerPageRedux = useSelector(
    (state) => state.searchObject.rowsPerPage
  );

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [activeArticle, setActiveArticle] = useState(false);
  const [activeSyndicatedArticles, setActiveSyndicatedArticles] =
    useState(false);
  const [formattedResults, setFormattedResults] = useState([]);
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [infoPagination, setInfoPagination] = useState();

  const [page, setPage] = useState(searchObject.page - 1);

  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageRedux || 30);
  const { handleSelectArticle, isAllArticlesChecked } = useFeedHooks(
    feedResults,
    selectedArticles,
    setSelectedArticles
  );

  useEffect(() => {
    const newPage = searchObject.page - 1;
    setPage(newPage < 0 ? 0 : newPage);
  }, [searchObject.page]);

  useEffect(() => {
    const syndicatedArray = _.chain(feedResults)
      .groupBy("truncHeadline")
      .map((article) => article)
      .value();

    setFormattedResults(syndicatedArray);
  }, [feedResults]);

  return (
    <div className="c-feed">
      {isLoading ? (
        <>
          <FeedHeader articles={[]} openModal={setIsOpenModal} isLoading />
          <div className="c-feed__content">
            {LOADING_MOCK.map((article) => (
              <FeedTableRow key={article} article={article} isLoading />
            ))}
          </div>
        </>
      ) : feedResults.length > 0 ? (
        <>
          <FeedHeader
            isChecked={isAllArticlesChecked}
            openModal={setIsOpenModal}
            selectedArticles={selectedArticles}
            infoPagination={infoPagination}
            select={() =>
              setSelectedArticles(isAllArticlesChecked ? [] : feedResults)
            }
          />
          <div className="c-feed__content">
            {formattedResults.map((articlesArray, index) => (
              <FeedTableRow
                index={index}
                selectedTag={selectedTag}
                setActiveArticle={setActiveArticle}
                selectedArticles={selectedArticles}
                setActiveSyndicatedArticles={setActiveSyndicatedArticles}
                isSyndicated={articlesArray.length > 1}
                setSelectedArticles={setSelectedArticles}
                select={handleSelectArticle}
                key={articlesArray[0].articleId}
                article={
                  articlesArray.length > 1 ? articlesArray : articlesArray[0]
                }
                openModal={() => setIsOpenModal(true)}
              />
            ))}
          </div>
          <Pagination
            page={page}
            setPage={(newPage) => {
              if (page !== newPage) {
                setPage(newPage);
                setSelectedArticles([]);
                handleSubmitSearch({
                  ...searchObject,
                  rowsPerPage,
                  page: newPage + 1,
                });
              }
            }}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={(newRowsPerPage) => {
              if (rowsPerPage !== newRowsPerPage) {
                setRowsPerPage(newRowsPerPage);
                setSelectedArticles([]);
                handleSubmitSearch({
                  ...searchObject,
                  page,
                  rowsPerPage: newRowsPerPage,
                });
              }
            }}
            total={totalCount || -1}
            setInfoPagination={setInfoPagination}
          />
        </>
      ) : (
        <div className="c-feed__no-results">
          <MissingCard text="Your current search and/or filter settings did not return any results. Please try a different search." />
        </div>
      )}
      <FeedModalTags
        selectedArticles={selectedArticles}
        isOpen={isOpenModal}
        handleClose={() => setIsOpenModal(false)}
        width={670}
        title="Add Custom Tags"
      />
      <ArticleDetailComponent
        article={activeArticle}
        isModal
        close={() => {
          setActiveArticle(false);
        }}
        openTagsModal={(article) => {
          setIsOpenModal(true);
          setSelectedArticles([article]);
        }}
        syndicatedArticles={activeSyndicatedArticles}
      />
    </div>
  );
};

export default FeedSearch;
