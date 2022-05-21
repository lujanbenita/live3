import queryData from "./queryData";

async function postArticleCount(data) {
  return queryData("/api/dashboard/articlecount", data);
}

export default postArticleCount;
