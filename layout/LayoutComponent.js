import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Script from "next/script";
import { currentPageGA } from "../utils/gtag";

import HeadComponent from "./HeadComponent";
import NavbarComponent from "./navbar/NavbarComponent";
import SidebarComponent from "./sidebar/SidebarComponent";
import Loading from "../components/common/loading/loading";

const LayoutComponent = ({
  children,
  title,
  layout,
  showLoader,
  sidebarLinksOne,
  sidebarLinksTwo,
}) => {
  const user = useSelector((state) => state.user.username);
  const router = useRouter();

  const [analyticsCode, setAnalyticsCode] = useState();

  useEffect(() => {
    const { hostname } = window.location;
    let domainUA = null;
    switch (hostname) {
      default:
        break;
      case "proundev.alva-group.com":
      case "pilot.alva.live":
        domainUA = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_PILOT;
        break;
      case "alva.live":
        domainUA = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_LIVE;
        break;
      case "localhost":
        domainUA = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
        break;
    }
    setAnalyticsCode(domainUA);
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      if (!analyticsCode || !user) {
        return;
      }
      currentPageGA(user);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  const renderLayout = () => {
    switch (layout) {
      case "simple-layout":
        return (
          <div className="c-layout">
            <div className="c-layout__navbar">
              <NavbarComponent isSimple title={title} />
            </div>
            <div className="c-layout__children-container--simple">
              {children}
            </div>
          </div>
        );

      case "no-layout":
        return (
          <div className="c-layout__children-container--no-layout">
            {children}
          </div>
        );

      default:
        return (
          <>
            {showLoader && (
              <div
                aria-hidden="true"
                className="c-layout__loading-backdrop"
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <Loading />
              </div>
            )}
            <div className={`c-layout ${showLoader ? "c-layout--loader" : ""}`}>
              <div className="c-layout__navbar">
                <NavbarComponent />
              </div>
              <div className="c-layout__sidebar">
                <SidebarComponent
                  sidebarLinksOne={sidebarLinksOne}
                  sidebarLinksTwo={sidebarLinksTwo}
                />
              </div>
              <div className="c-layout__children-container">{children}</div>
            </div>
          </>
        );
    }
  };

  return (
    <>
      <HeadComponent title={title} />
      {analyticsCode && (
        <>
          <Script
            id="tag-manager"
            src={`https://www.googletagmanager.com/gtag/js?id=${analyticsCode}`}
            onLoad={() => {
              if (user) {
                currentPageGA(user);
              }
            }}
          />
          <Script id="tag-manager-config">
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${analyticsCode}');
                gtag('config', '${analyticsCode}', {
                  'custom_map': {
                    'dimension2': 'urlclicked',
                    'dimension3': 'user',
                    'dimension4': 'client',
                    'dimension5': 'publication'
                  }
                });
            `}
          </Script>
        </>
      )}
      {renderLayout()}
    </>
  );
};

export default LayoutComponent;
