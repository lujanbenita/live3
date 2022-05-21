const formatTags = (tagsValues) => {
  const tags = tagsValues.map((tag) => ({
    tagId: tag.tagId || tag.tagid,
    tagName: tag.tagName || tag.tagname,
    tagTypeName: tag.tagTypeName || tag.tagtypename || undefined,
  }));

  return tags;
};

export default formatTags;
