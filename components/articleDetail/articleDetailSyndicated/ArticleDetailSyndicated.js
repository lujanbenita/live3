import CirculationWidget from "../../common/widgets/CirculationWidget";
import LanguageWidget from "../../common/widgets/LanguageWidget";
import SocialStatsWidget from "../../common/widgets/SocialStatsWidget";
import { ExternalLinkIcon } from "../../../icons/IconsLibrary";
import { exportNLA } from "../../../services/feedServices/exportServices";
import NLATooltip from "../../tooltip/NLATooltip";

const ArticleDetailSyndicated = ({ syndicatedArticles, isVisible }) => {
  const handleOpenUrl = async ({
    articleId,
    truncHeadline,
    publication,
    loadDate,
  }) => {
    await exportNLA(articleId, `${truncHeadline} - ${publication}`, loadDate);
  };

  return (
    isVisible && (
      <div className="c-article-detail-syndicated">
        <span className="c-article-detail-syndicated__title">
          Syndicated articles
        </span>

        {syndicatedArticles.map((article, i) => (
          <div
            id="syndicated"
            className="c-article-detail-syndicated__container"
            key={article.articleId || i}
          >
            <div className="c-article-detail-syndicated__circulation-widget">
              <CirculationWidget
                article={article}
                className="c-syndicated-article__circulation-widget"
                hideAddButton
              />
            </div>
            <div className="c-article-detail-syndicated__info">
              <span className="c-syndicated-article__author">
                {article.author || "Unknown Author"}
              </span>
              <div className="c-syndicated-article__separator"></div>
              <LanguageWidget
                isoLanguageCode={article.isoLanguageCode}
                countryCode={article.countryCode}
                country={article.countryName}
                className="c-syndicated-article__language"
              />
            </div>
            <div className="c-article-detail-syndicated__stats">
              <SocialStatsWidget
                isSyndicated
                article={article}
                visitCount={12000}
                retweetCount={article.retweetCount}
                favouriteCount={article.favouriteCount}
              />
            </div>

            <span className="c-syndicated-article__link">
              {article.articleUrl.includes("nlaapi") && (
                <NLATooltip
                  content={() => (
                    <ExternalLinkIcon
                      onClick={() => handleOpenUrl(article)}
                      className="c-syndicated-article__external-link"
                    />
                  )}
                />
              )}
              {!article.articleUrl.includes("nlaapi") && (
                <a href={article.articleUrl} rel="noreferrer" target="_blank">
                  <ExternalLinkIcon className="c-syndicated-article__external-link" />
                </a>
              )}
            </span>
          </div>
        ))}
      </div>
    )
  );
};

export default ArticleDetailSyndicated;
