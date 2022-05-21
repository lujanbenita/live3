import {
  NEGATIVE_TYPE,
  NEUTRAL_TYPE,
  POSITIVE_TYPE,
} from "../components/dashboard/molecules/ToneWithCount";

export const checkNumberForColor = (number) => {
  if (Math.sign(number) === 1) {
    return { color: "#008a19", glyphy: "+" };
  }
  if (Math.sign(number) === 0) {
    return { color: "#f1f1f1", glyphy: "" };
  }
  return { color: "#f50a5a", glyphy: "-" };
};

export const checkNumberForType = (number) => {
  if (Math.sign(number) === 1) {
    return POSITIVE_TYPE;
  }
  if (Math.sign(number) === 0) {
    return NEUTRAL_TYPE;
  }
  return NEGATIVE_TYPE;
};
