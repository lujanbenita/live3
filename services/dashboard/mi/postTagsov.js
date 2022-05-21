import queryData from "../queryData";

async function postTagsov(data) {
  return queryData("/api/dashboard/tagsov", data);
}

export default postTagsov;
