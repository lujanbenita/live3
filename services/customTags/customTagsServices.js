import axios from "axios";
import { showSuccessNotification } from "utils/feedbackBubbles";
import { errorHandler } from "utils/errorHandler";

export const getCustomTags = async (article) => {
  const { articleId, loadDate } = article;

  const { data } = await axios.get(
    `/api/feed/articles/${articleId}?articleId=${articleId}&loadDate=${loadDate}`
  );

  return data.customTags;
};

export const deleteCustomTag = async ({ articles, tag }) => {
  const data = {
    articleIds: [...articles.map((art) => art.articleId)],
    customTags: [tag.customTagName],
  };

  const { status } = await axios.delete("/api/feed/articles/custom-tags", {
    data,
  });

  if (status === 200) {
    showSuccessNotification("Tag was successfully unassigned");
    return status;
  }
};

export const assignCustomTags = async ({ articles, tags }) => {
  // const data = {
  //   articleIds: [...articles.map((art) => art.articleId)],
  //   customTags: [...tags],
  // };

  try {
    const { status } = await axios.post("/api/feed/articles/custom-tags", {
      articleIds: [...articles.map((art) => art.articleId)],
      customTags: [...tags],
    });

    if (status === 201) {
      showSuccessNotification("Tag was successfully assigned");
      return status;
    }
  } catch (error) {
    errorHandler(error);
  }
};
