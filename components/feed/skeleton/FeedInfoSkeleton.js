import Skeleton from "@material-ui/lab/Skeleton";

const FeedInfoSkeleton = () => (
  <div>
    <Skeleton
      variant="text"
      width="80%"
      height="23px"
      style={{ marginTop: "4px" }}
    />
    <Skeleton variant="text" width="60%" style={{ marginTop: "0px" }} />
    <Skeleton
      variant="text"
      width="100%"
      style={{ marginTop: "8px" }}
      height="15px"
    />
    <Skeleton variant="text" width="100%" height="15px" />
  </div>
);

export default FeedInfoSkeleton;
