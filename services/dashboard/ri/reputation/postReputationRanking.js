import queryData from "@/services/dashboard/queryData";

// import mockData from "@/data/mocks/sentimentRanking";

async function postReputationRanking(data) {
  const skeletonResponse = [];

  return queryData(
    "/api/reputation-intelligence/reputation/reputation-position-table",
    data,
    skeletonResponse,
    (responseData) =>
      responseData.map((item) => ({
        name: item.name,
        logo: item.logo,
        rank: item.position,
        rankChange: item.positionChange ?? 0,
        score: item.reputation ? Number(item.reputation.toFixed(2)) : null,
        scoreChange: item.reputationChange
          ? Number(item.reputationChange.toFixed(2))
          : null,
        id: item.tagId,
      }))
  );
}

export default postReputationRanking;
