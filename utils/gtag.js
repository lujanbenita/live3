export const event = ({ action, value }) => {
  if (typeof window.gtag !== "undefined") {
    window.gtag("event", action, value);
  }
};

export const handleClickGA = (user) => {
  event({
    action: "user_event_click",
    value: { user, client: "alva" },
  });
};

export const currentPageGA = (user) => {
  event({
    action: "user_opened_page",
    value: { user, client: "alva" },
  });
};
