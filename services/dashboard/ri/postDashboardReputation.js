import axios from "axios";
import { buildObjectSearch } from "@/redux/search/searchUtils";

import postReputationScore from "@/services/dashboard/ri/reputation/postReputationScore";
import postReputationRankingVsPeers from "@/services/dashboard/ri/reputation/postReputationRankingVsPeers";
import postReputationScoreByCountry from "./reputation/postReputationScoreByCountry";
import postReputationRanking from "./reputation/postReputationRanking";
import postReputationQuarterlyTrend from "./reputation/postReputationQuarterlyTrend";
import postReputationOverTime from "./reputation/postReputationOverTime";

export const postDashboardReputation = async (searchObject) => {
  const objectReq = buildObjectSearch(searchObject);

  const data = await axios
    .all([
      postReputationScore(objectReq),
      postReputationRankingVsPeers(objectReq),
      postReputationScoreByCountry(objectReq),
      postReputationRanking(objectReq),
      postReputationQuarterlyTrend(objectReq),
      postReputationOverTime(objectReq),
    ])
    .then(
      axios.spread((...responses) => ({
        reputationScore: responses[0],
        reputationRankingVsPeers: responses[1],
        reputationScoreByCountry: responses[2],
        reputationRanking: responses[3],
        reputationQuarterlyTrend: responses[4],
        reputationOverTime: responses[5],
      }))
    );

  return data;
};
