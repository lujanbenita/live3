import _ from "lodash";

export const checkIsFilterValuesEqual = (oldFilterValues, newFilterValues) => {
  let equals = 0;

  if (!oldFilterValues.source && !newFilterValues.source) {
    equals += 1;
  } else if (oldFilterValues.source && newFilterValues.source) {
    if (
      _.isEqual(oldFilterValues.source.sort(), newFilterValues.source.sort())
    ) {
      equals += 1;
    }
  }

  if (!oldFilterValues.channel && !newFilterValues.channel) {
    equals += 1;
  } else if (oldFilterValues.channel && newFilterValues.channel) {
    if (
      _.isEqual(oldFilterValues.channel.sort(), newFilterValues.channel.sort())
    ) {
      equals += 1;
    }
  }

  if (!oldFilterValues.tone && !newFilterValues.tone) {
    equals += 1;
  } else if (oldFilterValues.tone && newFilterValues.tone) {
    if (_.isEqual(oldFilterValues.tone.sort(), newFilterValues.tone.sort())) {
      equals += 1;
    }
  }

  if (!oldFilterValues.publication && !newFilterValues.publication) {
    equals += 1;
  } else if (oldFilterValues.publication && newFilterValues.publication) {
    if (
      _.isEqual(
        oldFilterValues.publication.sort(),
        newFilterValues.publication.sort()
      )
    ) {
      equals += 1;
    }
  }

  if (!oldFilterValues.author && !newFilterValues.author) {
    equals += 1;
  } else if (oldFilterValues.author && newFilterValues.author) {
    if (
      _.isEqual(oldFilterValues.author.sort(), newFilterValues.author.sort())
    ) {
      equals += 1;
    }
  }

  if (!oldFilterValues.customTags && !newFilterValues.customTags) {
    equals += 1;
  } else if (oldFilterValues.customTags && newFilterValues.customTags) {
    if (
      _.isEqual(
        oldFilterValues.customTags.sort(),
        newFilterValues.customTags.sort()
      )
    ) {
      equals += 1;
    }
  }

  if (!oldFilterValues.tags && !newFilterValues.tags) {
    equals += 1;
  } else if (oldFilterValues.tags && newFilterValues.tags) {
    if (_.isEqual(oldFilterValues.tags.sort(), newFilterValues.tags.sort())) {
      equals += 1;
    }
  }

  if (!oldFilterValues.circulation && !newFilterValues.circulation) {
    equals += 1;
  } else if (oldFilterValues.circulation && newFilterValues.circulation) {
    if (_.isEqual(oldFilterValues.circulation, newFilterValues.circulation)) {
      equals += 1;
    }
  }

  if (!oldFilterValues.topics && !newFilterValues.topics) {
    equals += 1;
  } else if (oldFilterValues.topics && newFilterValues.topics) {
    if (
      _.isEqual(oldFilterValues.topics.sort(), newFilterValues.topics.sort())
    ) {
      equals += 1;
    }
  }

  if (!oldFilterValues.stakeholders && !newFilterValues.stakeholders) {
    equals += 1;
  } else if (oldFilterValues.stakeholders && newFilterValues.stakeholders) {
    if (
      _.isEqual(
        oldFilterValues.stakeholders.sort(),
        newFilterValues.stakeholders.sort()
      )
    ) {
      equals += 1;
    }
  }

  if (equals === 10) {
    return true;
  }
};
