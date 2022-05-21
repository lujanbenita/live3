import listsActionTypes from "./listsActionTypes";
import { initialState } from "./listsInitialState";

export const listsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case listsActionTypes.GET_LISTS_PENDING:
      return {
        ...state,
        isPendingGetLists: true,
      };

    case listsActionTypes.GET_AUTHORS_LISTS:
      return {
        ...state,
        ...payload,
        isPendingGetLists: false,
      };

    case listsActionTypes.GET_PUBLICATIONS_LISTS:
      return {
        ...state,
        ...payload,
        isPendingGetLists: false,
      };

    default:
      return state;
  }
};
