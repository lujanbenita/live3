import OptionsButton from "components/common/buttons/OptionsButton";
import OpenFolderButton from "components/common/buttons/OpenFolderButton";
import TranslateButton from "components/common/buttons/TranslateButton";

import { useSelector, useDispatch } from "react-redux";

import {
  exportCSV,
  exportPDF,
  exportPPT,
} from "../../../services/feedServices/exportServices";

import {
  fetchArticleDetail,
  translateArticleDetail,
} from "../../../redux/articleDetail/articleDetailActions";

import { DARK } from "../../../utils/colors";

const ArticleDetailHeader = ({
  close,
  syndicatedArticles,
  setShowSyndicated,
  showSyndicated,
  article,
  isoLanguageCode,
}) => {
  const user = useSelector((state) => state.user);
  const dateRange = useSelector((state) => state.searchObject.dateRange);
  const dispatch = useDispatch();

  const handleTranslate = (lang) => {
    if (lang === isoLanguageCode) {
      dispatch(fetchArticleDetail(article));
    } else {
      dispatch(translateArticleDetail(article, lang));
    }
  };

  if (!article) return <></>;

  return (
    <div className="c-article-detail-header">
      <button
        type="button"
        onClick={close}
        aria-hidden="true"
        className="c-article-detail-header__back-button"
      >
        Back
      </button>
      <div className="c-article-detail-header__actions">
        {syndicatedArticles && (
          <OpenFolderButton
            action={setShowSyndicated}
            total={syndicatedArticles.length + 1}
            isActive={showSyndicated}
          />
        )}
        <TranslateButton
          id={`article-${article.articleId}`}
          options={[
            {
              label: "English",
              action: () => {
                handleTranslate("en");
              },
            },
            {
              label: "French",
              action: () => {
                handleTranslate("fr");
              },
            },
            {
              label: "German",
              action: () => {
                handleTranslate("de");
              },
            },
            {
              label: "Italian",
              action: () => {
                handleTranslate("it");
              },
            },
            {
              label: "Portuguese",
              action: () => {
                handleTranslate("pt");
              },
            },
            {
              label: "Spanish",
              action: () => {
                handleTranslate("es");
              },
            },
          ]}
        />
        <div className="c-article-detail-header__separator"></div>
        <OptionsButton
          id={`article-detail-${article.articleId}`}
          color={DARK}
          options={[
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
      </div>
    </div>
  );
};

export default ArticleDetailHeader;
