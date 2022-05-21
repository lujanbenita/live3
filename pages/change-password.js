import LayoutComponent from "../layout/LayoutComponent";
import ChangePasswordComponent from "../components/login/ChangePasswordComponent";

const ResetPassword = () => (
  <LayoutComponent layout="no-layout" title="Reset Password">
    <div className="p-login">
      <ChangePasswordComponent />
    </div>
  </LayoutComponent>
);

export default ResetPassword;
