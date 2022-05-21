import axios from "axios";

async function getTopics(query) {
  const { data } = await axios.post(
    "/api/search/tag?tagTypeNames=Topic",
    query
  );

  return { items: data.results, total: data.total };
}

export default getTopics;
