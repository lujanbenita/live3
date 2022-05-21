const initialState = {
  tags: [],
  dateRange: [new Date(), new Date()],
  filterValues: {
    countries: [{ isoCode: "WW", country: "World Wide" }],
    circulation: false,
    customTags: [],
    author: [],
    authorValues: [],
    channel: [],
    publication: [],
    source: [],
    tone: [],
    topics: [],
    stakeholders: [],
    tags: [],
  },
  selectedTag: null,
  page: 1,
  rowsPerPage: 30,
};

export default initialState;
