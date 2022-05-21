import axios from "axios";
import { buildObjectSearch } from "@/redux/search/searchUtils";

import postSummary from "./mi/postSummary";

export const postDashboardRI = async (searchObject) => {
  const objectReq = buildObjectSearch(searchObject);

  const data = await axios.all([postSummary(objectReq)]).then(
    axios.spread((...responses) => ({
      summary: responses[0],
    }))
  );

  return data;
};
