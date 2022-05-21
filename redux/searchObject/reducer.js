import actionTypes from "./actionTypes";
import initialState from "./initialState";

export const reducer = (state = initialState, { type, payload }) => {
  const reducerTypes = {
    [actionTypes.SEARCH_OBJECT_SET_DATA]: {
      ...state,
      ...payload,
    },

    [actionTypes.SEARCH_OBJECT_SET_TONE]: {
      ...state,
      filterValues: {
        ...state.filterValues,
        tone: [payload],
      },
    },

    [actionTypes.SEARCH_OBJECT_SET_COUNTRY]: {
      ...state,
      filterValues: {
        ...state.filterValues,
        countries: [payload],
      },
    },

    [actionTypes.SEARCH_OBJECT_SET_TAGS]: {
      ...state,
      tags: payload,
    },

    [actionTypes.SEARCH_OBJECT_SET_TOPICS]: {
      ...state,
      filterValues: {
        ...state.filterValues,
        topics: [payload],
      },
    },

    [actionTypes.SEARCH_OBJECT_SET_DATE]: {
      ...state,
      dateRange: payload,
    },

    [actionTypes.SEARCH_OBJECT_RESET]: state,
    [actionTypes.LOAD_SAVED_SEARCH]: { ...payload },
    [actionTypes.SET_SELECTED_TAG]: {
      ...state,
      selectedTag: payload,
    },

    [actionTypes.SEARCH_OBJECT_SET_SOURCE_TYPE]: {
      ...state,
      filterValues: {
        ...state.filterValues,
        source: [payload],
      },
    },
  };

  return reducerTypes[type] || state;
};

export default reducer;
