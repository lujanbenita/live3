import axios from "axios";
import { buildObjectSearch } from "@/redux/search/searchUtils";
import postMostImpactfulIssues from "./issues/postMostImpactfulIssues";
import postMostVisibleIssuesVsPeers from "./issues/postMostVisibleIssuesVsPeers";
import postTopIssuesByVolume from "./issues/postTopIssuesByVolume";

export const postDashboardIssuesRI = async (searchObject) => {
  const objectReq = buildObjectSearch(searchObject);

  const data = await axios
    .all([
      postMostImpactfulIssues(objectReq),
      postTopIssuesByVolume(objectReq),
      postMostVisibleIssuesVsPeers(objectReq),
    ])
    .then(
      axios.spread((...responses) => ({
        mostImpactfulIssues: responses[0],
        topIssuesByVolume: responses[1],
        mostVisibleIssuesVsPeers: responses[2],
      }))
    );

  return data;
};
