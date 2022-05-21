import nFormatter from "utils/numberQuantityFormatter";

// num number
// return string
export function getSign(num) {
  if (num < 0) return "-";
  if (num > 0) return "+";
  return "";
}

// num number
// return string
export default function nSignFormatter(num) {
  if (Number.isNaN(parseFloat(num))) return num;
  return `${getSign(Math.sign(num))}${nFormatter(Math.abs(num))}`;
}
