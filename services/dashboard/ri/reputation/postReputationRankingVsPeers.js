import queryData from "@/services/dashboard/queryData";

async function postReputationRankingVsPeers(data) {
  const skeletonResponse = {
    name: "-",
    logo: null,
    position: null,
    positionChange: 0,
    quarter: null,
    year: null,
  };

  return queryData(
    "/api/reputation-intelligence/reputation/reputation-position",
    data,
    skeletonResponse,
    (responseData) => ({
      name: responseData.name,
      logo: responseData.logo,
      position: responseData.position,
      change: responseData.positionChange,
      quarter: responseData.quarter,
      year: responseData.year,
    })
  );
}

export default postReputationRankingVsPeers;
