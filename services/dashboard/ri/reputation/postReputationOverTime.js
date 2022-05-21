import queryData from "@/services/dashboard/queryData";

// import mockData from "@/data/mocks/sentimentTrendVsPeers";

async function postReputationOverTime(data) {
  const skeletonResponse = [];

  return queryData(
    "/api/reputation-intelligence/reputation/reputation-over-time",
    data,
    skeletonResponse,
    (responseData) =>
      responseData.map((item) => ({
        date: item.date,
        score: item.reputation,
        id: item.tagId,
        name: item.name,
      }))
  );
}

export default postReputationOverTime;
