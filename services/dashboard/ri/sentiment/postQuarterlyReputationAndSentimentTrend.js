import queryData from "@/services/dashboard/queryData";

import quarterlyReputationAndSentimentTrendMockData from "@/data/mocks/quarterlyReputationAndSentimentTrend";

async function postQuarterlyReputationAndSentimentTrend(data) {
  const skeletonResponse = [];

  const response = await queryData(
    "/api/reputation-intelligence/reputation/quarterly-reputation-and-sentiment-trend",
    data,
    skeletonResponse,
    (responseData) =>
      responseData.map((interval) => ({
        date: interval.date,
        score: interval.sentimentScore,
        tagName: interval.name,
        tagId: interval.tagId,
        trend: interval.sentimentTrend,
      }))
  );

  response.data = quarterlyReputationAndSentimentTrendMockData;

  return response;
}

export default postQuarterlyReputationAndSentimentTrend;
