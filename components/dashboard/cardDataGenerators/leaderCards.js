import nFormatter from "../../../utils/numberQuantityFormatter";
import errorMessage from "./errorMessage";

export const genTopToneCards = ({ title, response, disable = false }) => {
  if (!response?.success) {
    return errorMessage(response, disable);
  }

  return {
    title,
    subtitle: "Leader",
    image:
      response.data.base64TagImage && response.data.base64TagImage !== "-"
        ? `data:image/png;base64,${response.data.base64TagImage}`
        : null,
    brand: response.data.tagName,
    info: {
      positive: {
        main: `${response.data.positiveMentionsPercent}%`,
        color: "#008a19",
      },
      negative: {
        main: `${response.data.negativeMentionsPercent}%`,
        color: "#ff004c",
      },
      neutral: {
        main: `${response.data.neutralMentionsPercent}%`,
        color: "#a8a8a8",
      },
    },
    variant: response.data.positiveOrNeutralMentionsPercentChangePercent,
  };
};

export const genTotalVolumeCards = ({ title, data, disable = false }) => {
  if (!data?.success) {
    return errorMessage(data, disable);
  }

  const { response } = data.response;
  return {
    title,
    image: response.base64TagImage
      ? `data:image/png;base64,${response.base64TagImage}`
      : null,
    subtitle: "Leader",
    brand: response.tagName,
    info: nFormatter(response.articleCount),
    variant: response.articleCountChangePercent,
  };
};
