import queryData from "@/services/dashboard/queryData";

async function postMostVisibleIssuesVsPeers(data) {
  const skeletonResponse = [];

  const response = await queryData(
    "/api/reputation-intelligence/issues/most-visible-issues-vs-peers",
    data,
    skeletonResponse,
    (responseData) => {
      const issues = responseData.focusIssues
        .sort((a, b) => (a.issueRank <= b.issueRank ? -1 : 1))
        .map((issue) => ({
          issueTag: issue.issueTag,
          issueTagId: issue.issueTagId,
          targetVisibility: issue.percentage,
          competitorsVisibility: responseData.peerIssues.find(
            (item) => item.issueTagId === issue.issueTagId
          ).percentage,
        }));

      return {
        issues,
        logo: responseData.logo,
        name: responseData.targetName,
        tagId: responseData.targetId,
        totalVisibility: responseData.targtVisibility,
      };
    }
  );

  return response;
}

export default postMostVisibleIssuesVsPeers;
