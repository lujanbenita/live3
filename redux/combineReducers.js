import { combineReducers } from "redux";
import { userReducer } from "./user/userReducer";
import { searchReducer } from "./search/searchReducer";
import { alertsReducer } from "./alerts/alertsReducer";
import { listsReducer } from "./lists/listsReducer";
import { articleDetailReducer } from "./articleDetail/articleDetailReducer";
import searchObject from "./searchObject/reducer";
import savedSearch from "./savedSearch/reducer";

// COMBINED REDUCERS
const appReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  alerts: alertsReducer,
  lists: listsReducer,
  articleDetail: articleDetailReducer,
  searchObject,
  savedSearch,
});

export const USER_LOGGED_OUT = "USER_LOGGED_OUT";
export const DELETE_STORAGE = "DELETE_STORAGE";

const rootReducer = (state, action) => {
  if (action.type === USER_LOGGED_OUT || action.type === DELETE_STORAGE) {
    localStorage.removeItem("persist:root");
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
