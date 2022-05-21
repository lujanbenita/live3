import errorMessage from "./errorMessage";

export const barChart = ({
  title,
  response,
  categoriesLabel,
  seriesLabel,
  disable = false,
}) => {
  if (!response?.success) {
    return errorMessage(response, disable);
  }

  const { data } = response;

  return {
    title,
    data,
    categoriesLabel,
    seriesLabel,
  };
};
