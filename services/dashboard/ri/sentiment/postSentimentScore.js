import queryData from "@/services/dashboard/queryData";

async function postSentimentScore(data) {
  const skeletonResponse = {
    name: "-",
    logo: null,
    score: null,
    scoreChange: 0,
  };

  return queryData(
    "/api/reputation-intelligence/sentiment/sentiment-score",
    data,
    skeletonResponse,
    (responseData) => ({
      name: responseData.name,
      logo: responseData.logo,
      score: responseData.score,
      change: responseData.scoreChange,
    })
  );
}

export default postSentimentScore;
