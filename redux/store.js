import { useMemo } from "react";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { persistStore } from "redux-persist";

import rootReducer from "./combineReducers";

const whitelist = ["user", "search", "searchObject", "savedSearch"]; // <- The reducers you want to store

export const useStore = (initialState) => {
  function initializeStore() {
    let store;
    const isClient = typeof window !== "undefined";

    if (isClient) {
      const { persistReducer } = require("redux-persist");
      const storage = require("redux-persist/lib/storage").default;

      const persistConfig = {
        key: "root",
        storage,
        whitelist,
      };

      store = createStore(
        persistReducer(persistConfig, rootReducer),
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
      );

      store.__PERSISTOR = persistStore(store);

      return store;
    }
    store = createStore(
      rootReducer,
      initialState,
      composeWithDevTools(applyMiddleware(thunkMiddleware))
    );

    return store;
  }

  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
};
