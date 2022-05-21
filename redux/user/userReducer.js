import userActionTypes from "./userActionTypes";
import { initialState } from "./userInitialState";

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case userActionTypes.RESET_PASSWORD_PENDING:
      return {
        isPendingReset: true,
        errorReset: false,
      };

    case userActionTypes.RESET_PASSWORD_SUCCESS:
      return {
        resetSuccess: true,
        errorReset: false,
        isPendingReset: false,
      };

    case userActionTypes.RESET_PASSWORD_ERROR:
      return {
        errorReset: true,
        isPendingReset: false,
      };

    case userActionTypes.CHANGE_TUTORIAL_SETTINGS: {
      const oldJsonData = JSON.parse(state.jsonData);
      return {
        ...state,
        jsonData: JSON.stringify({
          ...oldJsonData,
          tutorial: {
            ...oldJsonData?.tutorial,
            ...payload,
          },
        }),
      };
    }
    case userActionTypes.SET_USER_DATA:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
