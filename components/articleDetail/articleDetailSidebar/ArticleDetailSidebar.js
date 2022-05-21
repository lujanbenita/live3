import CirculationWidget from "../../common/widgets/CirculationWidget";
import SocialStatsWidget from "../../common/widgets/SocialStatsWidget";

const ArticleDetailSidebar = ({ article }) => (
  <div className="c-article-detail-sidebar">
    <CirculationWidget
      article={article}
      extraClass="c-article-detail-sidebar__circulation"
      addButtonModal="true"
    />
    {article.publication === "Twitter" && (
      <SocialStatsWidget
        visitCount={10000}
        publication={article.publication}
        className="c-article-detail-sidebar__social"
        retweetCount={article.retweetCount}
        favouriteCount={article.favouriteCount}
      />
    )}
  </div>
);

export default ArticleDetailSidebar;
