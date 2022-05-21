import { errorHandler } from "utils/errorHandler";
import getTopics from "@/services/search/getTopics";
import searchActionTypes from "./searchActionTypes";

export const searchTopics = (query) => async (dispatch) => {
  dispatch({
    type: searchActionTypes.SEARCH_TOPICS_PENDING,
  });

  try {
    const res = await getTopics({
      searchText: query,
    });

    dispatch({
      type: searchActionTypes.SEARCH_TOPICS_SUCCESS,
      payload: res,
    });
  } catch (error) {
    errorHandler(error);
    dispatch({
      type: searchActionTypes.SEARCH_TOPICS_ERROR,
      payload: error,
    });
  }
};
