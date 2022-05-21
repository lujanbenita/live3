import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { showOnlyThisNotification } from "utils/feedbackBubbles";

import patchUserNlaCredential from "services/user/patchUserNlaCredential";

const useUserChangeNLA = (options) => {
  const userId = useSelector((state) => state.user.id);

  const mutation = useMutation(
    (data) => userId && patchUserNlaCredential(userId, data),
    {
      ...options,
      onSuccess: () => {
        showOnlyThisNotification("NLA Credentials updated.");
      },
    }
  );

  return mutation;
};

export default useUserChangeNLA;
