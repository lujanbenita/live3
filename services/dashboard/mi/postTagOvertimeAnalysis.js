import queryData from "../queryData";

const formatCallResponse = (response) => {
  const arr = {};
  response.forEach((data) => {
    if (!arr[data.tagId]) {
      const object = {
        tagId: data.tagId,
        tagName: data.tagName,
        intervals: [],
      };
      arr[data.tagId] = object;
    }
    arr[data.tagId].intervals.push({
      datePeriod: data.datePeriod,
      amplification: data.amplification,
      articleCount: data.articleCount,
    });
  });

  const arrPeriods = [];
  response.forEach((data) => {
    if (!arrPeriods.includes(data.datePeriod)) {
      arrPeriods.push(data.datePeriod);
    }
  });

  const result = Object.values(arr)
    .map((tag) => {
      const tagPeriods = [];

      tag.intervals.forEach((interval) => {
        tagPeriods.push(interval.datePeriod);
      });

      arrPeriods
        .filter((period) => !tagPeriods.includes(period))
        .forEach((period) => {
          tag.intervals.push({
            datePeriod: period,
            amplification: 0,
            articleCount: 0,
          });
        });

      return tag;
    })
    .reverse();
  return result;
};

async function postTagOvertimeAnalysis(data) {
  const response = await queryData("/api/dashboard/tagovertimeanalysis", data);
  if (response.success) {
    response.data = formatCallResponse(response.data?.results);
  }
  return response;
}

export default postTagOvertimeAnalysis;
