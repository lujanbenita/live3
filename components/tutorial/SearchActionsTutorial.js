import { useEffect, useState } from "react";

import Tutorial from "./Tutorial";

const SearchActionsTutorial = (actionsEnabled) => {
  const [showTutorial, setShowTutorial] = useState(false);

  const settings = {
    settingName: "searchActions",
    disableValues: {
      searchActions: false,
    },
  };

  const steps = [
    {
      element: ".c-search-actions__filter-button",
      intro: `
            <div class="c-tutorial__text">
              <p>You can refine your search using filters, to analyze the content by source type, tone, publication and more.</p>
            </div>
          `,
      tooltipClass: "c-tutorial__tooltip c-tutorial__tooltip--dashboard-4",
      highlightClass: "c-tutorial__highlight",
      position: "left",
    },
    {
      element: ".c-search-actions__save-filter-button",
      intro: `
            <div class="c-tutorial__text">
              <p>You can save your analysis and retrieve it whenever you want.</p>
            </div>
          `,
      tooltipClass: "c-tutorial__tooltip c-tutorial__tooltip--dashboard-4",
      highlightClass: "c-tutorial__highlight",
      position: "left",
    },
    {
      element: ".c-options-button",
      intro: `
            <div class="c-tutorial__text">
              <p>You can use your search to create other outputs, such as email alerts.</p>
            </div>
          `,
      tooltipClass: "c-tutorial__tooltip c-tutorial__tooltip--dashboard-4",
      highlightClass: "c-tutorial__highlight",
      position: "left",
    },
  ];

  useEffect(() => {
    setShowTutorial(actionsEnabled);
  }, [actionsEnabled]);

  if (!showTutorial) return <></>;

  return <Tutorial settings={settings} steps={steps} />;
};

export default SearchActionsTutorial;
