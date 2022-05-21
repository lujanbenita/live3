import { useQuery } from "react-query";

import { showOnlyThisNotification } from "utils/feedbackBubbles";
import getSingleSavedSearch from "services/saveSearch/getSingleSavedSearch";
import { USE_SINGLE_SAVED_SEARCH } from "../reactQueryTypes";

const useSingleSavedSearch = (id, options) => {
  const query = useQuery(
    `${USE_SINGLE_SAVED_SEARCH}/${id}`,
    () => id && getSingleSavedSearch(id),
    {
      ...options,
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );

  if (query.error) {
    showOnlyThisNotification(
      "Something went wrong. Please reload the page and try again."
    );
  }

  return query;
};

export default useSingleSavedSearch;
