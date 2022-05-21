import {
  fetchSearch,
  fetchTags,
  fetchFilters,
  fetchOptions,
} from "services/feedServices/searchServices";
import { errorHandler } from "utils/errorHandler";

import searchActionTypes from "./searchActionTypes";

export const feedSearch = (search) => async (dispatch) => {
  dispatch({
    type: searchActionTypes.GET_FEED_PENDING,
  });

  const results = await fetchSearch(search);

  if (results) {
    dispatch({
      type: searchActionTypes.GET_FEED_SUCCESS,
      payload: results,
    });
  } else {
    dispatch({
      type: searchActionTypes.GET_FEED_ERROR,
    });
  }
};

export const fetchSearchTags = (query) => async (dispatch) => {
  dispatch({
    type: searchActionTypes.GET_TAGS_PENDING,
  });

  try {
    const res = await fetchTags({
      searchText: query,
    });

    if (res.results) {
      dispatch({
        type: searchActionTypes.GET_TAGS_SUCCESS,
        payload: res.results,
      });
    }
  } catch (error) {
    errorHandler(error);
    dispatch({ type: searchActionTypes.GET_TAGS_ERROR, payload: error });
  }
};

export const fetchFilterOptions = () => async (dispatch) => {
  const filters = await fetchFilters();

  if (filters) {
    dispatch({
      type: searchActionTypes.GET_FILTER_OPTIONS_SUCCESS,
      payload: filters,
    });
  }
};

export const searchOptions =
  ({ query, page, isLoadMore, id }) =>
  async (dispatch) => {
    if (isLoadMore) {
      dispatch({
        type: searchActionTypes.GET_FILTER_OPTIONS_LOAD_MORE_PENDING,
      });
    } else {
      dispatch({
        type: searchActionTypes.GET_FILTER_OPTIONS_SEARCH_PENDING,
      });
    }

    try {
      const options = await fetchOptions({
        id,
        query,
        page,
      });

      if (isLoadMore) {
        dispatch({
          type: searchActionTypes.GET_FILTER_OPTIONS_LOAD_MORE_SUCCESS,
          payload: {
            type: id,
            data: options.results,
            total: options.total,
          },
        });
      } else {
        dispatch({
          type: searchActionTypes.GET_FILTER_OPTIONS_SEARCH_SUCCESS,
          payload: {
            type: id,
            data: options.results || [],
            total: options.total || 0,
          },
        });
      }
    } catch (error) {
      errorHandler(error);
    }
  };

export const setSelectedTag = (tag) => async (dispatch) => {
  dispatch({
    type: searchActionTypes.SET_SELECTED_TAG,
    payload: tag,
  });
};
