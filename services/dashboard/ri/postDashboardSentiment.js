import axios from "axios";
import { buildObjectSearch } from "@/redux/search/searchUtils";

import postSentimentScore from "@/services/dashboard/ri/sentiment/postSentimentScore";
import postSentimentRankingVsPeers from "@/services/dashboard/ri/sentiment/postSentimentRankingVsPeers";
import postMostImpactfulPositiveTopics from "@/services/dashboard/ri/sentiment/postMostImpactfulPositiveTopics";
import postMostImpactfulNegativeTopics from "@/services/dashboard/ri/sentiment/postMostImpactfulNegativeTopics";
import postDailySentimentAndTrend from "@/services/dashboard/ri/sentiment/postDailySentimentAndTrend";
import postSentimentScoreByCountry from "@/services/dashboard/ri/sentiment/postSentimentScoreByCountry";
import postSentimentRanking from "@/services/dashboard/ri/sentiment/postSentimentRanking";
import postSentimentTrendVsPeers from "@/services/dashboard/ri/sentiment/postSentimentTrendVsPeers";

export const postDashboardSentiment = async (searchObject) => {
  const objectReq = buildObjectSearch(searchObject);

  const data = await axios
    .all([
      postSentimentScore(objectReq),
      postSentimentRankingVsPeers(objectReq),
      postMostImpactfulPositiveTopics(objectReq),
      postMostImpactfulNegativeTopics(objectReq),
      postDailySentimentAndTrend(objectReq),
      postSentimentScoreByCountry(objectReq),
      postSentimentRanking(objectReq),
      postSentimentTrendVsPeers(objectReq),
    ])
    .then(
      axios.spread((...responses) => ({
        sentimentScore: responses[0],
        sentimentRankingVsPeers: responses[1],
        mostImpactfulPositiveTopics: responses[2],
        mostImpactfulNegativeTopics: responses[3],
        dailySentimentAndTrend: responses[4],
        sentimentScoreByCountry: responses[5],
        sentimentRanking: responses[6],
        sentimentTrendVsPeers: responses[7],
      }))
    );

  return data;
};
