import formatCountries from "./formatCountries";

const formatFilterValues = (filterValues, textTags) => {
  const {
    countries,
    source,
    channel,
    tone,
    publication,
    author,
    customTags,
    circulation,
    topics,
    stakeholders,
    tags,
  } = filterValues;

  const formattedCountries = countries ? formatCountries(countries) : [];

  const getTone = (value) => {
    if (value === "Positive") {
      return "6";
    }
    if (value === "Negative") {
      return "4";
    }
    if (value === "Neutral") {
      return "5";
    }
  };

  const filterArray = [];

  if (countries && countries.length > 0) {
    filterArray.push(...formattedCountries);
  }

  if (textTags && textTags.length > 1) {
    filterArray.push(
      ...textTags.map((tag) => ({
        typeName: "search_text",
        value: tag.tagName,
      }))
    );
  } else if (textTags && textTags.length === 1) {
    filterArray.push({
      typeName: "search_text",
      value: textTags[0].tagName,
    });
  }

  if (source) {
    filterArray.push(
      ...source.map((src) => ({
        typeName: "source_type",
        value: src,
      }))
    );
  }

  if (channel) {
    filterArray.push(
      ...channel.map((channelEl) => ({
        typeName: "source_group",
        value: channelEl,
      }))
    );
  }

  if (tone) {
    filterArray.push(
      ...tone.map((toneEl) => ({
        typeName: "sentiment",
        value: getTone(toneEl),
      }))
    );
  }

  if (publication) {
    filterArray.push(
      ...publication.map((publicationEl) => ({
        typeName: "publication",
        value: publicationEl.label,
      }))
    );
  }

  if (author) {
    filterArray.push(
      ...author.map((authorEl) => ({
        typeName: "author",
        value: authorEl.label,
      }))
    );
  }

  if (customTags) {
    filterArray.push(
      ...customTags.map((value) => ({
        typeName: "tags_custom",
        value,
      }))
    );
  }

  if (tags) {
    filterArray.push(
      ...tags.map((value) => ({
        typeName: "tags",
        value,
      }))
    );
  }

  if (circulation && circulation[0] > 0) {
    filterArray.push({
      typeName: "circulation",
      value: circulation * 1000,
    });
  }

  if (topics) {
    filterArray.push(
      ...topics.map((topic) => ({
        typeName: "tags",
        value: topic,
      }))
    );
  }

  if (stakeholders) {
    filterArray.push(
      ...stakeholders.map((stakeholder) => ({
        typeName: "stakeholder_tag",
        value: stakeholder,
      }))
    );
  }

  return filterArray;
};

export default formatFilterValues;
