export default function handler(req, res) {
  if (process.env.NODE_ENV === "production") {
    res.status(404);
    return;
  }

  const { query } = req;

  if (!query.endpoint && !query.test) {
    res.status(200).json({});
    return;
  }

  switch (query.endpoint) {
    default:
      res.status(200).json({});
      return;
    case "postReputationPosition":
      switch (parseInt(query.test, 10)) {
        default:
        case 1:
          res.status(200).json({});
          break;
        case 2:
          res.status(200).json({ variation: "-", position: "-" });
          break;
        case 3:
          res.status(200).json({ position: 0 });
          break;
      }
      break;
    case "postTopVolumeTag":
      switch (parseInt(query.test, 10)) {
        default:
        case 1:
          res.status(200).json({});
          break;
        case 2:
          res.status(200).json({
            articleCount: "-",
            articleCountChangePercent: "-",
            base64TagImage: "-",
            tagId: "-",
            tagName: "-",
          });
          break;
        case 3:
          res.status(200).json({ position: 0 });
          break;
      }
      break;
    case "reputation-leader":
      switch (parseInt(query.test, 10)) {
        default:
        case 1:
          res.status(200).json({});
          break;
        case 2:
          res.status(200).json({
            logo: "-",
            name: "-",
            score: "-",
            variation: "-",
          });
          break;
        case 3:
          res.status(200).json({ position: 0 });
          break;
      }
      break;
    case "reputation-vs-comparator-average":
      switch (parseInt(query.test, 10)) {
        default:
        case 1:
          res.status(200).json({});
          break;
        case 2:
          res.status(200).json({
            averageScore: "-",
            clientScoreDifference: "-",
            variation: "-",
          });
          break;
        case 3:
          res.status(200).json({ position: 0 });
          break;
      }
      break;
    case "visibility-leader":
      switch (parseInt(query.test, 10)) {
        default:
        case 1:
          res.status(200).json({});
          break;
        case 2:
          res.status(200).json({
            logo: "-",
            name: "",
            variation: "-",
            visibility: "-",
          });
          break;
        case 3:
          res.status(200).json({ position: 0 });
          break;
      }
      break;
    case "reputation-score":
      switch (parseInt(query.test, 10)) {
        default:
        case 1:
          res.status(200).json({});
          break;
        case 2:
          res.status(200).json({
            sentimentScore: "-",
            variation: "-",
          });
          break;
        case 3:
          res.status(200).json({ position: 0 });
          break;
      }
      break;
    case "daily-visibility-average":
      switch (parseInt(query.test, 10)) {
        default:
        case 1:
          res.status(200).json({});
          break;
        case 2:
          res.status(200).json({
            variation: "-",
            visibility: "-",
          });
          break;
        case 3:
          res.status(200).json({ position: 0 });
          break;
      }
      break;
    case "toptonetag":
      switch (parseInt(query.test, 10)) {
        default:
        case 1:
          res.status(200).json({});
          break;
        case 2:
          res.status(200).json({
            base64TagImage: "-",
            negativeMentionsPercent: "-",
            neutralMentionsPercent: "-",
            positiveMentionsPercent: "-",
            positiveOrNeutralMentionsPercentChangePercent: "-",
            tagId: "-",
            tagName: "-",
          });
          break;
        case 3:
          res.status(200).json({ position: 0 });
          break;
      }
      break;
    case "summary":
      switch (parseInt(query.test, 10)) {
        default:
        case 1:
          res.status(200).json({});
          break;
        case 2:
          res.status(200).json({
            articleCount: "-",
            articleCountChangePercent: "-",
            avgMentionsPerDay: "-",
            avgMentionsPerDayChangePercent: "-",
            negativeMentionsCount: "-",
            negativeMentionsPercent: "-",
            negativeMentionsPercentChangePercent: "-",
            negativeVisibility: "-",
            negativeVisibilityPercent: "-",
            negativeVisibilityPercentChangePercent: "-",
            neutralMentionsCount: "-",
            neutralMentionsPercent: "-",
            neutralMentionsPercentChangePercent: "-",
            neutralVisibility: "-",
            neutralVisibilityPercent: "-",
            neutralVisibilityPercentChangePercent: "-",
            positiveMentionsCount: "-",
            positiveMentionsPercent: "-",
            positiveMentionsPercentChangePercent: "-",
            positiveVisibility: "-",
            positiveVisibilityPercent: "-",
            positiveVisibilityPercentChangePercent: "-",
          });
          break;
        case 3:
          res.status(200).json({ position: 0 });
          break;
      }
      break;
    case "postReputationLeader":
      switch (query.test) {
        default:
        case 1:
          res.status(200).json({});
          break;
        case 2:
          res.status(200).json({ test: "ok" });
          break;
      }
      break;
  }
}
