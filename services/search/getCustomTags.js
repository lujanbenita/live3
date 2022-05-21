import axios from "axios";

async function getCustomTags(query) {
  const { data } = await axios.post("/api/search/custom-tag", query);

  return { items: data.results, total: data.total };
}

export default getCustomTags;
