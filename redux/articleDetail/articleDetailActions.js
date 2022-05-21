import {
  getArticleDetail,
  translateArticle,
} from "services/articleDetail/articleDetailServices";

import articleDetailActionTypes from "./articleDetailActionTypes";

export const fetchArticleDetail = (article) => async (dispatch) => {
  const articleDetail = await getArticleDetail(article);

  dispatch({
    payload: articleDetail,
    type: articleDetailActionTypes.GET_ARTICLE_DETAIL,
  });
};

export const updateArticleDetailCustomTags =
  (customTags, articleDetail) => async (dispatch) => {
    dispatch({
      payload: { ...articleDetail, customTags },
      type: articleDetailActionTypes.UPDATE_ARTICLE_DETAIL_CUSTOM_TAGS,
    });
  };

export const translateArticleDetail = (article, lang) => async (dispatch) => {
  const translatedArticleDetail = await translateArticle(article, lang);

  dispatch({
    payload: translatedArticleDetail,
    type: articleDetailActionTypes.GET_ARTICLE_DETAIL,
  });
};
