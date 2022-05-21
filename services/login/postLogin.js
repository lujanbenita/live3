import Router from "next/router";
import axios from "axios";
import FormData from "form-data";
import cookie from "js-cookie";

async function postLogin(data = { username: "", password: "" }) {
  const { data: response } = await axios.post("/api/login", data);

  if (process.env.NODE_ENV === "production") {
    const live2Data = new FormData();
    live2Data.append("username", data.username);
    live2Data.append("password", data.password);
    if (typeof window !== "undefined") {
      // eslint-disable-next-line prefer-destructuring
      const hostname = window.location.hostname;
      cookie.remove("JSESSIONID", { path: "/", domain: hostname });
      cookie.remove("liveAccess");
    }
    await axios({
      method: "get",
      url: "/services/logout",
    });
    await axios({
      method: "post",
      url: "/content",
      data: live2Data,
    });
    if (response.liveAccess === "live2") {
      Router.push(`../content`);
    }
  }

  return response;
}

export default postLogin;
