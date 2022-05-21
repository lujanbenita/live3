import queryData from "@/services/dashboard/queryData";

async function postReputationScore(data) {
  const skeletonResponse = {
    name: "-",
    logo: null,
    reputation: null,
    reputationChange: 0,
    quarter: null,
    year: null,
    tagId: null,
  };

  return queryData(
    "/api/reputation-intelligence/reputation/reputation-score",
    data,
    skeletonResponse,
    (responseData) => ({
      name: responseData.name,
      logo: responseData.logo,
      score: responseData.reputation,
      change: responseData.reputationChange,
      quarter: responseData.quarter,
      year: responseData.year,
    })
  );
}

export default postReputationScore;
