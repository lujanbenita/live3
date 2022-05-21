import { useMutation } from "react-query";

import postTags from "services/postTags";
import { showOnlyThisNotification } from "utils/feedbackBubbles";

const useFindTags = (options) => {
  const mutation = useMutation(postTags, {
    ...options,
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  if (mutation.error) {
    showOnlyThisNotification(
      "Something went wrong. Please reload the page and try again."
    );
  }

  return mutation;
};

export default useFindTags;
