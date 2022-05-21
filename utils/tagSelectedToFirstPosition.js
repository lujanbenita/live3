export const tagSelectedToFirstPosition = (arrayValue, selectedTag) => {
  const tagsList = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const tag of arrayValue) {
    if (tag.tagId === selectedTag?.tagId) {
      tagsList.unshift(tag);
    } else {
      tagsList.push(tag);
    }
  }
  return tagsList;
};
