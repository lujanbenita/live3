import queryData from "../queryData";

async function postCountryAnalisis(data) {
  const getData = () => {
    if (!data.selectedTag) return data;
    return { ...data, tags: [data.selectedTag] };
  };

  return queryData("/api/dashboard/countryanalysis", getData());
}

export default postCountryAnalisis;
