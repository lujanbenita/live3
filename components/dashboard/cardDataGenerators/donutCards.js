import nSignFormatter from "../../../utils/numberQuantityFormatter";
import errorMessage from "./errorMessage";

export const donutCards = ({ title, response, disable = false }) => {
  if (!response?.success) {
    return errorMessage(response, disable);
  }

  if (
    response.data.positiveMentionsCount === "-" &&
    response.data.negativeMentionsCount === "-" &&
    response.data.neutralMentionsCount === "-" &&
    response.data.positiveMentionsPercent === "-" &&
    response.data.negativeMentionsPercent === "-" &&
    response.data.neutralMentionsPercent === "-"
  ) {
    return errorMessage(null, "Not available for this filter configuration");
  }

  const positiveMentionsCount = nSignFormatter(
    response.data.positiveMentionsCount
  );
  const negativeMentionsCount = nSignFormatter(
    response.data.negativeMentionsCount
  );
  const neutralMentionsCount = nSignFormatter(
    response.data.neutralMentionsCount
  );
  const positiveMentionsPercent =
    response.data.positiveMentionsPercent !== "-"
      ? response.data.positiveMentionsPercent
      : 0;
  const negativeMentionsPercent =
    response.data.negativeMentionsPercent !== "-"
      ? response.data.negativeMentionsPercent
      : 0;
  const neutralMentionsPercent =
    response.data.neutralMentionsPercent !== "-"
      ? response.data.neutralMentionsPercent
      : 0;

  let total = 0;
  if (response.data.positiveMentionsCount !== "-") {
    total += response.data.positiveMentionsCount;
  }
  if (response.data.negativeMentionsCount !== "-") {
    total += response.data.negativeMentionsCount;
  }
  if (response.data.neutralMentionsCount !== "-") {
    total += response.data.neutralMentionsCount;
  }

  return {
    title,
    info: {
      positive: {
        main: positiveMentionsCount,
        secondary: positiveMentionsPercent,
        color: "#008a19",
      },
      negative: {
        main: negativeMentionsCount,
        secondary: negativeMentionsPercent,
        color: "#ff004c",
      },
      neutral: {
        main: neutralMentionsCount,
        secondary: neutralMentionsPercent,
        color: "#a8a8a8",
      },
    },
    total: nSignFormatter(total),
  };
};
