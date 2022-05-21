import queryData from "@/services/dashboard/queryData";

// import mockData from "@/data/mocks/sentimentRanking";

async function postSentimentRanking(data) {
  const skeletonResponse = [];

  return queryData(
    "/api/reputation-intelligence/sentiment/sentiment-position-table",
    data,
    skeletonResponse,
    (responseData) =>
      responseData.map((item) => ({
        name: item.name,
        logo: item.logo,
        rank: item.position,
        rankChange: item.positionChange,
        score: item.sentimentScore
          ? Number(item.sentimentScore.toFixed(2))
          : null,
        scoreChange: item.sentimentScoreChange
          ? Number(item.sentimentScoreChange.toFixed(2))
          : null,
        id: item.tagId,
      }))
  );
}

export default postSentimentRanking;
