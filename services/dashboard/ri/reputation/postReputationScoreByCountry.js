import queryData from "@/services/dashboard/queryData";

// import mockData from "@/data/mocks/sentimentScoreByCountry";

async function postReputationScoreByCountry(data) {
  const skeletonResponse = [];

  const response = await queryData(
    "/api/reputation-intelligence/reputation/reputation-score-by-country",
    data,
    skeletonResponse,
    (responseData) =>
      responseData.map((item) => ({
        countryCode: item.countryCode,
        name: item.countryName,
        value: item.reputationScore,
      }))
  );

  // response.data = mockData;

  return response;
}

export default postReputationScoreByCountry;
