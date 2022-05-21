import axios from "axios";

async function getAuthors(
  data = {
    page: 1,
    pageSize: 25,
    searchText: "",
  }
) {
  const { data: response } = await axios.post("/api/search/author", data);

  return response;
}

export default getAuthors;
