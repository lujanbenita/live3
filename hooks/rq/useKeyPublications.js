import { useInfiniteQuery } from "react-query";

import getFilter from "services/filter/getFilter";
import { showOnlyThisNotification } from "utils/feedbackBubbles";
import { USE_KEY_PUBLICATIONS } from "./reactQueryTypes";

const useKeyPublications = (options = {}) => {
  const query = useInfiniteQuery(
    USE_KEY_PUBLICATIONS,
    async ({ pageParam = 1 }) => ({
      ...(await getFilter([
        { key: "page", value: pageParam },
        { key: "size", value: options?.size || 25 },
        { key: "filterTypes", value: "key_media" },
        { key: "sortBy", value: "lastUpdateAt" },
        { key: "sortOrder", value: "desc" },
      ])),
      nextPageParam: pageParam + 1,
    }),
    {
      ...options,
      getNextPageParam: (lastPage, pages) => {
        if (
          pages?.map(({ filters }) => filters).flat().length < lastPage.count
        ) {
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

export default useKeyPublications;
