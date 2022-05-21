/* eslint-disable dot-notation */
import router from "next/router";
import axios from "axios";
import cookie from "js-cookie";

import { removeToken } from "utils/Auth";
import {
  showNotification,
  showOnlyThisNotification,
} from "utils/feedbackBubbles";

import userActionTypes from "./userActionTypes";
import { USER_LOGGED_OUT } from "../combineReducers";

import "react-toastify/dist/ReactToastify.css";

export const passwordRecovery = (email) => async (dispatch) => {
  dispatch({
    type: userActionTypes.RESET_PASSWORD_PENDING,
  });

  try {
    const res = await axios.post("/api/login/sendPasswordResetEmail", {
      email,
    });

    if (res.status === 200) {
      dispatch({
        type: userActionTypes.RESET_PASSWORD_SUCCESS,
        payload: res.data,
      });

      await router.push("/login");
      showNotification(
        "Your password was successfully reset. Check your mail to get your new password."
      );
    }
  } catch (error) {
    showOnlyThisNotification(
      "Something went wrong. Please reload the page and try again."
    );

    dispatch({
      type: userActionTypes.RESET_PASSWORD_ERROR,
      payload: error,
    });
  }
};

export const resetPassword = (data) => async (dispatch) => {
  dispatch({
    type: userActionTypes.RESET_PASSWORD_PENDING,
  });

  try {
    const res = await axios.post("/api/login/passwordReset", {
      email: data.username,
      newPassword: data.newPassword,
      resetToken: data.token,
    });

    if (res.data && res.data.isSuccess === true) {
      dispatch({
        type: userActionTypes.RESET_PASSWORD_SUCCESS,
        payload: res.data,
      });

      await router.push("/login");
      showNotification("Your password was successfully changed");
    } else if (res.data && res.data.isSuccess === false) {
      showNotification(res.data.message);

      dispatch({
        type: userActionTypes.RESET_PASSWORD_ERROR,
      });
    }
  } catch (error) {
    showOnlyThisNotification(
      "Something went wrong. Please reload the page and try again."
    );

    dispatch({
      type: userActionTypes.RESET_PASSWORD_ERROR,
      payload: error,
    });
  }
};

export const logout = () => async (dispatch) => {
  if (process.env.NODE_ENV === "production") {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line prefer-destructuring
      const hostname = window.location.hostname;
      cookie.remove("JSESSIONID", { path: "/", domain: hostname });
    }
    await axios({
      method: "get",
      url: "/services/logout",
    });
  }

  dispatch({
    type: USER_LOGGED_OUT,
  });
  removeToken();
};

export const changeTutorialSettings = (page, setting) => (dispatch) => {
  const payload = { [page]: setting };
  dispatch({
    type: userActionTypes.CHANGE_TUTORIAL_SETTINGS,
    payload,
  });
};

export const setUserData = (payload) => (dispatch) => {
  dispatch({
    type: userActionTypes.SET_USER_DATA,
    payload,
  });
};
