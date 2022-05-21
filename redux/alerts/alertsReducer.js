import alertActionTypes from "./alertActionTypes";
import { initialState } from "./alertsInitialState";

export const alertsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case alertActionTypes.SAVE_ALERT_PENDING:
      return {
        ...state,
        isPendingSaveSearch: true,
        errorSaveSearch: false,
      };

    case alertActionTypes.SAVE_ALERT_SUCCESS:
      return {
        ...state,
        isPendingSaveSearch: false,
        errorSaveSearch: false,
      };

    case alertActionTypes.SAVE_ALERT_ERROR:
      return {
        ...state,
        isPendingSaveSearch: false,
        errorSaveSearch: payload,
      };

    case alertActionTypes.GET_SAVED_ALERTS_PENDING:
      return {
        ...state,
        isPendingGetSaveSearch: true,
        errorGetSaveSearch: false,
      };

    case alertActionTypes.GET_SAVED_ALERTS_SUCCESS:
      return {
        ...state,
        isPendingGetSaveSearch: false,
        savedSearches: payload,
        errorGetSaveSearch: false,
      };

    case alertActionTypes.GET_SAVED_ALERTS_ERROR:
      return {
        ...state,
        isPendingGetSaveSearch: false,
        errorGetSaveSearch: payload,
      };

    default:
      return state;
  }
};
