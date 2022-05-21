export const validateAlert = (data, listSavedSearch) => {
  const { emails, alertName, emailSubject, source, name, toggleNewSearch } =
    data;

  const isNewSearch =
    typeof toggleNewSearch === "boolean"
      ? toggleNewSearch
      : toggleNewSearch === "true";
  const errors = [];

  if (emails.length === 0) {
    errors.push({
      name: "emails",
      message: "Set at least one mail to receive the alert",
    });
  }

  if (!alertName || alertName.length === 0) {
    errors.push({
      name: "alertName",
      message: "Set an Alert Name",
    });
  }

  if (!emailSubject || emailSubject.length === 0) {
    errors.push({
      name: "emailSubject",
      message: "Define an email subject",
    });
  }

  if (!isNewSearch && !source) {
    errors.push({
      name: "source",
      message: "Select the target search to create an alert",
    });
  }

  if (isNewSearch && (!name || name.length === 0)) {
    errors.push({
      name: "name",
      message: "The saved search needs a name",
    });
  }

  if (isNewSearch && name) {
    const existSavedSearch = listSavedSearch.find(
      ({ workspaceName }) => workspaceName === data.name
    );
    if (existSavedSearch) {
      errors.push({
        name: "name",
        message: "A saved search with the same name already exists",
      });
    }
  }

  if (errors.length === 0) {
    return false;
  }

  return errors;
};
