import queryData from "@/services/dashboard/queryData";

const getMax = (data) => {
  let max = -100;
  data.map((current) => {
    const maxCurrentValue =
      current.trend > current.reputation ? current.trend : current.reputation;
    if (max < maxCurrentValue) {
      max = maxCurrentValue;
    }
  });
  return max;
};

const getMin = (data) => {
  let min = 100;
  data.map((current) => {
    const minCurrentValue =
      current.trend < current.reputation ? current.trend : current.reputation;
    if (min > minCurrentValue) {
      min = minCurrentValue;
    }
  });
  return min;
};

async function postReputationQuarterlyTrend(data) {
  const skeletonResponse = {
    reputationSentimentTrend: [],
    reputation: null,
    forecastResult: null,
    reputationSentimentTrendData: {
      max: 0,
      min: 0,
      seriesData: null,
    },
    quarterlyForecastData: {
      max: 0,
      min: 0,
      ranges: null,
    },
  };

  return queryData(
    "/api/reputation-intelligence/reputation/quarterly-reputation-and-sentiment-trend",
    data,
    skeletonResponse,
    (responseData) => {
      const returnData = responseData;
      // const returnData = mockData;
      let lastDateIndex = null;

      returnData.reputationSentimentTrend.map((item, index) => {
        const itemDate = new Date(item.date);
        const lastDayOfMonth = new Date(
          itemDate.getFullYear(),
          itemDate.getMonth() + 1,
          0
        ).getDate();
        const isQuarter = [2, 5, 8, 11].includes(itemDate.getMonth());
        if (itemDate.getDate() === lastDayOfMonth && isQuarter) {
          lastDateIndex = index;
        }
        return item;
      });

      if (!lastDateIndex) {
        return skeletonResponse;
      }

      const lastQuarterItem =
        returnData.reputationSentimentTrend[lastDateIndex];
      const lastQuarterDate = new Date(lastQuarterItem.date);
      const lastQuarterYear = lastQuarterDate.getFullYear();
      const lastQuarterNb = (lastQuarterDate.getMonth() + 1) / 3;
      const lastQuarter = `Q${lastQuarterNb} ${lastQuarterYear}`;

      const nextQuarterYear =
        lastQuarterNb === 4 ? lastQuarterYear + 1 : lastQuarterYear;
      const nextQuarterNb = lastQuarterNb === 4 ? 1 : lastQuarterNb + 1;
      const nextQuarter = `Q${nextQuarterNb} ${nextQuarterYear}`;

      const filteredData = returnData.reputationSentimentTrend
        .filter((item, index) => index <= lastDateIndex)
        .map((item) => ({
          date: item.date,
          reputation: item.reputation,
          trend: item.sentimentTrend,
          id: item.tagId,
          name: item.name,
          dateFormatted: new Date(item.date),
        }));

      let max = getMax(filteredData);
      let min = getMin(filteredData);

      const { forecastResult } = returnData;
      const threshold = Number(lastQuarterItem.reputation.toFixed(2));
      const {
        forecast,
        forecastPlusErrorBand2,
        forecastPlusErrorBand1,
        forecastMinusErrorBand1,
        forecastMinusErrorBand2,
      } = forecastResult;

      const fixedForecast = Number(forecast.toFixed(2));
      const fixedPlusErrorBand2 = Number(forecastPlusErrorBand2.toFixed(2));
      const fixedPlusErrorBand1 = Number(forecastPlusErrorBand1.toFixed(2));
      const fixedMinusErrorBand1 = Number(forecastMinusErrorBand1.toFixed(2));
      const fixedMinusErrorBand2 = Number(forecastMinusErrorBand2.toFixed(2));

      if (max < fixedPlusErrorBand2) {
        max = fixedPlusErrorBand2;
      }

      if (min > forecastMinusErrorBand2) {
        min = forecastMinusErrorBand2;
      }

      returnData.reputationSentimentTrendData = {
        max,
        min,
        seriesData: filteredData,
      };

      returnData.quarterlyForecastData = {
        max,
        min,
        threshold,
        fixedForecast,
        categories: [lastQuarter, nextQuarter],
        line: [
          [lastQuarter, threshold],
          [nextQuarter, fixedForecast],
        ],
        ranges: [
          [
            [lastQuarter, threshold, threshold],
            [nextQuarter, fixedMinusErrorBand2, fixedPlusErrorBand2],
          ],
          [
            [lastQuarter, threshold, threshold],
            [nextQuarter, fixedMinusErrorBand1, fixedPlusErrorBand1],
          ],
        ],
      };

      return returnData;
    }
  );
}

export default postReputationQuarterlyTrend;
