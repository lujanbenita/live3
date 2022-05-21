import queryData from "@/services/dashboard/queryData";

async function postMostImpactfulIssues(data) {
  const skeletonResponse = [];

  const response = await queryData(
    "/api/reputation-intelligence/issues/most-impactful-issues",
    data,
    skeletonResponse,
    (responseData) =>
      responseData
        .map((item) => ({
          issueTag: item.issueTag,
          issueTagId: item.issueTagId,
          sentimentScore: item.sentimentScore,
        }))
        .sort((a, b) => (a.sentimentScore > b.sentimentScore ? -1 : 1))
  );

  return response;
}

export default postMostImpactfulIssues;
