import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import Link from "next/link";

import { getIfLinkIsActive } from "../../utils/navigationUtils";
import { useResponsive } from "../../utils/hooks/useResponsive";
import { NAV_LINKS } from "../../data/navLinks";
import AvatarMenu from "./AvatarMenu";
import NavbarTab from "./NavbarTab";
import NavSelector from "./NavSelector";
import { LogoIcon } from "../../icons/IconsLibrary";
import CloseButton from "../../components/common/buttons/CloseButton";

const NavbarComponent = ({ isSimple, title }) => {
  const router = useRouter();
  const liveAccess = useSelector((state) => state.user.liveAccess);
  const { isLowerThanSmallDesktop } = useResponsive();

  const navLinks = NAV_LINKS.map((item) => {
    const link = item;
    if (
      process.env.NODE_ENV === "production" &&
      link.id === "reputation-intelligence" &&
      !liveAccess?.includes("live3RI")
    ) {
      link.disabled = true;
    }
    return link;
  });

  return (
    <nav className={`c-navbar ${isSimple ? "c-navbar--simple" : ""}`}>
      <div className="c-navbar__logo">
        <Link href="/">
          <a>
            <LogoIcon />
          </a>
        </Link>
      </div>
      {!isSimple ? (
        <>
          {isLowerThanSmallDesktop ? (
            <NavSelector options={navLinks} />
          ) : (
            <div className="c-navbar__links">
              {navLinks.map((link) => (
                <NavbarTab
                  key={link.id}
                  isActive={getIfLinkIsActive(router, link, navLinks)}
                  extraClass={`${link.id} ${
                    link.disabled ? "c-navbar--disabled" : ""
                  }`}
                >
                  <Link href={link.disabled ? "#" : link.path}>
                    <a>{link.string}</a>
                  </Link>
                </NavbarTab>
              ))}
            </div>
          )}
        </>
      ) : (
        <h1 className="c-navbar__title">{title}</h1>
      )}
      {isSimple && (
        <CloseButton
          action={() => {
            router.push("/media-intelligence/dashboard");
          }}
        />
      )}
      <div className="c-navbar__avatar-container">
        <AvatarMenu />
      </div>
    </nav>
  );
};

export default NavbarComponent;
