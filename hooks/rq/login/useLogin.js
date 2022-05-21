import { useMutation } from "react-query";

import postLogin from "services/login/postLogin";
import {
  showNotification,
  showOnlyThisNotification,
} from "utils/feedbackBubbles";

const incorrectInputsNotification = () =>
  showNotification(
    "The username or password entered was incorrect. Please check and try again."
  );

const useLogin = (options) => {
  const mutation = useMutation(postLogin, {
    ...options,
    retry: false,
    onError: (err) => {
      if (err.response.status === 401) {
        incorrectInputsNotification();
        return;
      }

      showOnlyThisNotification(
        "Something went wrong. Please reload the page and try again."
      );
    },
  });

  return mutation;
};

export default useLogin;
