import axios from "axios";

async function getPublications(
  data = {
    page: 1,
    pageSize: 25,
    searchText: "",
  }
) {
  const { data: response } = await axios.post("/api/search/publication", data);

  return response;
}

export default getPublications;
