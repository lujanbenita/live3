import { useQuery } from "react-query";

import { showOnlyThisNotification } from "utils/feedbackBubbles";
import getSavedSearchList from "services/saveSearch/getSavedSearchList";
import { USE_SAVED_SEARCH_LIST } from "./reactQueryTypes";

const useSavedSearchList = (options) => {
  const query = useQuery(USE_SAVED_SEARCH_LIST, getSavedSearchList, {
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

export default useSavedSearchList;
