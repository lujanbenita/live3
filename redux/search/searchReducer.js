import searchActionTypes from "./searchActionTypes";
import { initialState } from "./searchInitialState";

import { sortCountries } from "../../utils/languageIsoUtil";

export const searchReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case searchActionTypes.GET_FEED_PENDING:
      return {
        ...state,
        isPendingFeed: true,
        getFeedError: false,
      };

    case searchActionTypes.GET_FEED_SUCCESS:
      return {
        ...state,
        isPendingFeed: false,
        getFeedError: false,
        feedResults: payload,
      };

    case searchActionTypes.GET_FEED_ERROR:
      return {
        ...state,
        isPendingFeed: false,
        isUpdateFeedFiltersPending: false,
        getFeedError: payload,
      };

    case searchActionTypes.GET_TAGS_PENDING:
      return {
        ...state,
        isPendingTags: true,
        getTagsError: false,
      };

    case searchActionTypes.GET_TAGS_SUCCESS:
      return {
        ...state,
        isPendingTags: false,
        tags: payload,
        getTagsError: false,
      };

    case searchActionTypes.GET_TAGS_ERROR:
      return {
        ...state,
        isPendingTags: false,
        getTagsError: payload,
      };

    case searchActionTypes.GET_FILTER_OPTIONS_PENDING:
      return {
        ...state,
        errorGetFilterOptions: false,
        isPendingFilterOptions: true,
      };

    case searchActionTypes.GET_FILTER_OPTIONS_SUCCESS:
      return {
        ...state,
        isPendingFilterOptions: false,
        errorGetFilterOptions: false,
        filterOptions: {
          ...payload.results,
          countries: [...sortCountries(payload.results.countries)],
        },
        filterTotal: payload.total,
      };

    case searchActionTypes.GET_FILTER_OPTIONS_ERROR:
      return {
        ...state,
        isPendingFilterOptions: false,
        errorGetFilterOptions: payload,
      };

    case searchActionTypes.SAVE_SEARCH_PENDING:
      return {
        ...state,
        isPendingSaveSearch: true,
        errorSaveSearch: false,
      };

    case searchActionTypes.SAVE_SEARCH_SUCCESS:
      return {
        ...state,
        isPendingSaveSearch: false,
        errorSaveSearch: false,
      };

    case searchActionTypes.SAVE_SEARCH_ERROR:
      return {
        ...state,
        isPendingSaveSearch: false,
        errorSaveSearch: payload,
      };

    case searchActionTypes.GET_SAVED_SEARCH_PENDING:
      return {
        ...state,
        isPendingGetSaveSearch: true,
        errorGetSaveSearch: false,
      };

    case searchActionTypes.GET_SAVED_SEARCH_SUCCESS:
      return {
        ...state,
        isPendingGetSaveSearch: false,
        savedSearches: payload,
        errorGetSaveSearch: false,
      };

    case searchActionTypes.GET_SAVED_SEARCH_ERROR:
      return {
        ...state,
        isPendingGetSaveSearch: false,
        errorGetSaveSearch: payload,
      };

    case searchActionTypes.GET_FILTER_OPTIONS_LOAD_MORE_PENDING:
      return {
        ...state,
        isPendingFilterOptionsLoadMore: true,
        errorGetFilterOptions: false,
      };

    case searchActionTypes.GET_FILTER_OPTIONS_LOAD_MORE_SUCCESS:
      return {
        ...state,
        isPendingFilterOptionsLoadMore: true,
        errorGetFilterOptions: false,
        filterOptions: {
          ...state.filterOptions,
          [payload.type]: [
            ...state.filterOptions[payload.type],
            ...payload.data,
          ],
        },
        filterTotal: {
          ...state.filterTotal,
          [payload.type]: payload.total,
        },
      };

    case searchActionTypes.GET_FILTER_OPTIONS_SEARCH_PENDING:
      return {
        ...state,
        isPendingFilterOptionsSearch: true,
        errorGetFilterOptions: false,
      };

    case searchActionTypes.GET_FILTER_OPTIONS_SEARCH_SUCCESS:
      return {
        ...state,
        isPendingFilterOptionsSearch: true,
        errorGetFilterOptions: false,
        filterOptions: {
          ...state.filterOptions,
          [payload.type]: [...payload.data],
        },
        filterTotal: {
          ...state.filterTotal,
          [payload.type]: payload.total,
        },
      };

    case searchActionTypes.SORT_FEED_RESULTS:
      return {
        ...state,
        feedResults: [...payload],
      };

    case searchActionTypes.SEARCH_CUSTOM_TAGS_PENDING:
      return {
        ...state,
        searchTagOptionsPending: true,
        searchTagOptionsError: false,
      };

    case searchActionTypes.SEARCH_CUSTOM_TAGS_SUCCESS:
      return {
        ...state,
        searchTagOptionsPending: false,
        searchTagOptionsError: false,
        filterOptions: {
          ...state.filterOptions,
          customTags: [...payload.items],
        },
        filterTotal: { ...state.filterTotal, customTags: payload.total },
      };

    case searchActionTypes.SEARCH_CUSTOM_TAGS_ERROR:
      return {
        ...state,
        searchTagOptionsPending: false,
        searchTagOptionsError: payload,
      };

    case searchActionTypes.SEARCH_TOPICS_PENDING:
      return {
        ...state,
        searchTagOptionsPending: true,
        searchTagOptionsError: false,
      };

    case searchActionTypes.SEARCH_TOPICS_SUCCESS:
      return {
        ...state,
        searchTagOptionsPending: false,
        searchTagOptionsError: false,
        filterOptions: {
          ...state.filterOptions,
          topics: [...payload.items],
        },
        filterTotal: { ...state.filterTotal, topics: payload.total },
      };

    case searchActionTypes.SEARCH_TOPICS_ERROR:
      return {
        ...state,
        searchTagOptionsPending: false,
        searchTagOptionsError: payload,
      };

    default:
      return state;
  }
};
