import axios from "axios";

import formatTags from "utils/servicesFormatter/formatTags";
import { TOTAL, RESULTS } from "./parameters";

const formatCallResponse = ({ total, results }) => ({
  [TOTAL]: total,
  [RESULTS]: formatTags(results),
});

async function postTags(
  data = {
    searchText: "",
  }
) {
  const { data: response } = await axios.post("/api/search/tag", data);

  const responseFormatted = await formatCallResponse(response);
  return responseFormatted;
}

export default postTags;
