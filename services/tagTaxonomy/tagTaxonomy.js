import axios from "axios";

export const fetchTaxonomy = async (nodeId) =>
  axios({
    method: "get",
    url: `/api/taxonomy?nodeId=${nodeId}`,
  });

export const fetchTaxonomyBySearchTerm = async (searchTerm) =>
  axios({
    method: "get",
    url: `/api/taxonomy/search?searchTerm=${searchTerm}`,
  });

export const fetchTaxonomies = async (categories) =>
  axios({
    method: "get",
    url: `/api/taxonomy/by-tag-types?tagTypes=${categories.join(",")}`,
  });
