const errorMessage = (
  data,
  disable,
  errorText = "No data could be retrieved for this widget. Please try again or check the search parameters.",
  disabledText = "Not available for this filter configuration"
) => {
  if (!data || data?.length === 0 || disable) {
    return { status: "OFF", message: disabledText };
  }

  const errorJson = { status: "ERROR", message: "" };

  if (data === undefined) {
    errorJson.message = errorText;
    return errorJson;
  }

  if (data?.error.code === "ECONNABORTED") {
    errorJson.message =
      "The request to the server for this widget has taken too long. Please check your search parameters to narrow it down.";
    return errorJson;
  }

  if (data?.error?.response === undefined) {
    errorJson.message = data.error.message;
    return errorJson;
  }

  const responseData = data.error.response.data;
  const responseError = responseData.errorMessage;

  switch (data.error.response.status) {
    default:
    case 500:
      errorJson.message = responseError
        ? responseError
        : "No data could be retrieved for this widget. Please try again or check the search parameters.";
      break;
    case 504:
      errorJson.message =
        "The request to the server has taken too long. Please check your search parameters to narrow it down.";
      break;
    case 404:
      errorJson.message = responseError
        ? responseError
        : "Widget not available.";
      break;
    case 400:
      if (
        responseError ===
        "This search is only possible when searched with selected tag"
      ) {
        errorJson.message = "A focus tag is needed to display this widget.";
        break;
      }

      if (responseError === "Must provide some tags or filters") {
        errorJson.message = "Not available for this filter configuration";
        break;
      }

      errorJson.message = responseError;
      break;
  }

  if (errorJson.message.length > 400) {
    errorJson.message = errorJson.message.slice(0, 400);
  }

  return errorJson;
};

export default errorMessage;
