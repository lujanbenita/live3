export const initialState = {
  errorReset: false,
  isPendingReset: false,
  resetSuccess: null,
  // USER CONTROLLER
  errorChangeUserData: false,
  firstName: null,
  id: null,
  jsonData: JSON.stringify({
    searchObject: {
      tags: [],
      dateRange: "1D",
      filterValues: [],
      selectedTag: null,
      page: 1,
      rowsPerPage: 1,
    },
    tutorial: {
      dashboardPage: true,
    },
  }),
  lastName: null,
  liveAccess: null,
  nlaPassword: null,
  nlaUsername: null,
  roleId: null,
  timeZone: null,
  token: null,
  username: null,
};
