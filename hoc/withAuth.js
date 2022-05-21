import cookie from "js-cookie";
import { useRouter } from "next/router";
import absoluteUrl from "next-absolute-url";

const ALLOW_ROUTES = [
  "/login",
  "/change-password",
  "/password-recovery",
  "/error-example",
];

const withAuth = (WrappedComponent) => (props) => {
  // checks whether we are on client / browser or server.
  if (typeof window !== "undefined") {
    const Router = useRouter();
    const accessToken = cookie.get("token");

    if (!ALLOW_ROUTES.some((route) => route === Router.pathname)) {
      const liveAccess = cookie.get("liveAccess");

      if (!accessToken) {
        Router.replace("/login");
      } else if (
        Router.pathname.startsWith("/reputation-intelligence/") &&
        !liveAccess.includes("live3RI")
      ) {
        Router.replace("/media-intelligence/dashboard");
      } else if (liveAccess === "live2") {
        const { origin } = absoluteUrl();
        window.location.href = `${origin}/content`;
      } else {
        return <WrappedComponent {...props} />;
      }
    } else {
      // If this is an accessToken we just render the component that was passed with all its props

      return <WrappedComponent {...props} />;
    }
  }

  // If we are on server, return null
  return null;
};

export default withAuth;
