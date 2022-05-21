import { useSelector } from "react-redux";

import DashboardTutorial from "@/components/tutorial/DashboardTutorial";

import CardSingleInfo from "./cards/CardSingleInfo";
import CardMultipleInfo from "./cards/CardMultipleInfo";
import CardTotalVolume from "./cards/CardTotalVolume";
import CardToneInfo from "./cards/CardToneInfo";
import CardLineChart from "./cards/CardLineChart";
import CardBar from "./cards/CardBar";
import CardMap from "./cards/CardMap";
import CardStackedBar from "./cards/CardStackedBar";
import CardDonut from "./cards/CardDonut";
import CardTable from "./cards/CardTable";
import CardBreakdown from "./cards/CardBreakdown";
import CardInfoScore from "./cards/CardInfoScore";
import CardInfoRanking from "./cards/CardInfoRanking";

import { chartTypes } from "../../data/chartTypes";
import LoadingCard from "./atoms/LoadingCard";
import ErrorCard from "./atoms/ErrorCard";
import SkeletonCard from "../skeleton/dashboard/atoms/SkeletonCard";
import CardScoringRanking from "./cards/CardScoringRanking";
import CardDailyLineChart from "./cards/CardDailyLineChart";
import CardSentimentMap from "./cards/CardSentimentMap";
import CardRIMap from "./cards/CardRIMap";
import CardRanking from "./cards/CardRanking";
import CardDailyTrend from "./cards/CardDailyTrend";
import CardQuarterlyForecast from "./cards/CardQuarterlyForecast";
import CardQuarterlyLine from "./cards/CardQuarterlyLine";
import CardIssuesVsPeerGroup from "./cards/CardIssuesVsPeerGroup";
import CardIssuesByVolume from "./cards/CardIssuesByVolume";
import CardMostImpactfulIssues from "./cards/CardMostImpactfulIssues";
import CardQuarterlyTrend from "./cards/CardQuarterlyTrend";

const DashboardComponent = ({ widgets, isLoading }) => {
  const searchObject = useSelector((state) => state.searchObject);

  const renderWidgets = ({ chart, data, ...props }) => {
    switch (chart) {
      case chartTypes.total:
        return <CardSingleInfo {...data} {...props} />;

      case chartTypes.totalTones:
        return <CardMultipleInfo {...data} {...props} />;

      case chartTypes.leaderTotal:
        return <CardTotalVolume {...data} {...props} />;

      case chartTypes.leaderTones:
        return <CardToneInfo {...data} {...props} />;

      case chartTypes.line:
        return <CardLineChart {...data} {...props} />;

      case chartTypes.bars:
        return <CardBar {...data} {...props} />;

      case chartTypes.stackedBars:
        return <CardStackedBar {...data} {...props} />;

      case chartTypes.map:
        return <CardMap {...data} {...props} />;

      case chartTypes.donut:
        return <CardDonut {...data} {...props} />;

      case chartTypes.topStories:
        return <CardTable {...data} {...props} />;

      case chartTypes.breakdown:
        return <CardBreakdown {...data} {...props} />;

      case chartTypes.infoScore:
        return <CardInfoScore {...data} {...props} />;

      case chartTypes.infoRanking:
        return <CardInfoRanking {...data} {...props} />;

      case chartTypes.scoringRanking:
        return <CardScoringRanking {...data} {...props} />;

      case chartTypes.dailyLine:
        return <CardDailyLineChart {...data} {...props} />;

      case chartTypes.sentimentMap:
        return <CardSentimentMap {...data} {...props} />;

      case chartTypes.ranking:
        return <CardRanking {...data} {...props} />;

      case chartTypes.dailyTrend:
        return <CardDailyTrend {...data} {...props} />;

      case chartTypes.quarterlyForecast:
        return <CardQuarterlyForecast {...data} {...props} />;

      case chartTypes.pyramid:
        return <CardMostImpactfulIssues {...data} {...props} />;

      case chartTypes.stackedBarIssues:
        return <CardIssuesByVolume {...data} {...props} />;

      case chartTypes.sunburst:
        return <CardIssuesVsPeerGroup {...data} {...props} />;

      case chartTypes.quarterlyLine:
        return <CardQuarterlyLine {...data} {...props} />;

      case chartTypes.quarterlyTrend:
        return <CardQuarterlyTrend {...data} {...props} />;

      case chartTypes.reputationMap:
        return <CardRIMap {...data} {...props} />;

      default:
        return <div></div>;
    }
  };

  const renderCards = (widget) => {
    const height = widget.height ?? (widget.size > 2 ? "450px" : "140px");

    if (isLoading || widget?.loading) {
      return <LoadingCard style={{ height }} />;
    }

    if (searchObject.tags.length === 0) {
      return <SkeletonCard style={{ height }} />;
    }

    if (widget?.data?.status === "OFF" || widget?.data?.status === "ERROR") {
      return <ErrorCard style={{ height }} message={widget.data.message} />;
    }

    return renderWidgets(widget);
  };

  return (
    <section className="c-dashboard">
      {widgets.map((widget) => (
        <div
          key={widget.key}
          id={`widget-${widget.key}`}
          className={`c-widget--${widget.size}`}
        >
          {renderCards(widget, isLoading || widget?.isLoading)}
        </div>
      ))}
      <DashboardTutorial />
    </section>
  );
};

export default DashboardComponent;
