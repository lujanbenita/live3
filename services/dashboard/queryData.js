import axios from "axios";
import _ from "lodash";

async function queryData(
  url,
  searchObject,
  skeletonResponse = null,
  responseFormatter = null
) {
  try {
    const { data: response } = await axios.post(url, searchObject);

    let mergedData = null;

    mergedData = skeletonResponse
      ? _.merge(skeletonResponse, response)
      : response;

    if (responseFormatter) {
      mergedData = responseFormatter(mergedData);
    }

    const completedResponse = {
      data: mergedData,
      success: true,
    };

    return completedResponse;
  } catch (error) {
    const dataError = {
      error,
      success: false,
    };
    return dataError;
  }
}

export default queryData;
