const replaceArrayDataByOrderKey = (arr1, arr2) =>
  arr1.map((obj) => arr2.find((o) => o.order === obj.order) || obj);

export default replaceArrayDataByOrderKey;
