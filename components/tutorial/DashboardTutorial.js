import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Tutorial from "./Tutorial";

const DashboardTutorial = () => {
  const searchObject = useSelector((state) => state.searchObject);
  const [showTutorial, setShowTutorial] = useState(false);

  const settings = {
    settingName: "dashboardPage",
    disableValues: {
      dashboardPage: false,
      dashboard: false,
    },
  };

  const steps = [
    {
      element: ".c-search-bar",
      intro: `
            <div class="c-tutorial__text">
              <p>Welcome to alva Live.
                <br />
                Your experience starts here.
              </p>
              <p>Use the searchbox to select terms, companies, products, etc. to perform your first search.</p>
            </div>
          `,
      tooltipClass: "c-tutorial__tooltip c-tutorial__tooltip--dashboard-1",
      highlightClass: "c-tutorial__highlight",
      position: "bottom",
    },
    {
      element: ".c-sidebar__wrapper",
      intro: `
            <div class="c-tutorial__text">
              <p>Use the options menu to perform analysis, access your saved searches and manage alerts.</p>
            </div>
          `,
      tooltipClass: "c-tutorial__tooltip c-tutorial__tooltip--dashboard-2",
      highlightClass: "c-tutorial__highlight c-tutorial__highlight--inner",
      position: "right",
    },
    {
      element: ".c-avatar__avatar",
      intro: `
            <div class="c-tutorial__text">
              <p>Access your user data and configuration of key authors and key publications lists.</p>
            </div>
          `,
      tooltipClass: "c-tutorial__tooltip c-tutorial__tooltip--dashboard-3",
      highlightClass: "c-tutorial__highlight c-tutorial__highlight--inner",
      position: "right",
    },
  ];

  useEffect(() => {
    setShowTutorial(searchObject.tags.length === 0);
  }, [searchObject]);

  if (!showTutorial) return <></>;

  return <Tutorial settings={settings} steps={steps} />;
};

export default DashboardTutorial;
