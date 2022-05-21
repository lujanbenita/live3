import queryData from "@/services/dashboard/queryData";

async function postSentimentRankingVsPeers(data) {
  const skeletonResponse = {
    name: "-",
    logo: null,
    position: "-",
    positionChange: null,
  };

  return queryData(
    "/api/reputation-intelligence/sentiment/sentiment-position",
    data,
    skeletonResponse,
    (responseData) => ({
      name: responseData.name,
      logo: responseData.logo,
      position: responseData.position ?? "-",
      change: responseData.positionChange,
    })
  );
}

export default postSentimentRankingVsPeers;
