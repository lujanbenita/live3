import Skeleton from "@material-ui/lab/Skeleton";

const FeedInfoSkeleton = () => (
  <div>
    <Skeleton variant="h3" width="80%" style={{ marginTop: "4px" }} />
    <Skeleton variant="text" width="60%" style={{ marginTop: "0px" }} />
    <Skeleton variant="text" width="100%" style={{ marginTop: "8px" }} />
    <Skeleton variant="text" width="100%" />
  </div>
);

export default FeedInfoSkeleton;
