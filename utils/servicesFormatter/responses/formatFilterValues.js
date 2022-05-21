const getTone = (value) => {
  if (value === "6") {
    return "Positive";
  }
  if (value === "4") {
    return "Negative";
  }
  if (value === "5") {
    return "Neutral";
  }
};

const formatFilterValues = (filterValues = [], countryOptions) => {
  let formattedFilterValues = {};

  const appendNewValue = (type, value) => {
    if (formattedFilterValues[type] && formattedFilterValues[type].length) {
      formattedFilterValues = {
        ...formattedFilterValues,
        [type]: [...formattedFilterValues[type], value],
      };
    } else if (Object.keys(formattedFilterValues).length) {
      formattedFilterValues = {
        ...formattedFilterValues,
        [type]: [value],
      };
    } else {
      formattedFilterValues = {
        [type]: [value],
      };
    }
  };

  const textTags = filterValues
    .filter((i) => i.typeName === "search_text")
    .map((filter) => ({
      tagName: filter.value,
      tagTypeName: "Text",
      tagId: filter.value,
    }));

  const countryValues = filterValues.filter((i) => i.typeName === "country");
  if (countryValues && countryOptions) {
    countryValues.map((filter) => {
      appendNewValue(
        "countries",
        countryOptions.find((option) => option.country === filter.value)
      );
    });
  }

  const authorValues = filterValues.filter((i) => i.typeName === "author");
  if (authorValues) {
    authorValues.map((filter) => {
      appendNewValue("author", { label: filter.value, isKeyList: false });
    });
  }

  const publicationValues = filterValues.filter(
    (i) => i.typeName === "publication"
  );
  if (publicationValues) {
    publicationValues.map((filter) => {
      appendNewValue("publication", { label: filter.value, isKeyList: false });
    });
  }

  const sourceValues = filterValues.filter((i) => i.typeName === "source_type");
  if (sourceValues) {
    sourceValues.map((filter) => {
      appendNewValue("source", filter.value);
    });
  }

  const channelValues = filterValues.filter(
    (i) => i.typeName === "source_group"
  );
  if (channelValues) {
    channelValues.map((filter) => {
      appendNewValue("channel", filter.value);
    });
  }

  const customTagsValues = filterValues.filter(
    (i) => i.typeName === "tags_custom"
  );
  if (customTagsValues) {
    customTagsValues.map((filter) => {
      appendNewValue("customTags", filter.value);
    });
  }

  const tagsValues = filterValues.filter((i) => i.typeName === "tags");
  if (tagsValues) {
    tagsValues.map((filter) => {
      appendNewValue("tags", filter.value);
    });
  }

  const toneValues = filterValues.filter((i) => i.typeName === "sentiment");
  if (toneValues) {
    toneValues.map((filter) => {
      appendNewValue("tone", getTone(filter.value));
    });
  }

  const circulationValues = filterValues.filter(
    (i) => i.typeName === "circulation"
  );
  if (circulationValues) {
    circulationValues.map((filter) => {
      appendNewValue("circulation", filter.value / 1000);
    });
  }

  const topicsValues = filterValues.filter((i) => i.typeName === "tags");
  if (topicsValues) {
    topicsValues.map((filter) => {
      appendNewValue("topics", filter.value);
    });
  }

  const stakeholdersValues = filterValues.filter(
    (i) => i.typeName === "stakeholder_tag"
  );
  if (stakeholdersValues) {
    stakeholdersValues.map((filter) => {
      appendNewValue("stakeholder", filter.value);
    });
  }

  return { formattedFilterValues, textTags };
};

export default formatFilterValues;
