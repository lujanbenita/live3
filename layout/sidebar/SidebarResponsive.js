import { BottomNavigationAction } from "@material-ui/core";
import { useRouter } from "next/router";

import { getIfLinkIsActive } from "../../utils/navigationUtils";

const SidebarResponsive = ({ sideBarLinksOne, sidebarLinksTwo }) => {
  const router = useRouter();

  const handleChange = (link) => {
    router.push(`${link.path}`);
  };

  return (
    <div className="c-sidebar-responsive">
      {sideBarLinksOne?.map((link) => (
        <BottomNavigationAction
          key={link.id}
          value={link.id}
          icon={link.icon}
          onClick={() => {
            handleChange(link);
          }}
          classes={{
            root: `c-sidebar-responsive__button ${
              getIfLinkIsActive(router, link, sideBarLinksOne)
                ? "c-sidebar-responsive__button--active"
                : ""
            }`,
          }}
        />
      ))}
      {sidebarLinksTwo?.map((link) => (
        <BottomNavigationAction
          key={link.id}
          value={link.id}
          icon={link.icon}
          onClick={() => {
            handleChange(link);
          }}
          classes={{
            root: `c-sidebar-responsive__button ${
              getIfLinkIsActive(router, link, sidebarLinksTwo)
                ? "c-sidebar-responsive__button--active"
                : ""
            }`,
          }}
        />
      ))}
    </div>
  );
};

export default SidebarResponsive;
