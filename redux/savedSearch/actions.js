import actionTypes from "./actionTypes";

export const setLoadedSavedSearch = (payload) => async (dispatch) => {
  dispatch({
    type: actionTypes.LOAD_SAVED_SEARCH_ID,
    payload,
  });
};
