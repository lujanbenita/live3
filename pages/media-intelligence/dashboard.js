import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

import LayoutComponent from "layout/LayoutComponent";
import { SEARCH_TABS } from "data/tabLinks";
import { SIDE_MENU_ONE_LINKS, SIDE_MENU_TWO_LINKS } from "data/sidebarLinks";

import {
  setData as updateObjectSearch,
  setTone,
  setCountry,
  setSelectedTag,
  setDate,
  setSourceType,
} from "@/redux/searchObject/actions";

import { buildObjectSearch } from "@/redux/search/searchUtils";

import TagTaxonomyLauncher from "@/components/tagTaxonomy/TagTaxonomyLauncher";
import TagTaxonomyModal from "@/components/tagTaxonomy/TagTaxonomyModal";

import DatePicker from "@/components/search/searchBar/DatePicker";
import CountrySelector from "@/components/search/searchBar/CountrySelector";
import InputSearch from "@/components/search/searchBar/InputSearch";

import { widgetProcessor } from "@/components/dashboard/cardDataGenerators/widgetProcessor";
import SearchComponent from "../../components/search/SearchComponent";
import DashboardComponent from "../../components/dashboard/DashboardComponent";
import { chartTypes } from "../../data/chartTypes";

import { genTopToneCards } from "../../components/dashboard/cardDataGenerators/leaderCards";

import { donutCards } from "../../components/dashboard/cardDataGenerators/donutCards";
import { postDashboardMI } from "../../services/dashboard/postDashBoardMI";
import postTopStories from "../../services/dashboard/mi/postTopStories";

