import { useState } from "react";

import { format } from "date-fns";
import { useSelector, useDispatch } from "react-redux";

import Highlighter from "react-highlight-words";

import AddButton from "components/common/buttons/AddButton";
import LanguageWidget from "components/common/widgets/LanguageWidget";
import MultipleWeightBar from "components/common/widgets/MultipleWeightBar";
import OpenFolderButton from "components/common/buttons/OpenFolderButton";
import OptionsButton from "components/common/buttons/OptionsButton";
import { limitCharacters } from "utils/formatters";
import { useResponsive } from "utils/hooks/useResponsive";
import { DARK } from "../../../utils/colors";

import NLATooltip from "../../tooltip/NLATooltip";
import FeedInfoSkeleton from "../skeleton/FeedInfoSkeleton";
import { getAuthorsLists } from "../../../redux/lists/listsActions";
import {
  updateAuthorsList,
  fetchAuthorsList,
} from "../../../services/listsServices/listsServices";
import {
  exportCSV,
  exportPDF,
  exportNLA,
  exportPPT,
} from "../../../services/feedServices/exportServices";

const FeedInfoColumn = ({
  article,
  openModal,
  isLoading,
  isSyndicated,
  showSyndicated,
  syndicatedLength,
  isVisibleSyndicated,
  openArticle,
  isFirstArticle,
}) => {
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);
  const keyAuthorsLists = useSelector((state) => state.lists.keyAuthorsLists);
  const user = useSelector((state) => state.user);
  const dateRange = useSelector((state) => state.searchObject.dateRange);
  const { isSmallDesktop, isLowerThanSmallDesktop } = useResponsive();

  const dispatch = useDispatch();

  const getFirstMentionText = () => {
    const allTags = article.tags;

    if (!allTags || allTags == null || allTags.length === 0) return "";

    allTags.sort((tagA, tagB) => tagA.weight > tagB.weight);

    return allTags[0].firstMentionText;
  };

  const handleAddToAuthorsList = async ({ filterId, filterName }) => {
    const { filterParameters } = await fetchAuthorsList(filterId);
    const updatedAuthors = filterParameters.length
      ? [...filterParameters, { filterParameterValue: article.author }]
      : [{ filterValue: article.author }];

    await updateAuthorsList(filterId, filterName, updatedAuthors);
  };

  const handleLoadAuthors = async () => {
    setIsLoadingOptions(true);
    await dispatch(getAuthorsLists({ pageSize: 30, page: 1 }));
    setIsLoadingOptions(false);
  };

  const handleOpenUrl = async ({
    truncHeadline,
    publication,
    articleId,
    loadDate,
  }) => {
    await exportNLA(articleId, `${truncHeadline} - ${publication}`, loadDate);
  };

  return isLoading ? (
    <FeedInfoSkeleton />
  ) : (
    <div className="c-feed-table-info">
      <div className="c-feed-table-info__info">
        <span
          className="c-feed-table-info__title"
          onClick={openArticle}
          aria-hidden="true"
        >
          {article.truncHeadline}
        </span>
        <div className="c-feed-table-info__widgets">
          <div className="c-feed-table-info__weight-date-container">
            {article.tags && (
              <MultipleWeightBar tags={article.tags} id={article.articleId} />
            )}

            <span className="c-feed-table-info__date">
              {format(new Date(article.publishDateTime), "dd/MM/yyyy HH:mm")}
            </span>
          </div>
          <div className="c-feed-table-info__author-container">
            <span
              className={`c-feed-table-info__author c-feed-table-info__separator ${
                article.author === "uncredited"
                  ? "c-feed-table-info__separator--padding-right"
                  : ""
              }`}
            >
              {article.author}
            </span>
            {article.author !== "uncredited" && (
              <AddButton
                label="Save Author to Keylist"
                handleLoadOptions={handleLoadAuthors}
                isLoadingOptions={isLoadingOptions}
                options={keyAuthorsLists}
                action={(list) => {
                  handleAddToAuthorsList(list);
                }}
                noOptionsMessage="Theres is no Key List created, please create a list"
                position={isFirstArticle ? "bottom" : "top"}
              />
            )}
          </div>
          <div className="c-feed-table-info__separator">
            <LanguageWidget
              countryCode={article.countryCode}
              country={article.countryName}
              isoLanguageCode={article.isoLanguageCode}
            />
          </div>
          <span className="c-feed-table-info__source c-feed-table-info__separator">
            {article.channel}
          </span>
          <span className="c-feed-table-info__source c-feed-table-info__separator">
            {article.sourceType}
          </span>
        </div>
        <p className="c-feed-table-info__description">
          <Highlighter
            highlightClassName="c-feed-table-info__highlight"
            searchWords={
              article.tags ? [...article.tags.map((art) => art.tagName)] : []
            }
            textToHighlight={limitCharacters(getFirstMentionText(), 245)}
          />
        </p>
      </div>
      <div className="c-feed-table-info__badges">
        {isSyndicated && (
          <OpenFolderButton
            isActive={isVisibleSyndicated}
            action={showSyndicated}
            total={syndicatedLength}
          />
        )}
        {article && article.articleUrl.includes("nlaapi") && (
          <NLATooltip
            content={() => (
              <span
                className="c-feed-table-info__link"
                onClick={() => handleOpenUrl(article)}
                aria-hidden="true"
              />
            )}
          />
        )}
        {article && !article.articleUrl.includes("nlaapi") && (
          <a href={article.articleUrl} rel="noreferrer" target="_blank">
            <span className="c-feed-table-info__link" aria-hidden="true" />
          </a>
        )}

        {(isSmallDesktop || isLowerThanSmallDesktop) && (
          <OptionsButton
            id={`feed-article-${article.articleId}`}
            color={DARK}
            className="c-feed-table-info__options-button"
            options={[
              {
                label: "Bulk tag adding",
                action: openModal,
                icon: "tags",
              },
              {
                label: "Export to PDF",
                showTooltip: article.articleUrl.includes("nlaapi"),
                action: () => {
                  exportPDF(user, dateRange, [article]);
                },
                icon: "export",
              },
              {
                label: "Export to PPT",
                showTooltip: article.articleUrl.includes("nlaapi"),
                action: () => {
                  exportPPT(user, dateRange, [article]);
                },
                icon: "export",
              },
              {
                label: "Export to CSV",
                action: () => {
                  exportCSV(user, dateRange, [article]);
                },
                icon: "export",
              },
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default FeedInfoColumn;
