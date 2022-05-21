import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import {
  showOnlyThisNotification,
  showErrorNotification,
} from "utils/feedbackBubbles";

import patchUserPassword from "services/user/patchUserPassword";

const useUserChangePassword = (options) => {
  const userId = useSelector((state) => state.user.id);

  const mutation = useMutation(
    (data) => userId && patchUserPassword(userId, data),
    {
      ...options,
      onSuccess: () => {
        showOnlyThisNotification("Password updated.");
      },
      onError: (result) => {
        const errorMessage = result.response.data.statusMessage;
        if (errorMessage) {
          showErrorNotification(errorMessage);
        } else {
          showErrorNotification("Error updating password.");
        }
      },
    }
  );

  return mutation;
};

export default useUserChangePassword;
