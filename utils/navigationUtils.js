export const getIfLinkIsActive = (router, item, array) => {
  const arrayOfPathsWithoutHome = [];
  array.map((element) => {
    if (element.path !== "/") {
      arrayOfPathsWithoutHome.push(element.sectionPath);
    }
  });

  if (item.path === "/") {
    if (!arrayOfPathsWithoutHome.includes(router.pathname)) {
      return true;
    }
  } else {
    const paths = item.sectionPath.split("|");
    for (let i = 0; i < paths.length; i += 1) {
      if (router.pathname.includes(paths[i])) {
        return true;
      }
    }
  }
  return false;
};
