import axios from "axios";

async function getFilter(queryParams = []) {
  const params = `?${queryParams
    .map(({ key, value }) => `${key}=${value}`)
    .join("&")}`;
  const { data: response } = await axios.get(`/api/filters${params}`);

  return response;
}

export default getFilter;
