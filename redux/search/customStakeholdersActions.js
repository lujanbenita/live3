import { errorHandler } from "utils/errorHandler";
import getStakeholders from "@/services/search/getStakeholders";
import searchActionTypes from "./searchActionTypes";

export const searchStakeholders = (query) => async (dispatch) => {
  dispatch({
    type: searchActionTypes.SEARCH_STAKEHOLDERS_PENDING,
  });

  try {
    const res = await getStakeholders({
      searchText: query,
    });

    dispatch({
      type: searchActionTypes.SEARCH_STAKEHOLDERS_SUCCESS,
      payload: res,
    });
  } catch (error) {
    errorHandler(error);
    dispatch({
      type: searchActionTypes.SEARCH_STAKEHOLDERS_ERROR,
      payload: error,
    });
  }
};
