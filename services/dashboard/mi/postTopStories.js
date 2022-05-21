import queryData from "../queryData";

async function postTopStories(data) {
  const getData = () => {
    if (!data.selectedTag) return data;
    return { ...data, tags: [data.selectedTag] };
  };

  return queryData("/api/dashboard/topstories", getData());
}

export default postTopStories;
