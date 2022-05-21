import queryData from "../queryData";

const formatCallResponse = (results) => {
  const arr = {};
  results.forEach((data) => {
    if (!arr[data.tagId]) {
      const object = {
        tagId: data.tagId,
        tagName: data.tagName,
        intervals: [],
      };
      arr[data.tagId] = object;
    }
    arr[data.tagId].intervals.push({
      sourceTypeName: data.sourceTypeName,
      sovPercent: data.sovPercent,
      articleCount: data.articleCount,
    });
  });

  const arrCategories = [];
  results.forEach((data) => {
    if (!arrCategories.includes(data.sourceTypeName)) {
      arrCategories.push(data.sourceTypeName);
    }
  });

  const result = Object.values(arr)
    .map((tag) => {
      const tagCategories = [];

      tag.intervals.forEach((interval) => {
        tagCategories.push(interval.sourceTypeName);
      });

      arrCategories
        .filter((category) => !tagCategories.includes(category))
        .forEach((category) => {
          tag.intervals.push({
            sourceTypeName: category,
            sovPercent: 0,
            articleCount: 0,
          });
        });

      tag.intervals.sort((a, b) =>
        a.sourceTypeName.localeCompare(b.sourceTypeName)
      );

      return tag;
    })
    .reverse();

  return result;
};

async function postTagSovBySourceType(data) {
  const response = await queryData("/api/dashboard/tagsovbysourcetype", data);
  if (response.success) {
    response.data = formatCallResponse(response.data?.results);
  }
  return response;
}

export default postTagSovBySourceType;