import { fetchFilterOptions } from "../../redux/search/searchActions";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const searchObject = useSelector((state) => state.searchObject);
  const filterOptions = useSelector((state) => state.search.filterOptions);
  const [openModal, setOpenModal] = useState(false);
  const [RIWidgets, setRIWidgets] = useState([]);

  const router = useRouter();
  const dispatch = useDispatch();

  const RIDashboardWidgets = (widgetData) => [
    {
      chart: chartTypes.total,
      data: widgetProcessor({
        title: "Total Volume",
        response: widgetData.summary,
      }),
      size: 2,
      key: "mi-total-volume",
    },
    {
      chart: chartTypes.total,
      data: widgetProcessor({
        title: "Mentions per Day (avg)",
        response: widgetData.summary,
      }),
      size: 2,
      key: "mi-mentions-per-day",
    },
    {
      chart: chartTypes.totalTones,
      data: widgetProcessor({
        title: "Tone by Volume",
        response: widgetData.summary,
      }),
      size: 2,
      key: "mi-tone-by-volume",
    },
    {
      chart: chartTypes.totalTones,
      data: widgetProcessor({
        title: "Tone by Visibility",
        response: widgetData.summary,
      }),
      size: 2,
      key: "mi-tone-by-visibility",
    },
    {
      chart: chartTypes.leaderTotal,
      data: widgetProcessor({
        title: "Total Volume",
        response: widgetData.topVolumeTag,
      }),
      size: 2,
      key: "mi-volume",
    },
    {
      chart: chartTypes.leaderTones,
      data: genTopToneCards({
        title: "Tone",
        response: widgetData.topToneByTag,
      }),
      size: 2,
      key: "mi-tone",
    },
    {
      chart: chartTypes.line,
      data: widgetProcessor({
        title: "Company Comparison",
        response: widgetData.companyComparison,
      }),
      size: 6,
      onClick: (tag, date) => {
        router.push("/media-intelligence/feed").then(() => {
          if (tag) {
            dispatch(setSelectedTag(tag));
          }
          if (date) {
            dispatch(setDate(date));
          }
        });
      },
      key: "mi-company-comparison-line",
    },
    {
      chart: chartTypes.stackedBars,
      data: widgetProcessor({
        title: "Company Comparison - Volume Over Time",
        response: widgetData.companyComparison,
        categoriesLabel: "datePeriod",
        seriesLabel: "articleCount",
      }),
      onClick: (tag, date) => {
        router.push("/media-intelligence/feed").then(() => {
          if (tag) {
            dispatch(setSelectedTag(tag));
          }
          if (date) {
            dispatch(setDate(date));
          }
        });
      },
      size: 6,
      key: "mi-company-comparison-bars",
    },
    {
      chart: chartTypes.bars,
      data: widgetProcessor({
        title: "Share of Voice by Source",
        response: widgetData.SovBySource,
        categoriesLabel: "sourceTypeName",
        seriesLabel: "articleCount",
      }),

      onClick: (tag, sourceType) => {
        router.push("/media-intelligence/feed").then(() => {
          if (tag) {
            dispatch(setSelectedTag(tag));
          }
          if (sourceType) {
            dispatch(setSourceType(sourceType));
          }
        });
      },
      size: 12,
      key: "mi-share-of-voice",
    },
    {
      chart: chartTypes.map,
      data: widgetProcessor({
        title: "Country by Client Volume",
        response: widgetData.countryAnalysis,
      }),
      onClick: (name) => {
        const newCountry = filterOptions.countries.find(
          ({ country }) => name === country
        );
        if (!newCountry) return;

        router
          .push("/media-intelligence/feed")
          .then(() => dispatch(setCountry(newCountry)));
      },
      size: 6,
      key: "mi-country-by-client",
    },
    {
      chart: chartTypes.donut,
      data: donutCards({
        title: "Total Volume Tone Breakdown",
        response: widgetData.summary,
        disable: searchObject?.filterValues?.tone?.length === 1,
      }),
      onClick: (tone) => {
        router
          .push("/media-intelligence/feed")
          .then(() => dispatch(setTone(tone)));
      },
      size: 6,
      key: "mi-total-volume-tone-breakdown",
    },
    {
      chart: chartTypes.topStories,
      data: widgetProcessor({
        title: "Client Top Stories",
        response:
          widgetData.topStories !== null
            ? widgetData.topStories
            : { success: true, data: { results: [] } },
      }),
      loading: widgetData.topStories === null,
      size: 6,
      key: "mi-top-stories",
    },
    {
      chart: chartTypes.breakdown,
      data: widgetProcessor({
        title: "Comparative Tone Breakdown",
        response: widgetData.toneByTag,
        disable: searchObject?.filterValues?.tone?.length === 1,
      }),
      onClick: (tag, tone) => {
        router.push("/media-intelligence/feed").then(() => {
          if (tag) {
            dispatch(setSelectedTag(tag));
          }
          if (tone) {
            dispatch(setTone(tone));
          }
        });
      },
      size: 6,
      key: "mi-comparative-tone-breakdown",
    },
  ];

  const fetchSearch = async (searchData) => {
    setIsLoading(true);
    const objectReq = buildObjectSearch(searchObject);
    const responses = await postDashboardMI(searchData);
    setData(responses);
    setRIWidgets(RIDashboardWidgets(responses));
    setIsLoading(false);
    const topStoriesWidgetData = await postTopStories(objectReq);
    responses.topStories = topStoriesWidgetData;
    setData(responses);
    setRIWidgets(RIDashboardWidgets(responses));
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

  useEffect(() => {
    setRIWidgets(RIDashboardWidgets(data));
    if (filterOptions) {
      dispatch(fetchFilterOptions());
    }
  }, []);

  return (
    <LayoutComponent
      title="Search Dashboard"
      showLoader={isLoading}
      sidebarLinksOne={SIDE_MENU_ONE_LINKS}
      sidebarLinksTwo={SIDE_MENU_TWO_LINKS}
    >
      <SearchComponent
        onFilterValueChange={handleSubmitSearch}
        onSubmit={handleSubmitSearch}
        searchTabs={SEARCH_TABS}
        searchBar={(control) => (
          <>
            <InputSearch control={control} name="tags" />
            <TagTaxonomyLauncher setOpenModal={setOpenModal} />
            <DatePicker control={control} name="dateRange" />
            <CountrySelector control={control} name="filterValues.countries" />
          </>
        )}
      />
      <DashboardComponent
        searchData={data}
        widgets={RIWidgets}
        isLoading={isLoading}
      />
      {openModal && (
        <TagTaxonomyModal
          whitelist={["Company", "Topic", "Product/Brand", "Person"]}
          open={openModal}
          setOpen={setOpenModal}
        />
      )}
    </LayoutComponent>
  );
};

export default Dashboard;
