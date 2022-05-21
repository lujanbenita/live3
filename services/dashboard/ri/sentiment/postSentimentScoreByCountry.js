import queryData from "@/services/dashboard/queryData";

// import mockData from "@/data/mocks/sentimentScoreByCountry";

async function postSentimentScoreByCountry(data) {
  const skeletonResponse = [];

  const response = await queryData(
    "/api/reputation-intelligence/sentiment/sentiment-score-by-country",
    data,
    skeletonResponse,
    (responseData) =>
      responseData.map((item) => ({
        name: item.countryName,
        value: item.sentimentScore,
      }))
  );

  // response.data = mockData;

  return response;
}

export default postSentimentScoreByCountry;
