import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import LayoutComponent from "layout/LayoutComponent";
import { SEARCH_TABS_RI } from "data/tabLinks";

import {
  SIDE_MENU_ONE_LINKS_RI,
  SIDE_MENU_TWO_LINKS_RI,
} from "@/data/sidebarLinks";

import CountrySelector from "@/components/search/searchBar/CountrySelector";
import InputSearchRI from "@/components/search/searchBar/InputSearchRI";

import { widgetProcessor } from "@/components/dashboard/cardDataGenerators/widgetProcessor";
import SearchComponent from "@/components/search/SearchComponent";
import { setData as updateObjectSearch } from "@/redux/searchObject/actions";
import { chartTypes } from "@/data/chartTypes";
import DashboardComponent from "@/components/dashboard/DashboardComponent";
import { postDashboardReputation } from "@/services/dashboard/ri/postDashboardReputation";
import StakeholdersFilter from "@/components/common/inputs/StakeholdersFilter";
import TagTaxonomyModal from "@/components/tagTaxonomy/TagTaxonomyModal";
import TagTaxonomyLauncher from "@/components/tagTaxonomy/TagTaxonomyLauncher";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const searchObject = useSelector((state) => state.searchObject);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  const fetchSearch = async (searchData) => {
    setIsLoading(true);
    const responses = await postDashboardReputation(searchData);
    setData(responses);
    setIsLoading(false);
  };

  const handleSubmitSearch = (searchData) => {
    dispatch(updateObjectSearch(searchData));
  };

  useEffect(() => {
    if (searchObject.tags.length > 0) {
      (async () => {
        await fetchSearch(searchObject);
      })();
    }
  }, [searchObject]);

  const ReputationWidgets = ({
    reputationScore,
    reputationRankingVsPeers,
    reputationScoreByCountry,
    reputationRanking,
    reputationQuarterlyTrend,
    reputationOverTime,
  }) => [
    {
      chart: chartTypes.infoScore,
      data: widgetProcessor({
        title: "Reputation Score",
        response: reputationScore,
      }),
      modalContent: '"Reputation Score" widget description',
      text: "Yearly change",
      size: 6,
      height: "150px",
      key: "ri-sentiment-score",
    },
    {
      chart: chartTypes.infoRanking,
      data: widgetProcessor({
        title: "Reputation ranking vs peers",
        response: reputationRankingVsPeers,
      }),
      modalContent: '"Reputation ranking vs peers" widget description',
      text: "Yearly change",
      size: 6,
      height: "150px",
      key: "ri-sentiment-ranking-vs-peers",
    },
    {
      chart: chartTypes.reputationMap,
      data: widgetProcessor({
        title: "Reputation score by Country",
        response: reputationScoreByCountry,
      }),
      subtitle: searchObject?.selectedTag?.tagName,
      modalContent: '"Reputation score by Country" widget description',
      size: 6,
      height: "450px",
      key: "ri-reputation-score-by-country",
      onClick: (e) => {
        console.log(e);
      },
    },
    {
      chart: chartTypes.ranking,
      data: widgetProcessor({
        title: "Reputation ranking",
        response: reputationRanking,
      }),
      subtitle: searchObject?.selectedTag?.tagName,
      modalContent: '"Reputation ranking" widget description',
      size: 6,
      height: "450px",
      key: "ri-reputation-ranking",
      onClick: (e) => {
        console.log(e);
      },
    },
    {
      chart: chartTypes.quarterlyLine,
      data: widgetProcessor({
        title: "Quarterly reputation and sentiment trend",
        response: reputationQuarterlyTrend,
      }),
      subtitle: searchObject?.selectedTag?.tagName,
      modalContent:
        '"Quarterly reputation and sentiment trend" widget description',
      size: 8,
      height: "450px",
      key: "ri-quarterly-reputation-and-sentiment-trend",
      onClick: (tag, date) => {
        console.log(tag, date);
      },
    },
    {
      chart: chartTypes.quarterlyForecast,
      data: widgetProcessor({
        title: "Quarterly reputation forecast",
        response: reputationQuarterlyTrend,
      }),
      subtitle: searchObject?.selectedTag?.tagName,
      modalContent: '"Quarterly reputation forecast" widget description',
      size: 4,
      height: "450px",
      key: "ri-quarterly-reputation-forecast",
      onClick: (tag, date) => {
        console.log(tag, date);
      },
    },
    {
      chart: chartTypes.quarterlyTrend,
      data: widgetProcessor({
        title: "Reputation over time vs peers",
        response: reputationOverTime,
      }),
      subtitle: searchObject?.selectedTag?.tagName,
      modalContent: '"Reputation over time vs peers" widget description',
      size: 12,
      height: "450px",
      key: "ri-reputation-over-time-vs-peers",
      onClick: (tag, date) => {
        console.log(tag, date);
      },
    },
  ];

  return (
    <LayoutComponent
      title="Reputation Dashboard | Reputation Intelligence"
      showLoader={isLoading}
      sidebarLinksOne={SIDE_MENU_ONE_LINKS_RI}
      sidebarLinksTwo={SIDE_MENU_TWO_LINKS_RI}
    >
      <SearchComponent
        onFilterValueChange={handleSubmitSearch}
        onSubmit={handleSubmitSearch}
        searchTabs={SEARCH_TABS_RI}
        module="RI"
        searchBar={(control) => (
          <div className="c-search-bar__main--no-calendar">
            <InputSearchRI control={control} name="tags" />
            <TagTaxonomyLauncher setOpenModal={setOpenModal} />
            <CountrySelector control={control} name="filterValues.countries" />
          </div>
        )}
        filterBar={(control, options) => (
          <StakeholdersFilter control={control} options={options} />
        )}
      />
      <DashboardComponent
        searchData={data}
        widgets={ReputationWidgets(data)}
        isLoading={isLoading}
      />
      {openModal && (
        <TagTaxonomyModal
          whitelist={["Person", "Company"]}
          open={openModal}
          setOpen={setOpenModal}
        />
      )}
    </LayoutComponent>
  );
};

export default Dashboard;
