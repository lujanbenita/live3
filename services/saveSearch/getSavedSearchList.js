import axios from "axios";

export default async function getSavedSearchList() {
  const { data } = await axios.get("/api/search/savedSearchList");

  const sortedData = data
    .map((savedSearch) => {
      const savedSearchData = savedSearch;
      if (!savedSearchData.workspaceName) {
        savedSearchData.workspaceName = "- (no name)";
      }
      return savedSearchData;
    })
    .sort((a, b) => new Date(b.lastUpdate) - new Date(a.lastUpdate));

  return sortedData;
}
