import LayoutComponent from "../../layout/LayoutComponent";
import MySettingsComponent from "../../components/myAccount/MySettingsComponent";

const MySettings = () => (
  <LayoutComponent layout="simple-layout" title="My Account">
    <MySettingsComponent />
  </LayoutComponent>
);

export default MySettings;
