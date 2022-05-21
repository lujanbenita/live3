import queryData from "../queryData";

async function postSummary(data) {
  const skeletonResponse = {
    articleCount: "-",
    articleCountChangePercent: "-",
    avgMentionsPerDay: "-",
    avgMentionsPerDayChangePercent: "-",
    negativeMentionsCount: "-",
    negativeMentionsPercent: "-",
    negativeMentionsPercentChangePercent: "-",
    negativeVisibility: "-",
    negativeVisibilityPercent: "-",
    negativeVisibilityPercentChangePercent: "-",
    neutralMentionsCount: "-",
    neutralMentionsPercent: "-",
    neutralMentionsPercentChangePercent: "-",
    neutralVisibility: "-",
    neutralVisibilityPercent: "-",
    neutralVisibilityPercentChangePercent: "-",
    positiveMentionsCount: "-",
    positiveMentionsPercent: "-",
    positiveMentionsPercentChangePercent: "-",
    positiveVisibility: "-",
    positiveVisibilityPercent: "-",
    positiveVisibilityPercentChangePercent: "-",
  };

  const getData = () => {
    if (!data.selectedTag) return data;
    return { ...data, tags: [data.selectedTag] };
  };

  return queryData(
    "/api/dashboard/summary",
    // "http://localhost:3000/api/test?endpoint=summary&test=2",
    getData(),
    skeletonResponse
  );
}

export default postSummary;
