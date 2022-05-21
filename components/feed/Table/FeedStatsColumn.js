import CirculationWidget from "components/common/widgets/CirculationWidget";
import { useSelector } from "react-redux";
import MultipleToneWidget from "components/common/widgets/MultipleToneWidget";
import OptionsButton from "components/common/buttons/OptionsButton";
import SocialStatsWidget from "components/common/widgets/SocialStatsWidget";
import { useResponsive } from "utils/hooks/useResponsive";
import { DARK } from "../../../utils/colors";

import {
  exportCSV,
  exportPDF,
  exportPPT,
} from "../../../services/feedServices/exportServices";

const FeedStatsColumn = ({ article, isLoading, openModal, isFirstArticle }) => {
  const { isSmallDesktop, isLowerThanSmallDesktop } = useResponsive();
  const user = useSelector((state) => state.user);
  const dateRange = useSelector((state) => state.searchObject.dateRange);
  const searchObjectTags = useSelector((state) => state.searchObject.tags);
  const showToneWidget =
    searchObjectTags.length > 0 &&
    searchObjectTags.filter((tag) => tag.tagTypeName !== "Text").length > 0;
  return (
    <div className="c-feed-table-stats">
      <div className="c-feed-table-stats__first-row">
        <CirculationWidget
          article={article}
          isLoading={isLoading}
          isFirstArticle={isFirstArticle}
          extraClass="c-feed-table-stats__circulation-widget"
        />
        {!isLoading && (
          <>
            <div className="c-feed-table-stats__tone-widget">
              {showToneWidget && (
                <MultipleToneWidget
                  tags={article.tags}
                  id={article.articleId}
                />
              )}
            </div>
            {!isSmallDesktop && !isLowerThanSmallDesktop && (
              <OptionsButton
                id={`feed-stats-${article.articleId}`}
                color={DARK}
                className="c-feed-table-stats__options-button"
                options={[
                  {
                    label: "Add tags",
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
          </>
        )}
      </div>
      <div className="c-feed-table-stats__second-row">
        {article.publication === "Twitter" && (
          <SocialStatsWidget
            publication={article.publication}
            isLoading={isLoading}
            retweetCount={article.retweetCount}
            favouriteCount={article.favouriteCount}
          />
        )}
      </div>
    </div>
  );
};

export default FeedStatsColumn;
