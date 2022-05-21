import axios from "axios";

import getCustomTags from "services/search/getCustomTags";
import { errorHandler } from "utils/errorHandler";
import searchActionTypes from "./searchActionTypes";
import { showSuccessNotification } from "../../utils/feedbackBubbles";

export const searchCustomTags = (query) => async (dispatch) => {
  dispatch({
    type: searchActionTypes.SEARCH_CUSTOM_TAGS_PENDING,
  });

  try {
    const res = await getCustomTags({
      searchText: query,
    });

    dispatch({
      type: searchActionTypes.SEARCH_CUSTOM_TAGS_SUCCESS,
      payload: res,
    });
  } catch (error) {
    errorHandler(error);
    dispatch({
      type: searchActionTypes.SEARCH_CUSTOM_TAGS_ERROR,
      payload: error,
    });
  }
};

export const createSingleArticleCustomTag =
  ({ articleId, customTags }) =>
  async (dispatch) => {
    dispatch({
      type: searchActionTypes.CREATE_CUSTOM_TAG_PENDING,
    });

    const data = { articleIds: [articleId], customTags };

    try {
      const res = await axios.post(
        `/api/feed/articles/custom-tags/${articleId}`,
        data
      );

      if (res.status === 201) {
        dispatch({
          type: searchActionTypes.CREATE_CUSTOM_TAG_SUCCESS,
        });

        showSuccessNotification(
          "The custom tags are successfully added to the article"
        );
      }
    } catch (error) {
      errorHandler(error);
      dispatch({
        type: searchActionTypes.CREATE_CUSTOM_TAG_ERROR,
        payload: error,
      });
    }
  };

export const deleteCustomTag = (tag) => async (dispatch) => {
  dispatch({
    type: searchActionTypes.DELETE_CUSTOM_TAG_PENDING,
  });

  try {
    const res = await axios({
      method: "DELETE",
      url: "/api/feed/articles/custom-tags",
      data: tag,
    });

    if (res.status === 201) {
      dispatch({
        type: searchActionTypes.DELETE_CUSTOM_TAG_SUCCESS,
      });
    }
  } catch (error) {
    errorHandler(error);
    dispatch({
      type: searchActionTypes.DELETE_CUSTOM_TAG_ERROR,
      payload: error,
    });
  }
};
