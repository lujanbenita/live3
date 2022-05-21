import { useMutation, useQueryClient } from "react-query";

import postSavedSearch from "services/saveSearch/postSavedSearch";
import {
  showNotification,
  showOnlyThisNotification,
} from "utils/feedbackBubbles";
import { USE_SAVED_SEARCH_LIST } from "./reactQueryTypes";

const useCreateSavedSearch = (options) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(postSavedSearch, {
    ...options,
    onSuccess: () => {
      queryClient.invalidateQueries(USE_SAVED_SEARCH_LIST);

      showNotification("Your search has been saved successfully");
    },
    onError: () => {
      showOnlyThisNotification("Something went wrong. Please try again.");
    },
  });

  return mutation;
};

export default useCreateSavedSearch;
