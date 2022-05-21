import axios from "axios";

export default async function deleteSavedSearch(id) {
  const { data } = await axios.delete(`/api/search/savedSearch/${id}`);
  return data;
}
