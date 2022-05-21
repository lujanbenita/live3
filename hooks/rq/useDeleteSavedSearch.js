import { useMutation, useQueryClient } from "react-query";

import deleteSavedSearch from "services/saveSearch/deleteSavedSearch";
import {
  showNotification,
  showOnlyThisNotification,
} from "utils/feedbackBubbles";
import {
  USE_DELETE_SAVED_SEARCH,
  USE_SAVED_SEARCH_LIST,
} from "./reactQueryTypes";

const useDeleteSavedSearch = (options) => {
  const queryClient = useQueryClient();

  const mutation = useMutation(USE_DELETE_SAVED_SEARCH, deleteSavedSearch, {
    ...options,
    onSuccess: () => {
      queryClient.invalidateQueries(USE_SAVED_SEARCH_LIST);
      showNotification("Your search has been deleted successfully");
    },
  });

  if (mutation.error) {
    showOnlyThisNotification("Something went wrong. Please try again.");
  }

  return mutation;
};

export default useDeleteSavedSearch;
