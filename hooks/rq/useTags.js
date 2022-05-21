import { useQuery } from "react-query";

import postTags from "services/postTags";
import { showOnlyThisNotification } from "utils/feedbackBubbles";
import { USE_TAGS } from "./reactQueryTypes";

const useTags = (options) => {
  const query = useQuery(USE_TAGS, postTags, {
    ...options,
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  if (query.error) {
    showOnlyThisNotification(
      "Something went wrong. Please reload the page and try again."
    );
  }

  return query;
};

export default useTags;
