import nFormatter from "utils/numberQuantityFormatter";
import { NEGATIVE_TEXT, POSITIVE_TEXT, NEUTRAL_TEXT } from "theme";

// num number
// return string
function getSign(num) {
  if (num < 0) return ["-", NEGATIVE_TEXT];
  if (num > 0) return ["+", POSITIVE_TEXT];
  return ["", NEUTRAL_TEXT];
}

// num number
// return string
export default function percentSignFormatter(num) {
  if (Number.isNaN(parseFloat(num))) return num;
  const [signal, color] = getSign(Math.sign(num));
  return { data: `${signal}${nFormatter(Math.abs(num))}%`, color };
}
