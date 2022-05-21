import {
  SIDE_MENU_ONE_LINKS_RI,
  SIDE_MENU_TWO_LINKS_RI,
} from "data/sidebarLinks";
import SavedSearches from "components/savedSearches/SavedSearches";
import LayoutComponent from "layout/LayoutComponent";

const SavedSearchesPage = () => (
  <LayoutComponent
    title="Saved Searches | Reputation Intelligence"
    sidebarLinksOne={SIDE_MENU_ONE_LINKS_RI}
    sidebarLinksTwo={SIDE_MENU_TWO_LINKS_RI}
  >
    <SavedSearches />
  </LayoutComponent>
);

export default SavedSearchesPage;
