import formatTags from "utils/servicesFormatter/formatTags";
import formatFilterValues from "utils/servicesFormatter/requests/formatFilterValues";
import formatDateRange from "utils/servicesFormatter/requests/formatDateRange";

const splitTags = (tags) => {
  const a = [];
  const b = [];
  tags.forEach((tag) => {
    if (tag.tagTypeName === "Text") {
      b.push({
        typeName: "search_text",
        value: tag.tagName,
      });
    } else {
      a.push(tag);
    }
  });
  return [a, b];
};

const formatSearchObject = (data) => {
  const dirtyTags = formatTags(data.tags);

  const [tags, filters] = splitTags(dirtyTags);

  const filterValues = [...formatFilterValues(data.filterValues), ...filters];

  const dateRange = formatDateRange(data.dateRange);

  return {
    ...data,
    filterValues,
    tags,
    dateRange,
  };
};

export default formatSearchObject;
