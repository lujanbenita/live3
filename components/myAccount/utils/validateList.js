export const checkListErrors = (filterName, elements, isAuthor) => {
  const errors = [];

  if (!filterName) {
    errors.push({
      errorName: "keyListName",
      message: "You must need to set a name",
    });
  }

  if (elements.length === 0) {
    errors.push({
      errorName: "elements",
      message: isAuthor
        ? "Add at least one author to create the list"
        : "Add at least one publication to create the list",
    });
  }

  if (errors.length === 0) {
    return false;
  }
  return errors;
};
