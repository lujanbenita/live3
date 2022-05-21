import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SEARCH_TABS } from "data/tabLinks";
import { SIDE_MENU_ONE_LINKS, SIDE_MENU_TWO_LINKS } from "data/sidebarLinks";

import TagTaxonomyLauncher from "@/components/tagTaxonomy/TagTaxonomyLauncher";
import TagTaxonomyModal from "@/components/tagTaxonomy/TagTaxonomyModal";

import DatePicker from "@/components/search/searchBar/DatePicker";
import CountrySelector from "@/components/search/searchBar/CountrySelector";
import InputSearch from "@/components/search/searchBar/InputSearch";

import FeedComponent from "components/feed/FeedComponent";
import LayoutComponent from "layout/LayoutComponent";
import SearchComponent from "components/search/SearchComponent";
import { fetchFilterOptions, feedSearch } from "redux/search/searchActions";
import { setData } from "redux/searchObject/actions";
import { buildObjectSearch } from "redux/search/searchUtils";
import postArticleCount from "@/services/dashboard/postArticleCount";

const Feed = () => {
  const dispatch = useDispatch();
  const filterOptions = useSelector((state) => state.search.filterOptions);
  const searchObject = useSelector((state) => state.searchObject);
  const [totalCount, setTotalCount] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const isFeedPending = useSelector((state) => state.search.isPendingFeed);

  const getTotal = async (object) => {
    const { success, data } = await postArticleCount(buildObjectSearch(object));
    if (!success) {
      setTotalCount(null);
      return;
    }
    setTotalCount(data);
  };

  useEffect(() => {
    if (filterOptions.countries.length < 200) {
      dispatch(fetchFilterOptions());
    }
  }, []);

  useEffect(() => {
    dispatch(feedSearch(searchObject));
    getTotal(searchObject);
  }, [searchObject]);

  const handleSubmitSearch = useCallback(
    (data) => {
      dispatch(setData(data));
    },
    [dispatch]
  );

  return (
    <LayoutComponent
      title="Search Dashboard"
      showLoader={isFeedPending}
      sidebarLinksOne={SIDE_MENU_ONE_LINKS}
      sidebarLinksTwo={SIDE_MENU_TWO_LINKS}
    >
      <SearchComponent
        onFilterValueChange={handleSubmitSearch}
        onSubmit={handleSubmitSearch}
        searchTabs={SEARCH_TABS}
        module="MI"
        searchBar={(control) => (
          <>
            <InputSearch control={control} name="tags" />
            <TagTaxonomyLauncher setOpenModal={setOpenModal} />
            <DatePicker control={control} name="dateRange" />
            <CountrySelector control={control} name="filterValues.countries" />
          </>
        )}
      />
      <FeedComponent
        handleSubmitSearch={handleSubmitSearch}
        totalCount={totalCount}
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

export default Feed;
