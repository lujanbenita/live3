import { useMutation } from "react-query";

import postTagsov from "services/dashboard/postTagsov";
import { showOnlyThisNotification } from "utils/feedbackBubbles";
import { USE_TAG_SOV } from "./reactQueryTypes";

const useTagSov = (options) => {
  const mutation = useMutation(USE_TAG_SOV, postTagsov, {
    ...options,
    cacheTime: Infinity,
    staleTime: Infinity,
    onError: () => {
      showOnlyThisNotification(
        "Something went wrong. Please reload the page and try again."
      );
    },
  });

  return mutation;
};

export default useTagSov;
