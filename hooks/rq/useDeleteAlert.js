import { useMutation, useQueryClient } from "react-query";

import deleteAlert from "services/alerts/deleteAlert";
import {
  showOnlyThisNotification,
  showSuccessNotification,
} from "utils/feedbackBubbles";
import { USE_DELETE_ALERT, USE_ALERT_LIST } from "./reactQueryTypes";

const useDeleteAlert = (options) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(USE_DELETE_ALERT, deleteAlert, {
    ...options,
    onSuccess: () => {
      queryClient.invalidateQueries(USE_ALERT_LIST);
      showSuccessNotification("The Alert has been deleted successfully.");
    },
  });

  if (mutation.error) {
    showOnlyThisNotification("Something went wrong. Please try again.");
  }

  return mutation;
};

export default useDeleteAlert;
