import { useState } from "react";

import Tutorial from "./Tutorial";

const ExportChartTutorial = () => {
  const [showTutorial] = useState(true);

  const settings = {
    settingName: "exportChart",
    disableValues: {
      exportChart: false,
    },
  };

  const steps = [
    {
      element: ".c-export-button__chart",
      intro: `
            <div class="c-tutorial__text">
              <p>You can download your charts to share in presentations.</p>
            </div>
          `,
      tooltipClass: "c-tutorial__tooltip c-tutorial__tooltip--dashboard-4",
      highlightClass: "c-tutorial__highlight",
      position: "bottom",
    },
  ];

  if (!showTutorial) return <></>;

  return <Tutorial settings={settings} steps={steps} />;
};

export default ExportChartTutorial;
