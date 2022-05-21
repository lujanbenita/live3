import queryData from "../queryData";

async function postTopToneTag(data) {
  const skeletonResponse = {
    base64TagImage: "-",
    negativeMentionsPercent: "-",
    neutralMentionsPercent: "-",
    positiveMentionsPercent: "-",
    positiveOrNeutralMentionsPercentChangePercent: "-",
    tagId: "-",
    tagName: "-",
  };

  return queryData(
    "/api/dashboard/toptonetag",
    // "http://localhost:3000/api/test?endpoint=toptonetag&test=2",
    data,
    skeletonResponse
  );
}

export default postTopToneTag;
