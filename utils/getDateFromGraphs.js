import { parse, addDays, subDays, isEqual } from "date-fns";

const getDateOfISOWeek = (w, y) => {
  const simple = new Date(y, 0, 1 + (w - 1) * 7);
  const dow = simple.getDay();
  const ISOweekStart = simple;
  if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
  else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
  return ISOweekStart;
};

export const getDateFromGraphs = (dateRange, date) => {
  if (dateRange === "1D") {
    return dateRange;
  }

  if (dateRange === "7D") {
    const formattedDate = parse(date, "yyyy-MM-dd", new Date());

    return [formattedDate, formattedDate];
  }

  if (dateRange === "1M") {
    const formattedDate = parse(date, "yyyy-MM-dd", new Date());

    return [formattedDate, formattedDate];
  }

  if (date?.includes("Week")) {
    const year = date.slice(0, 4);
    const week = date.slice(date.length - 2, date.length);

    const weekDate = getDateOfISOWeek(week, year);

    return [subDays(new Date(weekDate), 1), addDays(new Date(weekDate), 5)]; // <- is sunday to saturday week format
  }

  if (date?.length === 7) {
    const formattedDate = parse(date, "yyyy-MM", new Date());

    const fullYear = new Date(formattedDate).getFullYear();
    const month = new Date(formattedDate).getMonth();

    const firstDay = new Date(fullYear, month, 1);
    const lastDay = new Date(fullYear, month + 1, 0);

    return [firstDay, lastDay];
  }

  if (date?.length === 5) {
    const formattedDate = parse(date, "MM-dd", new Date());
    const day = new Date(formattedDate);

    return [day, day];
  }

  // handles the hour chart click
  if (isEqual(dateRange[0], dateRange[1])) {
    return [dateRange[0], dateRange[0]];
  }

  const formattedDate = parse(date, "yyyy-MM-dd", new Date());

  return [formattedDate, formattedDate];
};
