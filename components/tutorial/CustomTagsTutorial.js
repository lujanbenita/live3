import Tutorial from "./Tutorial";

const CustomTagsTutorial = () => {
  const settings = {
    settingName: "customTags",
    disableValues: {
      customTags: false,
    },
  };

  const steps = [
    {
      element: ".c-article-detail-tags__add-button",
      intro: `
            <div class="c-tutorial__text">
              <p>You can add your own custom tags to the article and filter by these in your search.</p>
            </div>
          `,
      tooltipClass: "c-tutorial__tooltip c-tutorial__tooltip--dashboard-5",
      highlightClass: "c-tutorial__highlight",
      position: "left",
    },
  ];

  return <Tutorial settings={settings} steps={steps} />;
};

export default CustomTagsTutorial;
