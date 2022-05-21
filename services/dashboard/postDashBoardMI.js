import axios from "axios";
import { buildObjectSearch } from "@/redux/search/searchUtils";

import postSummary from "./mi/postSummary";
import postTopVolumeTag from "./mi/postTopVolumeTag";
import postTopToneTag from "./mi/postTopToneTag";
import postTagOvertimeAnalysis from "./mi/postTagOvertimeAnalysis";
import postTagSovBySourceType from "./mi/postTagSovBySourceType";
import postCountryAnalysis from "./mi/postCountryAnalisis";
import postToneByTag from "./mi/postToneByTag";

export const postDashboardMI = async (searchObject) => {
  const objectReq = buildObjectSearch(searchObject);

  const data = await axios
    .all([
      postSummary(objectReq),
      postTopToneTag(objectReq),
      postTopVolumeTag(objectReq),
      postTagOvertimeAnalysis(objectReq),
      postTagSovBySourceType(objectReq),
      postCountryAnalysis(objectReq),
      postToneByTag(objectReq),
    ])
    .then(
      axios.spread((...responses) => ({
        summary: responses[0],
        topToneByTag: responses[1],
        topVolumeTag: responses[2],
        companyComparison: responses[3],
        SovBySource: responses[4],
        countryAnalysis: responses[5],
        topStories: null,
        toneByTag: responses[6],
      }))
    );

  return data;
};
