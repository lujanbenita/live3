import errorMessage from "./errorMessage";

export const widgetProcessor = ({
  title,
  response,
  disable = false,
  ...props
}) => {
  if (!response?.success || response.data === undefined) {
    return errorMessage(response, disable);
  }

  return {
    title,
    data: response?.data,
    props,
  };
};
