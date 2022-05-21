import actionTypes from "./actionTypes";
import getSingleSavedSearch from "../../services/saveSearch/getSingleSavedSearch";

export const setData = (payload) => async (dispatch) => {
  dispatch({
    type: actionTypes.SEARCH_OBJECT_SET_DATA,
    payload,
  });
};

export const setTone = (payload) => async (dispatch) => {
  dispatch({
    type: actionTypes.SEARCH_OBJECT_SET_TONE,
    payload,
  });
};

export const setCountry = (payload) => async (dispatch) => {
  dispatch({
    type: actionTypes.SEARCH_OBJECT_SET_COUNTRY,
    payload,
  });
};

export const loadSavedSearch = (id, countryOptions) => async (dispatch) => {
  const savedSearchObject = await getSingleSavedSearch(id, countryOptions);

  dispatch({
    type: actionTypes.LOAD_SAVED_SEARCH,
    payload: savedSearchObject,
  });
};

export const setTags = (payload) => async (dispatch) => {
  dispatch({
    type: actionTypes.SEARCH_OBJECT_SET_TAGS,
    payload,
  });
};

export const setTopics = (payload) => async (dispatch) => {
  dispatch({
    type: actionTypes.SEARCH_OBJECT_SET_TOPICS,
    payload,
  });
};

export const setDate = (payload) => async (dispatch) => {
  const relativeDates = ["1D", "7D", "1M"];

  const getDate = () => {
    const isRelativeDate = relativeDates.find((date) => date === payload[0]);

    if (isRelativeDate) return isRelativeDate;
    return payload;
  };

  dispatch({
    type: actionTypes.SEARCH_OBJECT_SET_DATE,
    payload: getDate(),
  });
};

export const setSelectedTag = (tag) => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_SELECTED_TAG,
    payload: tag,
  });
};

export const setSourceType = (sourceType) => async (dispatch) => {
  dispatch({
    type: actionTypes.SEARCH_OBJECT_SET_SOURCE_TYPE,
    payload: sourceType,
  });
};
