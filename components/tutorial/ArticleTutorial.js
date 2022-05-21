import Tutorial from "./Tutorial";

const ArticleTutorial = () => {
  const settings = {
    settingName: "article",
    disableValues: {
      article: false,
    },
  };

  const steps = [
    {
      element: ".c-feed-table-info__title",
      intro: `
            <div class="c-tutorial__text">
              <p>Click here to investigate a specific article in detail.</p>
            </div>
          `,
      tooltipClass: "c-tutorial__tooltip c-tutorial__tooltip--dashboard-4",
      highlightClass: "c-tutorial__highlight",
      position: "bottom",
    },
    {
      element: ".c-multiple-weight-bar",
      intro: `
            <div class="c-tutorial__text">
              <p>Amplification is derived from alva’s proprietary weighting methodology. We calculate the importance of each individual company mention based on three factors: the influence of the source, the prominence of the mention and the relevancy of the mention to the company.</p>
            </div>
          `,
      tooltipClass: "c-tutorial__tooltip c-tutorial__tooltip--dashboard-4",
      highlightClass: "c-tutorial__highlight",
      position: "bottom",
    },
    {
      element: ".c-circulation-widget__circulation",
      intro: `
            <div class="c-tutorial__text">
              <p>Circulation is a measure of the total potential audience of a piece of content – e.g. unique users, followers, subscribers, viewers.</p>
            </div>
          `,
      tooltipClass: "c-tutorial__tooltip c-tutorial__tooltip--dashboard-4",
      highlightClass: "c-tutorial__highlight",
      position: "bottom",
    },
  ];

  return <Tutorial settings={settings} steps={steps} />;
};

export default ArticleTutorial;
