import articleDetailActionTypes from "./articleDetailActionTypes";
import { initialState } from "./articleDetailInitialState";

export const articleDetailReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case articleDetailActionTypes.GET_ARTICLE_DETAIL:
      return {
        ...payload,
      };

    case articleDetailActionTypes.UPDATE_ARTICLE_DETAIL_CUSTOM_TAGS:
      return {
        ...payload,
      };

    default:
      return state;
  }
};
