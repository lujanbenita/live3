import { useInfiniteQuery } from "react-query";

import getAuthors from "services/search/getAuthors";
import { showOnlyThisNotification } from "utils/feedbackBubbles";
import { USE_AUTHORS } from "./reactQueryTypes";

const useAuthors = (search = "", options = {}) => {
  const query = useInfiniteQuery(
    [USE_AUTHORS, search],
    async ({ pageParam = 1 }) => ({
      ...(await getAuthors({
        page: pageParam,
        pageSize: 25,
        searchText: search,
      })),
      nextPageParam: pageParam + 1,
    }),
    {
      ...options,
      getNextPageParam: (lastPage) => {
        if (lastPage.total > lastPage.page * lastPage.pageSize) {
          return lastPage.nextPageParam;
        }
        return undefined;
      },
    }
  );

  if (query.error) {
    showOnlyThisNotification(
      "Something went wrong. Please reload the page and try again."
    );
  }

  return query;
};

export default useAuthors;
