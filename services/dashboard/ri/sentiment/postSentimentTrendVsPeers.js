import queryData from "@/services/dashboard/queryData";
import { parse, format, sub } from "date-fns";

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
  const lastDay = parse(dateRange[1], "dd/MM/yyyy", new Date());
  const lastMonth = sub(lastDay, { months: 3 });
  return `${format(lastMonth, "dd/MM/uuuu")} to ${dateRange[1]}`;
};

async function postSentimentTrendVsPeers(data) {
  const skeletonResponse = [];

  const searchData = data;
  searchData.dateRange = fixDate(searchData.dateRange);

  return queryData(
    "/api/reputation-intelligence/sentiment/sentiment-over-time",
    searchData,
    skeletonResponse,
    (responseData) =>
      responseData.map((item) => ({
        date: item.date, // format(new Date(item.date), "dd/MM/yyyy"),
        score: item.sentimentScore
          ? Number(item.sentimentScore.toFixed(2))
          : null,
        id: item.tagId,
        name: item.name,
      }))
  );
}

export default postSentimentTrendVsPeers;
