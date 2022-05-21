import {
  SIDE_MENU_ONE_LINKS_RI,
  SIDE_MENU_TWO_LINKS_RI,
} from "data/sidebarLinks";
import Alerts from "../../components/alerts/Alerts";
import LayoutComponent from "../../layout/LayoutComponent";

const AlertsPage = () => (
  <LayoutComponent
    title="Alerts | Reputation Intelligence"
    sidebarLinksOne={SIDE_MENU_ONE_LINKS_RI}
    sidebarLinksTwo={SIDE_MENU_TWO_LINKS_RI}
  >
    <Alerts />
  </LayoutComponent>
);

export default AlertsPage;
