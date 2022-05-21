import { SIDE_MENU_ONE_LINKS, SIDE_MENU_TWO_LINKS } from "data/sidebarLinks";
import Alerts from "../../components/alerts/Alerts";
import LayoutComponent from "../../layout/LayoutComponent";

const AlertsPage = () => (
  <LayoutComponent
    title="Saved searches"
    sidebarLinksOne={SIDE_MENU_ONE_LINKS}
    sidebarLinksTwo={SIDE_MENU_TWO_LINKS}
  >
    <Alerts />
  </LayoutComponent>
);

export default AlertsPage;
