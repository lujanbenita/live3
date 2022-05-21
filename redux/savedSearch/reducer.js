import actionTypes from "./actionTypes";
import initialState from "./initialState";

export const reducer = (state = initialState, { type, payload }) => {
  const reducerTypes = {
    [actionTypes.LOAD_SAVED_SEARCH_ID]: { ...payload },
    [actionTypes.SAVED_SEARCH_REMOVE_ID]: initialState,
  };

  return reducerTypes[type] || state;
};

export default reducer;
