import Tutorial from "./Tutorial";

const SavedSearchActionsTutorial = () => {
  const settings = {
    settingName: "savedSearchActions",
    disableValues: {
      savedSearchActions: false,
    },
  };

  const steps = [
    {
      element: ".c-saved-searches__tutorial",
      intro: `
            <div class="c-tutorial__text">
              <p>Click here to retrieve a saved analysis.</p>
            </div>
          `,
      tooltipClass: "c-tutorial__tooltip c-tutorial__tooltip--dashboard-4",
      highlightClass: "c-tutorial__highlight",
      position: "left",
    },
  ];

  return <Tutorial settings={settings} steps={steps} />;
};

export default SavedSearchActionsTutorial;
