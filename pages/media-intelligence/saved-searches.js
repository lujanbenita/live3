import { SIDE_MENU_ONE_LINKS, SIDE_MENU_TWO_LINKS } from "data/sidebarLinks";
import SavedSearches from "components/savedSearches/SavedSearches";
import LayoutComponent from "layout/LayoutComponent";

const SavedSearchesPage = () => (
  <LayoutComponent
    title="Saved searches"
    sidebarLinksOne={SIDE_MENU_ONE_LINKS}
    sidebarLinksTwo={SIDE_MENU_TWO_LINKS}
  >
    <SavedSearches />
  </LayoutComponent>
);

export default SavedSearchesPage;
