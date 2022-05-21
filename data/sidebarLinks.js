// import Content from "public/img/icons/sidebar/content.svg";
// import SubscriptionInfo from "public/img/icons/sidebar/subscription-info.svg";
import Alert from "public/img/icons/sidebar/alert.svg";
import Analytics from "public/img/icons/sidebar/analytics.svg";
import Save from "public/img/icons/sidebar/save.svg";

/* ----------------------------------- MI ----------------------------------- */

export const SIDE_MENU_ONE_LINKS = [
  {
    icon: <Analytics />,
    path: "/media-intelligence/dashboard",
    sectionPath: "/media-intelligence/dashboard|/media-intelligence/feed",
    id: "search",
  },
  {
    icon: <Alert />,
    path: "/media-intelligence/alerts",
    sectionPath: "/media-intelligence/alerts",
    id: "alerts",
  },
];

export const SIDE_MENU_TWO_LINKS = [
  {
    icon: <Save />,
    path: "/media-intelligence/saved-searches",
    sectionPath: "/media-intelligence/saved-searches",
    id: "box",
  },
];

/* ----------------------------------- RI ----------------------------------- */

export const SIDE_MENU_ONE_LINKS_RI = [
  {
    icon: <Analytics />,
    path: "/reputation-intelligence/reputation",
    sectionPath:
      "/reputation-intelligence/reputation|/reputation-intelligence/sentiment|/reputation-intelligence/topics|/reputation-intelligence/feed",
    id: "search",
  },
  {
    icon: <Alert />,
    path: "/reputation-intelligence/alerts",
    sectionPath: "/reputation-intelligence/alerts",
    id: "alerts",
  },
];

export const SIDE_MENU_TWO_LINKS_RI = [
  {
    icon: <Save />,
    path: "/reputation-intelligence/saved-searches",
    sectionPath: "/reputation-intelligence/saved-searches",
    id: "box",
  },
];
