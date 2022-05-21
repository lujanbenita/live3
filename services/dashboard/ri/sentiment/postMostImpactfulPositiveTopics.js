import queryData from "@/services/dashboard/queryData";

async function postMostImpactfulPositiveTopics(data) {
  const skeletonResponse = [];

  return queryData(
    "/api/reputation-intelligence/sentiment/top-positive-issues",
    data,
    skeletonResponse,
    (responseData) =>
      responseData
        .sort((a, b) => (a.rank > b.rank ? 1 : -1))
        .map((topic) => ({
          tagName: topic.issueTag,
          tagId: topic.issueTagId,
          rank: topic.rank,
          score: topic.sentimentScore,
          impactScore: topic.impactScore,
          volume: Number.parseInt(topic.volume, 10),
        }))
  );
}

export default postMostImpactfulPositiveTopics;
