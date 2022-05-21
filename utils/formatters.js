export const numberFormatter = (number) => {
  const formatter = new Intl.NumberFormat("en-GB");

  return formatter.format(number);
};

export const limitCharacters = (string, length) => {
  if (!string) return "";
  return `${string.substring(0, length)} ${
    string.length > length ? "..." : ""
  }`;
};

export const limitCharactersWithoutPoints = (string, length) => {
  if (!string) return "";
  if (string.length <= length) return string;
  return `${string.substring(0, length)}...`;
};

export const formatTagType = (str) => {
  if (str) {
    return str.toLowerCase().replace(/ /g, "-").replace("/", "-");
  }
  return "";
};
