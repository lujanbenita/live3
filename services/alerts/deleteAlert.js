import axios from "axios";

export default async function deleteAlert(id) {
  const { data } = await axios.delete(`/api/alerts/${id}`);
  return data;
}
