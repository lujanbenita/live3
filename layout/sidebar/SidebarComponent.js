import Link from "next/link";
import { useRouter } from "next/router";

import { getIfLinkIsActive } from "../../utils/navigationUtils";
import { useResponsive } from "../../utils/hooks/useResponsive";
import SidebarResponsive from "./SidebarResponsive";

const SidebarComponent = ({ sidebarLinksOne, sidebarLinksTwo }) => {
  const router = useRouter();
  const { isLowerThanSmallDesktop } = useResponsive();

  return isLowerThanSmallDesktop ? (
    <SidebarResponsive
      sidebarLinksOne={sidebarLinksOne}
      sidebarLinksTwo={sidebarLinksTwo}
    />
  ) : (
    <div className="c-sidebar">
      <div className="c-sidebar__wrapper">
        <div className="c-sidebar__menu-one">
          {sidebarLinksOne?.map((link, i) => (
            <Link href={link.path} key={link.id || i}>
              <a
                className={`c-sidebar__link ${
                  getIfLinkIsActive(router, link, sidebarLinksOne)
                    ? "c-sidebar__link--active"
                    : ""
                }`}
              >
                {link.icon}
              </a>
            </Link>
          ))}
        </div>
        <div className="c-sidebar__menu-two">
          {sidebarLinksTwo?.map((link, i) => (
            <Link href={link.path} key={link.id || i}>
              <a
                className={`c-sidebar__link ${
                  getIfLinkIsActive(router, link, sidebarLinksTwo)
                    ? "c-sidebar__link--active"
                    : ""
                }`}
              >
                {link.icon}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;
