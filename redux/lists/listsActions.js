// import { showSuccessNotification } from "utils/feedbackBubbles";
import listsActionTypes from "./listsActionTypes";
import {
  fetchAuthorsLists,
  fetchPublicationsLists,
} from "../../services/listsServices/listsServices";

export const getAuthorsLists = (data) => async (dispatch) => {
  dispatch({
    type: listsActionTypes.GET_LISTS_PENDING,
  });

  const authorsLists = await fetchAuthorsLists(data);

  dispatch({
    payload: {
      keyAuthorsLists: authorsLists && authorsLists.filters,
      totalKeyAuthorsLists: authorsLists && authorsLists.count,
    },
    type: listsActionTypes.GET_AUTHORS_LISTS,
  });
};

export const getPublicationsLists = (data) => async (dispatch) => {
  dispatch({
    type: listsActionTypes.GET_LISTS_PENDING,
  });

  const publicationsLists = await fetchPublicationsLists(data);

  dispatch({
    payload: {
      keyPublicationsLists: publicationsLists.filters,
      totalKeyPublicationsLists: publicationsLists.count,
    },
    type: listsActionTypes.GET_PUBLICATIONS_LISTS,
  });
};
