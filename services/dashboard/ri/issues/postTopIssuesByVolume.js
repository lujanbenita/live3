import queryData from "@/services/dashboard/queryData";

async function postTopIssuesByVolume(data) {
  const skeletonResponse = [];

  const response = await queryData(
    "/api/reputation-intelligence/issues/top-issues-by-volume",
    data,
    skeletonResponse,
    (responseData) =>
      responseData
        .sort((a, b) => (a.totalVolume <= b.totalVolume ? 1 : -1))
        .map((item) => ({
          issueTag: item.issueTag,
          issueTagId: item.issueTagId,
          negativeVolume: item.negativeVolume,
          neutralVolume: item.neutralVolume,
          positiveVolume: item.positiveVolume,
          totalVolume: item.totalVolume,
          sentimentRank: item.sentimentRank,
        }))
  );

  return response;
}

export default postTopIssuesByVolume;
