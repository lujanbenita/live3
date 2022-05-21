import axios from "axios";

import { format } from "date-fns";
import { parseFromTimeZone } from "date-fns-timezone";

import { showSuccessNotification } from "../../utils/feedbackBubbles";
import { errorHandler } from "../../utils/errorHandler";

export const createAlert = async (body, timeZone) => {
  const {
    alertName,
    type,
    emailSubject,
    source,
    emails,
    deliveryInterval,
    startTime,
    deliveryTime,
  } = body;

  const getAlertType = (alertType) => {
    if (alertType === "Pulse Alert") {
      return "P";
    }
    if (alertType === "Daily Alert") {
      return "D";
    }
    if (alertType === "Realtime Alert") {
      return "R";
    }
  };

  const getAlertDeliveryTime = (
    alertType,
    alertDeliveryInterval,
    alertDeliveryTime
  ) => {
    if (alertType === "Pulse Alert") {
      return alertDeliveryInterval;
    }
    if (alertType === "Daily Alert") {
      return format(new Date(alertDeliveryTime), "HH:mm");
    }
    if (alertType === "Realtime Alert") {
      return "00:05";
    }
  };

  const convertDateToUTC = (date) => {
    const browserDateTimeString = format(date, "yyyy-MM-dd HH:mm:ss");
    const d = parseFromTimeZone(browserDateTimeString, { timeZone });
    const isoDate = d.toISOString();
    return `${isoDate.substring(0, 10)} ${isoDate.substring(11, 17)}00`;
  };

  const getLastAlertTime = (alertType, alertStartTime, alertDeliveryTime) => {
    switch (alertType) {
      default:
      case "Realtime Alert":
        return convertDateToUTC(new Date());
      case "Pulse Alert":
        return convertDateToUTC(alertStartTime);
      case "Daily Alert":
        return convertDateToUTC(alertDeliveryTime);
    }
  };

  const alertObject = {
    alertName,
    alertType: getAlertType(type),
    alertEnabled: "Y",
    alertSubject: emailSubject,
    alertDeliveryTime: getAlertDeliveryTime(
      type,
      deliveryInterval,
      deliveryTime
    ),
    workspaces: [
      {
        workspaceId: source.id.toString(),
        workspaceName: source.name,
      },
    ],
    emailAddressList: emails,
    lastAlertTime: getLastAlertTime(type, startTime, deliveryTime),
    minAudienceRecallScore: 0, // Todo -> Check this
    minHitStrength: 0, // Todo -> Check this
  };

  try {
    const res = await axios.post("/api/alerts", alertObject);

    if (res.status === 200) {
      showSuccessNotification("The Alert has been created");
      return true;
    }
  } catch (error) {
    errorHandler(
      error,
      typeof error.response.data === "string" ? error.response.data : null
    );
  }
};

// TODO: remove if dont will use in the future
export const getAlerts = () => {};

export const deleteAlert = () => {};

export const getAlertDetail = () => {};

export const updateAlert = () => {};
