import { parse, getQuarter, getYear } from "date-fns";

const getQuarterData = (date) => {
  if (!date) return null;
  const formattedDate = parse(date, "yyyy-MM-dd", new Date());
  return {
    year: getYear(formattedDate),
    quarter: `Q${getQuarter(formattedDate)}`,
  };
};

export default getQuarterData;
