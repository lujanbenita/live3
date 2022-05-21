import { useQuery } from "react-query";

import { showOnlyThisNotification } from "utils/feedbackBubbles";
import getAlertList from "services/alerts/getAlerts";
import { USE_ALERT_LIST } from "./reactQueryTypes";

const useAlertList = (options) => {
  const query = useQuery(USE_ALERT_LIST, getAlertList, {
    ...options,
  });

  if (query.error) {
    showOnlyThisNotification(
      "Something went wrong. Please reload the page and try again."
    );
  }

  return query;
};

export default useAlertList;
