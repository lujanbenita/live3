import axios from "axios";

async function getStakeholders(query) {
  const { data } = await axios.post(
    "/api/search/tag?tagTypeNames=Stakeholder",
    query
  );

  return { items: data.results, total: data.total };
}

export default getStakeholders;
