import axios from "axios";
import { buildObjectSearch } from "../../redux/search/searchUtils";

import postReputationComparativeTimeSeries from "../dashboard/ri/postReputationComparativeTimeSeries";
import postReputationCompanyComparison from "../dashboard/ri/postReputationCompanyComparison";
import postReputationTopIssueVsCompetitors from "../dashboard/ri/postReputationTopIssueVsCompetitors";
import postReputationTopIssueVsCompetitorsSet from "../dashboard/ri/postReputationTopIssueVsCompetitorSet";

export const postPeersRI = async (searchObject) => {
  const objectReq = buildObjectSearch(searchObject);

  const data = await axios
    .all([
      postReputationComparativeTimeSeries(objectReq),
      postReputationCompanyComparison(objectReq),
      postReputationTopIssueVsCompetitors(objectReq),
      postReputationTopIssueVsCompetitorsSet(objectReq),
    ])
    .then(
      axios.spread((...responses) => ({
        comparativeSeries: responses[0],
        companyComparison: responses[1],
        clientVsCompetitors: responses[2],
        clientVsCompetitorsAvg: responses[3],
      }))
    );

  return data;
};
