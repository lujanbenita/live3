// hours-> aaaa-mm-dd hh
// days -> aaaa-mm-dd
// weeks-> aaaa Week 21
// months-> aaaa-mm
// years-> ????

const weeksRegex = /Week/;
const hoursRegex = /\d{4}-\d{2}-\d{2} \d{2}/;
const daysRegex = /\d{4}-\d{2}-\d{2}/;
const monthsRegex = /\d{4}-\d{2}/;

const regexList = [
  {
    regex: weeksRegex,
    value: (dateText) => dateText.slice(-7),
  },
  {
    regex: hoursRegex,
    value: (dateText) =>
      parseInt(dateText.slice(-2), 10) > 12
        ? `${parseInt(dateText.slice(-2), 10) - 12}pm`
        : `${parseInt(dateText.slice(-2), 10)}am`,
  },
  {
    regex: daysRegex,
    value: (dateText) => dateText.slice(-5),
  },
  {
    regex: monthsRegex,
    value: (dateText) => dateText,
  },
];

function getFormatterTypeDate(dateText) {
  const { value } = regexList.find(({ regex }) => dateText.match(regex));
  return value;
}

function getFormatTypeDate(dateText) {
  const formatter = getFormatterTypeDate(dateText);
  return formatter(dateText);
}

export default getFormatTypeDate;
