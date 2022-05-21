import domToImage from "dom-to-image";

import { format } from "date-fns";
import { transformRelativeDates } from "../components/search/searchBar/DatePicker";

export const exportChart = (title, tags, dateRange, id) => {
  const input = document.getElementById(id);

  domToImage
    .toPng(input, {
      quality: 2,
      filter: (node) => node.tagName !== "BUTTON",
    })
    .then((dataUrl) => {
      const link = document.createElement("a");
      link.download = `${title.replace(" ", "-")}_${tags.map(
        (tag) => `${tag.tagName}`
      )}_${format(transformRelativeDates(dateRange)[0], "yyyy-MM-dd")}-${format(
        transformRelativeDates(dateRange)[0],
        "yyyy-MM-dd"
      )}.png`;
      link.href = dataUrl;
      link.click();
    });
};

export const exportCSV = (
  chartInstance,
  title,
  tags,
  dateRange,
  exportCategories = null,
  customExportingConfig = {}
) => {
  const chart = chartInstance;
  const date = dateRange
    ? `_${format(transformRelativeDates(dateRange)[0], "yyyy-MM-dd")}-${format(
        transformRelativeDates(dateRange)[0],
        "yyyy-MM-dd"
      )}`
    : `_${format(new Date(), "yyyy-MM-dd")}`;
  const filename = `${title.replace(" ", "-")}_${tags.map(
    (tag) => `${tag.tagName.replace()}`
  )}${date}`;
  chart.update({
    exporting: {
      filename,
      ...customExportingConfig,
    },
  });
  const oldCategories = chart.xAxis[0].categories;
  if (exportCategories) {
    chart.xAxis[0].setCategories(exportCategories);
  }
  chart.downloadCSV();
  chart.xAxis[0].setCategories(oldCategories);
};
