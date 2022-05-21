import { useInfiniteQuery } from "react-query";

import getPublications from "services/search/getPublications";
import { showOnlyThisNotification } from "utils/feedbackBubbles";
import { USE_PUBLICATIONS } from "./reactQueryTypes";

const usePublications = (search = "", options = {}) => {
  const query = useInfiniteQuery(
    [USE_PUBLICATIONS, search],
    async ({ pageParam = 1 }) => ({
      ...(await getPublications({
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

export default usePublications;
