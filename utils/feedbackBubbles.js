import { toast } from "react-toastify";
import ToastMessage from "../components/common/feedback/ToastComponent";
import "react-toastify/dist/ReactToastify.css";

export const showNotification = (message, action, actionMessage, toastId) => {
  ToastMessage({
    type: "info",
    message,
    action,
    actionMessage,
    autoClose: 3000,
    toastId,
  });
};

export const showSuccessNotification = (
  message,
  action,
  actionMessage,
  toastId
) => {
  ToastMessage({
    type: "success",
    message,
    action,
    actionMessage,
    autoClose: 3000,
    toastId,
  });
};

export const showOnlyThisNotification = (message, action, actionMessage) => {
  ToastMessage({
    type: "error",
    message,
    action,
    toastId: "uniqueInfoWarning",
    actionMessage,
    autoClose: 3000,
  });
};

export const showErrorNotification = (message, action, actionMessage) => {
  toast.dismiss();
  ToastMessage({
    type: "error",
    message,
    action,
    actionMessage,
    autoClose: 3000,
  });
};
