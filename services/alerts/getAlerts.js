import axios from "axios";

export default async function getAlerts() {
  const { data: response } = await axios.get("/api/alerts");

  response.results.sort((a, b) => (a.alertId < b.alertId ? 1 : -1));

  return response;
}
