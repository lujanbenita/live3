import { removeToken } from "./Auth";
import {
  showOnlyThisNotification,
  showErrorNotification,
} from "./feedbackBubbles";

export const getErrorMessage = (error, customMessage) => {
  if (error?.response?.status === 401 && !customMessage) {
    return "Your session has been expired. You need to login again for security reasons.";
  }
  if (error?.response?.status === 400 && error.response.data?.errorMessage) {
    return error.response.data?.errorMessage;
  }
  if (error?.code === "ECONNABORTED" || error?.response?.status === 504) {
    return "The request to the server has taken too long. Please check your search parameters to narrow it down.";
  }

  return (
    customMessage ||
    `Something went wrong. Please reload alva Live and try again.`
  );
};

export const errorHandler = (error, customMessage) => {
  const message = getErrorMessage(error, customMessage);
  if (error?.response?.status === 401 && !customMessage) {
    showOnlyThisNotification(message);
    removeToken();
    return;
  }
  showErrorNotification(message);
};
