import { parse } from "date-fns";

const parseDDMMAAAA = (date) => parse(date, "dd/MM/yyyy", new Date());

export const getDateByLastDay = (day) => {
  const date = new Date();
  date.setDate(date.getDate() - day);

  return date;
};

export const getLastMonth = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);

  return date;
};

export const getLastYear = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 1);

  return date;
};

const formatDateRange = (dateRange) => {
  const regex = /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/g;
  const dateMatch = dateRange.match(regex);

  if (dateMatch) {
    return [parseDDMMAAAA(dateMatch[0]), parseDDMMAAAA(dateMatch[1])];
  }

  return dateRange;
};
export default formatDateRange;
