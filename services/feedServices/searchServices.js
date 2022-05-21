import axios from "axios";

import formatTags from "utils/servicesFormatter/formatTags";
import { errorHandler } from "utils/errorHandler";

import { buildObjectSearch } from "redux/search/searchUtils";

import { TOTAL, RESULTS } from "../parameters";

/* ------------------------------- Formatters ------------------------------- */

const formatCallResponseTags = ({ total, results }) => ({
  [TOTAL]: total,
  [RESULTS]: formatTags(results),
});

/* -------------------------------- API Calls ------------------------------- */

export const fetchSearch = async (search) => {
  const objectSearch = buildObjectSearch(search);

  try {
    const {
      data: { results },
    } = await axios.post("/api/feed/articles", objectSearch);

    return results;
  } catch (error) {
    errorHandler(error);
  }
};

export const fetchTags = async (
  data = {
    searchText: "",
  }
) => {
  try {
    const { data: response } = await axios.post("/api/search/tag", data);

    const responseFormatted = await formatCallResponseTags(response);
    return responseFormatted;
  } catch (error) {
    errorHandler(error);
  }
};

export const fetchFilters = async () => {
  try {
    const getSourceType = axios.post("/api/search/sourcetype", {
      searchText: "",
    });

    const getChannel = axios.post("/api/search/channel", {
      searchText: "",
    });

    const getTone = axios({
      method: "GET",
      url: "/api/search/tone",
    });

    const getPublication = axios.post("/api/search/publication", {
      searchText: "a",
      page: 1,
      pageSize: 30,
    });

    const getAuthors = axios.post("/api/search/author", {
      page: 1,
      pageSize: 30,
      searchText: "a",
    });

    const getCountries = axios.post("/api/search/country", {
      searchText: "",
    });

    const getCustomTags = axios.post("/api/search/custom-tag", {
      searchText: "",
    });

    const getTopics = axios.post("/api/search/tag?tagTypeNames=Topic", {
      searchText: "",
    });

    const getStakeholders = axios.post(
      "/api/search/tag?tagTypeNames=Stakeholder",
      {
        searchText: "",
      }
    );

    const getTopicTags = axios.get("/api/search/topicsAndCC");

    const [
      sourceType,
      channel,
      tone,
      publication,
      author,
      countries,
      customTags,
      topics,
      stakeholders,
      tags,
    ] = await Promise.all([
      getSourceType,
      getChannel,
      getTone,
      getPublication,
      getAuthors,
      getCountries,
      getCustomTags,
      getTopics,
      getStakeholders,
      getTopicTags,
    ]);

    return {
      results: {
        sourceType: sourceType.data.results,
        channel: channel.data.results,
        tone: tone.data.results,
        publication: publication.data.results,
        author: author.data.results,
        countries: countries.data.results,
        customTags: customTags.data.results,
        topics: topics.data.results,
        stakeholders: stakeholders.data.results,
        tags: tags.data.results,
      },
      total: {
        sourceType: sourceType.data.total,
        channel: channel.data.total,
        tone: tone.data.total,
        publication: publication.data.total,
        author: author.data.total,
        countries: countries.data.total,
        customTags: customTags.data.total,
        topics: topics.data.total,
        stakeholders: stakeholders.data.total,
        tags: tags.data.total,
      },
    };
  } catch (error) {
    errorHandler(error);
  }
};

export const fetchOptions = async ({ id, query, page }) => {
  try {
    const { data } = await axios.post(`/api/search/${id}`, {
      searchText: query || "a",
      page: page || 1,
      pageSize: 30,
    });

    return data;
  } catch (error) {
    errorHandler(error);
  }
};
