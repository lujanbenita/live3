import Router from "next/router";
import axios from "axios";
import cookie from "js-cookie";

export const storeToken = (token, rememberMe, credentials, liveAccess) => {
  if (rememberMe) {
    cookie.set("token", token, { expires: 7 });
    cookie.set("credentials", credentials, { expires: 7 });
  } else {
    cookie.set("token", token);
    cookie.remove("credentials");
  }

  cookie.set("liveAccess", liveAccess, { expires: 7 });
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  Router.push("/media-intelligence/dashboard");
};

export const removeToken = () => {
  cookie.remove("token");
  return Router.push("/login");
};
