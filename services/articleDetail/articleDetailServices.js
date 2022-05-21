import axios from "axios";

export const getArticleDetail = async (article) => {
  const { articleId, loadDate } = article;

  const { data } = await axios.get(`/api/feed/articles/${articleId}`, {
    params: {
      articleId,
      loadDate,
    },
  });

  return data;
};

export const translateArticle = async (article, translateToLanguage) => {
  const { articleId, loadDate } = article;

  const { data } = await axios.get(
    `/api/feed/articles/${articleId}/translate`,
    {
      params: {
        articleId,
        loadDate,
        translateToLanguage,
      },
    }
  );

  return data;
};

export const highlightTopicsWords = async (tagId) => {
  const data = await axios.get(`/services/tagKeywords?tagId=${tagId}`);

  return data;
};
