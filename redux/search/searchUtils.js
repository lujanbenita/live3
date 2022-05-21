import formatFilterValues from "../../utils/servicesFormatter/requests/formatFilterValues";
import formatDateRangeFunction from "../../utils/servicesFormatter/requests/formatDateRange";

export const buildObjectSearch = (data) => {
  const {
    dateRange,
    tags,
    filterValues,
    page,
    rowsPerPage,
    sortBy,
    selectedTag,
  } = data;

  const textTags = tags.filter((tag) => tag.tagTypeName === "Text");
  const tagsWithoutText = tags.filter((tag) => tag.tagTypeName !== "Text");

  const getSortColumn = () => {
    switch (sortBy) {
      case "Date":
        return "loaddate";

      case "Circulation":
        return "circulationsize";

      case "Visibility":
        return "weight";

      default:
        return "loaddate";
    }
  };

  const objectSearch = {
    dateRange: formatDateRangeFunction(dateRange),
    filterValues: formatFilterValues(filterValues, textTags),
    page: page || 1,
    pageSize: rowsPerPage || 30,
    sortColumn: getSortColumn(),
    sortDirection: "DESC",
    tags: [
      ...tagsWithoutText.map((tag) => ({
        tagId: tag.tagId,
        tagName: tag.tagName,
      })),
    ],
    selectedTag,
  };

  return objectSearch;
};
