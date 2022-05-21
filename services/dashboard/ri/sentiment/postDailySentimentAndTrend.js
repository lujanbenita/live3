import queryData from "@/services/dashboard/queryData";

import { parse, format, sub, isBefore } from "date-fns";

const fixDate = (currentDateRange) => {
  if (
    currentDateRange === "1D" ||
    currentDateRange === "7D" ||
    currentDateRange === "1M"
  ) {
    const today = new Date();
    const lastYear = sub(today, { months: 3 });
    return `${format(lastYear, "dd/MM/uuuu")} to ${format(
      today,
      "dd/MM/uuuu"
    )}`;
  }

  const dateRange = currentDateRange.split(" to ");
  const firstDay = parse(dateRange[0], "dd/MM/yyyy", new Date());
  const lastDay = parse(dateRange[1], "dd/MM/yyyy", new Date());

  if (isBefore(firstDay, sub(lastDay, { months: 1 }))) {
    return currentDateRange;
  }

  const lastMonth = sub(lastDay, { months: 1 });
  return `${format(lastMonth, "dd/MM/uuuu")} to ${dateRange[1]}`;
};

async function postDailySentimentAndTrend(data) {
  const skeletonResponse = [];
  const searchData = data;
  searchData.dateRange = fixDate(searchData.dateRange);

  const response = await queryData(
    "/api/reputation-intelligence/sentiment/daily-sentiment-and-trend",
    searchData,
    skeletonResponse,
    (responseData) =>
      responseData.map((interval) => ({
        date: interval.date, // format(new Date(interval.date), "dd/MM/yyyy"),
        score: interval.sentimentScore
          ? Number(interval.sentimentScore.toFixed(2))
          : null,
        tagName: interval.name,
        tagId: interval.tagId,
        trend: interval.sentimentTrend
          ? Number(interval.sentimentTrend.toFixed(2))
          : null,
      }))
  );

  return response;
}

export default postDailySentimentAndTrend;
