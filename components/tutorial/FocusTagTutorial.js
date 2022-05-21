import { useEffect, useState } from "react";

import Tutorial from "./Tutorial";

const FocusTagTutorial = ({ tags }) => {
  const [showTutorial, setShowTutorial] = useState(false);

  const settings = {
    settingName: "focusTag",
    disableValues: {
      focusTag: false,
    },
  };

  const steps = [
    {
      element: ".c-tag:first-child",
      intro: `
            <div class="c-tutorial__text">
              <p>You can click on one of your tags to view data for this tag, but retain comparisons with the other tags.</p>
            </div>
          `,
      tooltipClass: "c-tutorial__tooltip c-tutorial__tooltip--dashboard-4",
      highlightClass: "c-tutorial__highlight",
      position: "bottom",
    },
  ];

  useEffect(() => {
    setShowTutorial(tags.length > 0);
  }, [tags]);

  if (!showTutorial) return <></>;

  return <Tutorial settings={settings} steps={steps} />;
};

export default FocusTagTutorial;
