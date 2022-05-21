import axios from "axios";

async function postSavedSearch(data) {
  const { data: response } = await axios.post("/api/search/savedSearch", data);
  return response;
}

export default postSavedSearch;
