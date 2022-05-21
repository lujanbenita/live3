import { memo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import TabsBar from "components/common/tabs/TabsBar";

import _ from "lodash";
import FocusTagTutorial from "@/components/tutorial/FocusTagTutorial";
import formatSearchObject from "@/utils/servicesFormatter/requests/formatSearchObject";
import { checkIsFilterValuesEqual } from "utils/checkIsObjectSearchEqual";
import { useDebounce } from "use-debounce";
import FilterBarComponent from "@/components/search/filterBar/filterBarComponent";

import patchUser from "services/user/patchUser";
import SearchActions from "./searchActions/SearchActions";
import SearchBarComponent from "./searchBar/SearchBarComponent";

const SearchComponent = ({
  onSubmit,
  onFilterValueChange,
  onToneSelected,
  searchTabs,
  module,
  filterBar,
  searchBar,
}) => {
  const [areFiltersVisible, setAreFiltersVisible] = useState(false);

  const options = useSelector((state) => state.search.filterOptions);
  const total = useSelector((state) => state.search.filterTotal);
  const searchObject = useSelector((state) => state.searchObject);
  const user = useSelector((state) => state.user);
  const [buttonEnabled, setButtonEnabled] = useState(true);

  const updateUser = (newSearchObject) => {
    if (!user.id || !user.token) return;
    const oldJsonData = JSON.parse(user.jsonData);
    const updatedUserData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      nlaPassword: user.nlaPassword,
      nlaUsername: user.nlaUsername,
      timeZone: user.timeZone,
      userEmail: user.userEmail,
      username: user.username,
      jsonData: JSON.stringify({
        ...oldJsonData,
        searchObject: formatSearchObject(newSearchObject),
      }),
    };
    patchUser(user.id, updatedUserData);
  };

  const { handleSubmit, watch, control, reset, register, getValues } = useForm({
    defaultValues: {
      ...searchObject,
      filterValues: {
        ...searchObject?.filterValues,
        circulation: false,
      },
    },
  });

  const submit = async () => {
    await handleSubmit(onSubmit)();
  };

  useEffect(() => {
    reset(searchObject);
    updateUser(searchObject);
  }, [searchObject]);

  useEffect(() => {
    updateUser(searchObject);
  }, [searchObject.selectedTag, searchObject.filterValues]);

  useEffect(() => {
    const filters = [
      "author",
      "channel",
      "publication",
      "source",
      "tone",
      "customTags",
      "circulation",
      "topics",
      "stakeholders",
      "tags",
    ];
    Object.entries(searchObject.filterValues).forEach((option) => {
      if (!filters.includes(option[0])) return;

      if (option[1] === undefined) return;

      if (option[1].length > 0) {
        setAreFiltersVisible(true);
      }
    });
  }, []);

  const filterValues = watch("filterValues");
  const tags = watch("tags");
  const dateRange = watch("dateRange");
  const countries = watch("filterValues.countries");
  const source = watch("filterValues.source");
  const channel = watch("filterValues.channel");
  const tone = watch("filterValues.tone");
  const publication = watch("filterValues.publication");
  const author = watch("filterValues.author");
  const customTags = watch("filterValues.customTags");
  const circulation = watch("filterValues.circulation");
  const topics = watch("filterValues.topics");
  const stakeholders = watch("filterValues.stakeholders");
  const topicTags = watch("filterValues.tags");

  const [filterChange] = useDebounce(
    [
      source,
      channel,
      tone,
      publication,
      author,
      customTags,
      circulation,
      topics,
      stakeholders,
      topicTags,
    ],
    500
  );

  useEffect(() => {
    if (tone) {
      if (onToneSelected) {
        onToneSelected(!tone.length > 0);
      }
    }
  }, [tone]);

  useEffect(() => {
    let refresh = false;
    const newSearchObject = {
      ...searchObject,
    };
    if (
      dateRange[0] !== searchObject.dateRange[0] ||
      dateRange[1] !== searchObject.dateRange[1]
    ) {
      newSearchObject.dateRange = dateRange;
      refresh = true;
    }
    if (
      !_.isEqual(
        tags.sort((a, b) => a.tagId < b.tagId),
        searchObject.tags.sort((a, b) => a.tagId < b.tagId)
      )
    ) {
      newSearchObject.tags = tags;
      refresh = true;
    }
    if (
      !_.isEqual(
        countries?.sort((a, b) => a.isoCode.localeCompare(b.isoCode)),
        searchObject.filterValues.countries?.sort((a, b) =>
          a.isoCode.localeCompare(b.isoCode)
        )
      )
    ) {
      newSearchObject.filterValues.countries = countries;
      refresh = true;
    }
    if (
      source ||
      channel ||
      tone ||
      publication ||
      author ||
      customTags ||
      topics ||
      circulation ||
      stakeholders ||
      topicTags
    ) {
      if (!checkIsFilterValuesEqual(searchObject.filterValues, filterValues)) {
        newSearchObject.filterValues = {
          ...filterValues,
        };
        refresh = true;
      }
    }

    if (newSearchObject.tags.length === 0) {
      setButtonEnabled(false);
      return;
    }

    if (refresh) {
      newSearchObject.page = 1;
      setButtonEnabled(true);
      onFilterValueChange(newSearchObject);
    }
  }, [filterChange, dateRange, tags, countries]);

  const disabled = !searchObject.tags.length > 0;

  return (
    <form
      id="search-form"
      onSubmit={handleSubmit(submit)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
      aria-hidden="true"
      className={module ? `c-search ${module.toLowerCase()}` : "c-search"}
    >
      <SearchBarComponent
        control={control}
        buttonEnabled={buttonEnabled}
        module={module}
        searchBar={searchBar}
      />
      <div className="c-search__controls-container">
        <TabsBar
          tabs={searchTabs}
          disabled={disabled}
          extraClassTab="c-search__tabs-bar"
        />
        {filterBar && (
          <div className="c-search__extra-container">
            <div className="c-search__extra-filter">
              {filterBar(control, options)}
            </div>
            <SearchActions
              disabled={disabled}
              setAreFiltersVisible={setAreFiltersVisible}
              areFiltersVisible={areFiltersVisible}
              module={module}
            />
          </div>
        )}
        {!filterBar && (
          <SearchActions
            disabled={disabled}
            setAreFiltersVisible={setAreFiltersVisible}
            areFiltersVisible={areFiltersVisible}
            module={module}
          />
        )}
      </div>
      <div
        className={`c-search__filters-container--${
          areFiltersVisible && module !== "RI" ? "visible" : "hidden"
        }`}
      >
        <FilterBarComponent
          options={options}
          total={total}
          control={control}
          register={register}
          getValues={getValues}
          module={module}
          resetFilters={() =>
            reset({
              ...searchObject,
              filterValues: {
                circulation: false,
                customTags: [],
                author: [],
                authorValues: [],
                channel: [],
                publication: [],
                source: [],
                tone: [],
                topics: [],
                tags: [],
              },
            })
          }
        />
      </div>
      {module !== "RI" && <FocusTagTutorial tags={tags} />}
    </form>
  );
};

function areEqual(prevProps, nextProps) {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
}

export default memo(SearchComponent, areEqual);
