import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import LayoutComponent from "layout/LayoutComponent";
import { SEARCH_TABS_RI } from "data/tabLinks";

import { widgetProcessor } from "@/components/dashboard/cardDataGenerators/widgetProcessor";

import {
  SIDE_MENU_ONE_LINKS_RI,
  SIDE_MENU_TWO_LINKS_RI,
} from "@/data/sidebarLinks";

import DatePicker from "@/components/search/searchBar/DatePicker";
import CountrySelector from "@/components/search/searchBar/CountrySelector";
import InputSearchRI from "@/components/search/searchBar/InputSearchRI";

import SearchComponent from "@/components/search/SearchComponent";
import DashboardComponent from "@/components/dashboard/DashboardComponent";
import { chartTypes } from "@/data/chartTypes";
import {
  setCountry,
  setData as updateObjectSearch,
  setDate,
  setSelectedTag,
} from "@/redux/searchObject/actions";
import { postDashboardSentiment } from "@/services/dashboard/ri/postDashboardSentiment";
import StakeholdersFilter from "@/components/common/inputs/StakeholdersFilter";
import { useRouter } from "next/router";
import TagTaxonomyModal from "@/components/tagTaxonomy/TagTaxonomyModal";
import TagTaxonomyLauncher from "@/components/tagTaxonomy/TagTaxonomyLauncher";

const Sentiment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const searchObject = useSelector((state) => state.searchObject);
  const filterOptions = useSelector((state) => state.search.filterOptions);
  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const fetchSearch = async (searchData) => {
    setIsLoading(true);
    const responses = await postDashboardSentiment(searchData);
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

  const SentimentWidgets = ({
    sentimentScore,
    sentimentRankingVsPeers,
    mostImpactfulPositiveTopics,
    mostImpactfulNegativeTopics,
    dailySentimentAndTrend,
    sentimentScoreByCountry,
    sentimentRanking,
    sentimentTrendVsPeers,
  }) => [
    {
      chart: chartTypes.infoScore,
      data: widgetProcessor({
        title: "Sentiment Score",
        response: sentimentScore,
      }),
      modalContent: '"Sentiment Score" widget description',
      text: "Change",
      size: 6,
      height: "150px",
      key: "ri-sentiment-score",
    },
    {
      chart: chartTypes.infoRanking,
      data: widgetProcessor({
        title: "Sentiment ranking vs peers",
        response: sentimentRankingVsPeers,
      }),
      modalContent: '"Sentiment ranking vs peers" widget description',
      text: "Change",
      size: 6,
      height: "150px",
      key: "ri-sentiment-ranking-vs-peers",
    },
    {
      chart: chartTypes.scoringRanking,
      data: widgetProcessor({
        title: "Most impactful positive issues",
        response: mostImpactfulPositiveTopics,
      }),
      subtitle: searchObject?.selectedTag?.tagName,
      modalContent: '"Most impactful positive issues" widget description',
      style: "positive",
      size: 6,
      height: "450px",
      key: "ri-most-impactful-positive-issues",
    },
    {
      chart: chartTypes.scoringRanking,
      data: widgetProcessor({
        title: "Most impactful negative issues",
        response: mostImpactfulNegativeTopics,
      }),
      subtitle: searchObject?.selectedTag?.tagName,
      modalContent: '"Most impactful negative issues" widget description',
      style: "negative",
      size: 6,
      height: "450px",
      key: "ri-most-impactful-negative-issues",
    },
    {
      chart: chartTypes.dailyLine,
      data: widgetProcessor({
        title: "Daily sentiment and trend",
        response: dailySentimentAndTrend,
      }),
      subtitle: searchObject?.selectedTag?.tagName,
      modalContent: '"Daily sentiment and trend" widget description',
      size: 12,
      height: "450px",
      key: "ri-daily-sentiment-and-trend",
      onClick: (tag, date) => {
        router.push("/reputation-intelligence/feed").then(() => {
          if (tag) {
            dispatch(setSelectedTag(tag));
          }
          if (date) {
            dispatch(setDate(date));
          }
        });
      },
    },
    {
      chart: chartTypes.sentimentMap,
      data: widgetProcessor({
        title: "Sentiment score by Country",
        response: sentimentScoreByCountry,
      }),
      subtitle: searchObject?.selectedTag?.tagName,
      modalContent: '"Sentiment score by Country" widget description',
      size: 6,
      height: "450px",
      key: "ri-sentiment-score-by-country",
      onClick: (name) => {
        const newCountry = filterOptions.countries.find(
          ({ country }) => name === country
        );
        if (!newCountry) return;

        router
          .push("/reputation-intelligence/feed")
          .then(() => dispatch(setCountry(newCountry)));
      },
    },
    {
      chart: chartTypes.ranking,
      data: widgetProcessor({
        title: "Sentiment ranking",
        response: sentimentRanking,
      }),
      subtitle: searchObject?.selectedTag?.tagName,
      modalContent: '"Sentiment ranking" widget description',
      size: 6,
      height: "450px",
      key: "ri-sentiment-ranking",
      onClick: (e) => {
        console.log(e);
      },
    },
    {
      chart: chartTypes.dailyTrend,
      data: widgetProcessor({
        title: "Sentiment trend vs peers",
        response: sentimentTrendVsPeers,
      }),
      subtitle: searchObject?.selectedTag?.tagName,
      modalContent: '"Sentiment trend vs peers" widget description',
      size: 12,
      height: "450px",
      key: "ri-sentiment-trend-vs-peers",
      onClick: (tag, date) => {
        router.push("/reputation-intelligence/feed").then(() => {
          if (tag) {
            dispatch(setSelectedTag(tag));
          }
          if (tag) {
            dispatch(setDate(date));
          }
        });
      },
    },
  ];

  return (
    <LayoutComponent
      title="Search Dashboard"
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
          <>
            <InputSearchRI control={control} name="tags" />
            <TagTaxonomyLauncher setOpenModal={setOpenModal} />
            <DatePicker control={control} name="dateRange" />
            <CountrySelector control={control} name="filterValues.countries" />
          </>
        )}
        filterBar={(control, options) => (
          <StakeholdersFilter control={control} options={options} />
        )}
      />
      <DashboardComponent
        searchData={data}
        widgets={SentimentWidgets(data)}
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

export default Sentiment;
