import LoginComponent from "components/login/LoginComponent";
import LayoutComponent from "layout/LayoutComponent";

const Login = () => (
  <LayoutComponent layout="no-layout" title="Login">
    <div className="p-login">
      <LoginComponent />
    </div>
  </LayoutComponent>
);

export default Login;
