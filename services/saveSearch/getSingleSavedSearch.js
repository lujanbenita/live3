import axios from "axios";

import formatFilterValues from "utils/servicesFormatter/responses/formatFilterValues";
import formatTags from "utils/servicesFormatter/formatTags";
import postTags from "services/postTags";
import { DATE_RANGE, FILTER_VALUES, TAGS, SELECTED_TAG } from "../parameters";
import formatDateRange from "../../utils/servicesFormatter/responses/formatDateRange";

const TagsWithTagTypeName = async (tags) => {
  const response = await postTags();

  const tagsWithTagTypeName = tags.map(({ tagId: originalTagId }) =>
    response.results.find(({ tagId }) => originalTagId === tagId)
  );

  return tagsWithTagTypeName;
};

const formatCallResponse = async (
  { dateRange, filterValues, tags, selectedTag },
  countryOptions
) => {
  const { formattedFilterValues, textTags } = formatFilterValues(
    filterValues,
    countryOptions
  );
  let formattedTags = await formatTags([...tags]);

  if (formattedTags.length > 0 && !formattedTags[0].tagTypeName) {
    formattedTags = await TagsWithTagTypeName(formattedTags);
  }

  return {
    [DATE_RANGE]: formatDateRange(dateRange),
    [FILTER_VALUES]: formattedFilterValues,
    [TAGS]: [...formattedTags, ...textTags],
    [SELECTED_TAG]: selectedTag,
  };
};

export default async function getSingleSavedSearch(id, countryOptions) {
  const { data } = await axios.get(`/api/search/savedSearch/${id}`);

  const response = await formatCallResponse(data, countryOptions);
  return response;
}
