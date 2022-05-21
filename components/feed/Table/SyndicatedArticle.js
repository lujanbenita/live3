// import WeightBar from "../../common/widgets/WeightBar";
import { useState } from "react";

import Checkbox from "components/common/inputs/Checkbox";
import LanguageWidget from "components/common/widgets/LanguageWidget";
import MultipleWeightBar from "components/common/widgets/MultipleWeightBar";
import SocialStatsWidget from "components/common/widgets/SocialStatsWidget";
import CirculationWidget from "components/common/widgets/CirculationWidget";
import { ExternalLinkIcon } from "icons/IconsLibrary";
import { limitCharacters } from "utils/formatters";
import { useDispatch, useSelector } from "react-redux";

import { getAuthorsLists } from "../../../redux/lists/listsActions";
import {
  updateAuthorsList,
  fetchAuthorsList,
} from "../../../services/listsServices/listsServices";
import AddButton from "../../common/buttons/AddButton";
import { exportNLA } from "../../../services/feedServices/exportServices";
import NLATooltip from "../../tooltip/NLATooltip";

const SyndicatedArticle = ({ isSelected, select, article }) => {
  const {
    truncHeadline,
    tags,
    author,
    countryCode,
    countryName,
    isoLanguageCode,
    articleId,
    articleUrl,
    publication,
    loadDate,
  } = article;
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);
  const keyAuthorsLists = useSelector((state) => state.lists.keyAuthorsLists);

  const dispatch = useDispatch();

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

  const handleOpenUrl = async () => {
    await exportNLA(articleId, `${truncHeadline} - ${publication}`, loadDate);
  };

  return (
    <div className="c-syndicated-article">
      <div
        className="c-syndicated-article__checkbox"
        onClick={select}
        role="checkbox"
        aria-hidden="true"
        aria-checked={isSelected}
      >
        <Checkbox isChecked={isSelected} />
      </div>
      <div className="c-syndicated-article__main">
        <div className="c-syndicated-article__title">
          <span
            className="c-syndicated-article__headline"
            title={truncHeadline}
          >
            {limitCharacters(truncHeadline, 45)}
          </span>
          {tags && <MultipleWeightBar tags={tags} id={articleId} />}
        </div>
        <div className="c-syndicated-article__circulation">
          <CirculationWidget
            article={article}
            className="c-syndicated-article__circulation-widget"
          />
        </div>
        <div className="c-syndicated-article__info">
          <div className="c-feed-table-info__author-container">
            <span
              className={`c-feed-table-info__author${
                author === "uncredited"
                  ? "c-feed-table-info__separator--padding-right"
                  : ""
              }`}
            >
              {author}
            </span>
            {author !== "uncredited" && (
              <AddButton
                label="Save Author to Keylist"
                handleLoadOptions={handleLoadAuthors}
                isLoadingOptions={isLoadingOptions}
                options={keyAuthorsLists}
                action={(list) => {
                  handleAddToAuthorsList(list);
                }}
                noOptionsMessage="Theres is no Key List created, please create a list"
                position="top"
              />
            )}
          </div>
          <div className="c-syndicated-article__separator"></div>
          <LanguageWidget
            isoLanguageCode={isoLanguageCode}
            countryCode={countryCode}
            country={countryName}
            className="c-syndicated-article__language"
          />
        </div>
        <div className="c-syndicated-article__stats">
          <SocialStatsWidget
            isSyndicated
            article={article}
            visitCount={12000}
            retweetCount={article.retweetCount}
            favouriteCount={article.favouriteCount}
          />
        </div>

        {articleUrl.includes("nlaapi") && (
          <NLATooltip
            content={() => (
              <ExternalLinkIcon
                onClick={() => handleOpenUrl(article)}
                className="c-syndicated-article__external-link"
              />
            )}
          />
        )}
        {!articleUrl.includes("nlaapi") && (
          <a href={articleUrl} rel="noreferrer" target="_blank">
            <ExternalLinkIcon className="c-syndicated-article__external-link" />
          </a>
        )}
      </div>
    </div>
  );
};

export default SyndicatedArticle;
