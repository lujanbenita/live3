import PasswordRecoveryComponent from "components/login/PasswordRecoveryComponent";
import LayoutComponent from "layout/LayoutComponent";

const PasswordRecovery = () => (
  <LayoutComponent layout="no-layout" title="Reset Password">
    <div className="p-login">
      <PasswordRecoveryComponent />
    </div>
  </LayoutComponent>
);

export default PasswordRecovery;
