import { format } from "date-fns";
import {
  getDateByLastDay,
  getLastMonth,
  getLastYear,
} from "../responses/formatDateRange";

const formatDateRequest = (beforeDate, afterDate) =>
  `${format(beforeDate, "dd/MM/yyyy")} to ${format(afterDate, "dd/MM/yyyy")}`;

export const formatDateRange = (dateRange) => {
  if (dateRange === "1D" || dateRange === "7D" || dateRange === "1M") {
    return dateRange;
  }

  return formatDateRequest(new Date(dateRange[0]), new Date(dateRange[1]));
};

export const saveSearchFormatDateRange = (dateRange) => {
  if (
    dateRange === "1D" ||
    dateRange === "7D" ||
    dateRange === "1M" ||
    dateRange === "1Y"
  ) {
    const actualDate = new Date();
    const relativeDaysAction = {
      "1D": formatDateRequest(getDateByLastDay(1), actualDate),
      "7D": formatDateRequest(getDateByLastDay(7), actualDate),
      "1M": formatDateRequest(getLastMonth(), actualDate),
      "1Y": formatDateRequest(getLastYear(), actualDate),
    };
    return relativeDaysAction[dateRange];
  }

  return formatDateRequest(new Date(dateRange[0]), new Date(dateRange[1]));
};

export default formatDateRange;
