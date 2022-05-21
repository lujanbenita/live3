import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import LayoutComponent from "layout/LayoutComponent";
import { SEARCH_TABS_RI } from "data/tabLinks";

import {
  SIDE_MENU_ONE_LINKS_RI,
  SIDE_MENU_TWO_LINKS_RI,
} from "@/data/sidebarLinks";

import SearchComponent from "@/components/search/SearchComponent";
import DashboardComponent from "@/components/dashboard/DashboardComponent";
import { chartTypes } from "@/data/chartTypes";

import {
  setCountry,
  setData as updateObjectSearch,
  setSelectedTag,
} from "@/redux/searchObject/actions";

import { postDashboardIssuesRI } from "@/services/dashboard/ri/postDashboardIssuesRI";
import InputSearchRI from "@/components/search/searchBar/InputSearchRI";
import CountrySelector from "@/components/search/searchBar/CountrySelector";
import { widgetProcessor } from "@/components/dashboard/cardDataGenerators/widgetProcessor";
import TagTaxonomyLauncher from "@/components/tagTaxonomy/TagTaxonomyLauncher";
import DatePicker from "@/components/search/searchBar/DatePicker";
import StakeholdersFilter from "@/components/common/inputs/StakeholdersFilter";
import TagTaxonomyModal from "@/components/tagTaxonomy/TagTaxonomyModal";

const Issues = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const searchObject = useSelector((state) => state.searchObject);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  const fetchSearch = async (searchData) => {
    setIsLoading(true);
    const responses = await postDashboardIssuesRI(searchData);
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

  const IssuesWidgets = ({
    mostImpactfulIssues,
    topIssuesByVolume,
    mostVisibleIssuesVsPeers,
  }) => [
    {
      chart: chartTypes.pyramid,
      data: widgetProcessor({
        title: "Most impactful Issues",
        response: mostImpactfulIssues,
      }),
      subtitle: searchObject?.selectedTag?.tagName,
      modalContent: '"Most impactful Issues" widget description',
      size: 12,
      height: "450px",
      key: "ri-most-impactful-issues",
      onClick: (issue) => {
        console.log(issue);
      },
    },
    {
      chart: chartTypes.stackedBarIssues,
      data: widgetProcessor({
        title: "Top Issues by volume",
        response: topIssuesByVolume,
      }),
      subtitle: searchObject?.selectedTag?.tagName,
      modalContent: '"Top Issues by volume" widget description',
      size: 12,
      height: "450px",
      key: "ri-top-issues-by-volume",
      onClick: (tone, tag) => {
        console.log(tone, tag);
      },
    },
    {
      chart: chartTypes.sunburst,
      data: widgetProcessor({
        title: "Most visible Issues vs peer group",
        response: mostVisibleIssuesVsPeers,
      }),
      subtitle: searchObject?.selectedTag?.tagName,
      modalContent: '"Most visible Issues vs peer group" widget description',
      size: 12,
      height: "450px",
      key: "ri-most-visible-issues-vs-peer-group",
      onClick: (tag, date) => {
        console.log(tag, date);
      },
    },
  ];

  return (
    <LayoutComponent
      title="Topics Dashboard | Reputation Intelligence"
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
        widgets={IssuesWidgets(data)}
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

export default Issues;
