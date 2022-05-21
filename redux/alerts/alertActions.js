import { createAlert } from "services/alerts/alertsServices";
import { errorHandler } from "utils/errorHandler";
import searchActionTypes from "./alertActionTypes";

export const saveAlert = (data, timeZone) => async (dispatch) => {
  dispatch({
    type: searchActionTypes.SAVE_ALERT_PENDING,
  });

  const alert = await createAlert(data, timeZone);

  if (alert) {
    dispatch({
      type: searchActionTypes.SAVE_ALERT_SUCCESS,
    });
    return true;
  }
};

export const getSavedAlerts = () => async (dispatch) => {
  dispatch({
    type: searchActionTypes.GET_SAVED_SEARCH_PENDING,
  });

  try {
    // const res = await axios({
    //   method: 'POST',
    //   url: '/api/search/save-search'
    //   data: {
    //     data
    //   }
    // })
    // dispatch({
    //   type: searchActionTypes.GET_SAVED_SEARCH_SUCCESS,
    //   payload: {
    //     res.data
    //   },
    // });
  } catch (error) {
    errorHandler(error);
    dispatch({
      type: searchActionTypes.GET_SAVED_SEARCH_ERROR,
      payload: error,
    });
  }
};
