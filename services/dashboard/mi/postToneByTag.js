import queryData from "../queryData";

const formatCallResponse = (response) => {
  const arr = {};
  response.forEach((data) => {
    if (!arr[data.tagName]) {
      const defaultIntervalData = {
        tonePercent: 0,
        articleCount: 0,
      };

      const object = {
        tagName: data.tagName,
        intervals: [
          { tone: "Negative", ...defaultIntervalData },
          { tone: "Neutral", ...defaultIntervalData },
          { tone: "Positive", ...defaultIntervalData },
        ],
      };
      arr[data.tagName] = object;
    }

    const dataToPush = {
      tone: data.tone,
      tonePercent: data.tonePercent,
      articleCount: data.articleCount,
    };

    arr[data.tagName].intervals = arr[data.tagName].intervals.map((interval) =>
      dataToPush.tone === interval.tone ? dataToPush : interval
    );
  });

  return Object.values(arr);
};

async function postToneByTag(data) {
  const response = await queryData("/api/dashboard/tonebytag", data);
  if (response.success) {
    response.data = formatCallResponse(response.data?.results);
  }
  return response;
}

export default postToneByTag;
