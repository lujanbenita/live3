import queryData from "../queryData";

async function postTopVolumeTag(data) {
  const skeletonResponse = {
    articleCount: "-",
    articleCountChangePercent: "-",
    base64TagImage: "-",
    tagId: "-",
    tagName: "-",
  };

  return queryData(
    "/api/dashboard/topvolumetag",
    // "http://localhost:3000/api/test?endpoint=postTopVolumeTag&test=2",
    data,
    skeletonResponse
  );
}

export default postTopVolumeTag;
