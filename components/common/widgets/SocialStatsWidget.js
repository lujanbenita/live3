import { Skeleton } from "@material-ui/lab";
import { TwitterIcon } from "icons/IconsLibrary";

const SocialStatsWidget = ({
  publication,
  retweetCount,
  favouriteCount,
  isLoading,
  isSyndicated,
  className = "",
}) =>
  !isLoading ? (
    <div className={`c-social-stats-widget ${className}`}>
      {publication &&
        (publication.includes("Twitter") || publication.includes("witter")) && (
          <div className="c-feed-table-info__twitter">
            <TwitterIcon />
          </div>
        )}
      <div className="c-social-stats-widget__indicators-container">
        <span
          className={`c-social-stats-widget__retweet ${
            isSyndicated ? "c-social-stats-widget__retweet--syndicated" : ""
          }`}
        >
          {retweetCount}
        </span>
        <span
          className={`c-social-stats-widget__favourite ${
            isSyndicated ? "c-social-stats-widget__favourite--syndicated" : ""
          }`}
        >
          {favouriteCount}
        </span>
      </div>
    </div>
  ) : (
    <div className="c-social-stats-widget">
      <Skeleton variant="text" width="70px" />
      <Skeleton variant="text" width="70px" />
      <Skeleton variant="text" width="70px" />
    </div>
  );

export default SocialStatsWidget;
