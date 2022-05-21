import axios from "axios";
import download from "downloadjs";

import { formatDateRange } from "utils/servicesFormatter/requests/formatDateRange";
import { showSuccessNotification } from "../../utils/feedbackBubbles";
import { errorHandler } from "../../utils/errorHandler";

const buildExportObject = (user, dateRange, articles, file) => ({
  articleIds: [...articles.map((art) => art.articleId)],
  dateRange: formatDateRange(dateRange),
  fileName: file,
  fileType: file,
  nlaPassword: user.nlaPassword,
  nlaUsername: user.nlaUsername,
  userEmail: user.username,
  userFirstName: user.firstName,
  userLastName: user.lastName,
});

export const exportCSV = async (user, dateRange, articles) => {
  try {
    const { status, data } = await axios.post(
      `/api/feed/articles/export`,
      buildExportObject(user, dateRange, articles, "csv")
    );

    if (status === 200) {
      showSuccessNotification(data.statusMessage);
    }

    return data;
  } catch (error) {
    errorHandler(error);
  }
};

export const exportPPT = async (user, dateRange, articles) => {
  try {
    const { status, data } = await axios.post(
      `/api/feed/articles/export`,
      buildExportObject(user, dateRange, articles, "ppt")
    );

    if (status === 200) {
      showSuccessNotification(data.statusMessage);
    }

    return data;
  } catch (error) {
    errorHandler(error);
  }
};

export const exportPDF = async (user, dateRange, articles) => {
  try {
    const { data, status } = await axios.post(
      `/api/feed/articles/export`,
      buildExportObject(user, dateRange, articles, "pdf")
    );

    if (status === 200) {
      showSuccessNotification(data.statusMessage);
    }

    return data;
  } catch (error) {
    errorHandler(error);
  }
};

export const exportNLA = async (articleId, articleName, loadDate) => {
  try {
    const { data, status, headers } = await axios.get(
      `/api/feed/articles/${articleId}/export`,
      {
        params: { articleId, loadDate },
        responseType: "blob",
      }
    );

    if (status === 200) {
      const content = headers["content-type"];
      download(data, articleName, content);
    }
  } catch (error) {
    const { response } = error;
    const isJsonBlob = (data) =>
      data instanceof Blob && data.type === "application/json";
    const responseData = isJsonBlob(response?.data)
      ? await response?.data?.text()
      : response?.data || {};
    const responseJson =
      typeof responseData === "string"
        ? JSON.parse(responseData)
        : responseData;

    if (responseJson.errorMessage) {
      errorHandler(error, responseJson.errorMessage);
      return;
    }

    errorHandler(
      error,
      "There was a error exporting the article. Please try again or contact an administrator."
    );
  }
};
