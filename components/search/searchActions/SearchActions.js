import styled from "@emotion/styled";
import { MenuItem } from "@material-ui/core";
import { useState, useEffect } from "react";

import { AlertIcon } from "@/icons/IconsLibrary";
import SearchActionsTutorial from "@/components/tutorial/SearchActionsTutorial";
import FilterStyled from "icons/FilterStyled";
import SaveStyled from "icons/SaveStyled";
import ModalAdvertence from "components/common/modal/ModalAdvertence";
import OptionsButton from "components/common/buttons/OptionsButton";
import { saveSearchFormatDateRange } from "utils/servicesFormatter/requests/formatDateRange";
import useCreateSavedSearch from "hooks/rq/useCreateSavedSearch";
import useSavedSearchList from "hooks/rq/useSavedSearchList";
import { useSelector } from "react-redux";

import AlertsModal from "./AlertsModal";
import SaveSearchModal from "./SaveSearchModal";
import { buildObjectSearch } from "../../../redux/search/searchUtils";

const SearchActions = ({
  areFiltersVisible,
  setAreFiltersVisible,
  disabled,
  module,
}) => {
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isAlertsModalOpen, setIsAlertsModalOpen] = useState(false);
  const [overRideSavedSearch, setOverRideSavedSearch] = useState(null);

  const searchObject = useSelector((state) => state.searchObject);
  const savedSearch = useSelector((state) => state.savedSearch);
  const { data: listSavedSearch, error, isLoading } = useSavedSearchList();
  const mutation = useCreateSavedSearch();

  useEffect(() => {
    if (mutation.isSuccess) {
      setOverRideSavedSearch(null);
      setIsSaveModalOpen(false);
    }
  }, [mutation.isSuccess]);

  const handleSubmitSearch = (data) => {
    let existSavedSearch = listSavedSearch.find(
      ({ workspaceName }) => workspaceName === data.name
    );

    if (existSavedSearch === undefined) {
      existSavedSearch = listSavedSearch.find(
        ({ workspaceName }) => workspaceName === data.source
      );
    }

    const date = data.toggleDateRange
      ? saveSearchFormatDateRange(searchObject.dateRange)
      : null;

    const newSearchObject = buildObjectSearch(searchObject);

    const newSavedSearch = {
      ...existSavedSearch,
      selectedTag: searchObject.selectedTag ? searchObject.selectedTag : null,
      dateRange: date,
      filterValues: newSearchObject.filterValues,
      tags: newSearchObject.tags,
      workspaceName: data.name ?? data.source,
    };

    if (existSavedSearch) {
      setOverRideSavedSearch(newSavedSearch);
      return;
    }
    setIsSaveModalOpen(false);

    mutation.mutate(newSavedSearch);
  };

  const handleSubmitAdvertence = () => {
    mutation.mutate(overRideSavedSearch);
  };

  const idOptionsButton = Buffer.from("SearchActions").toString("base64");

  return (
    <div className="c-search-actions__controls">
      {module !== "RI" && (
        <StyledButton
          disabled={disabled}
          className="c-search-actions__filter-button"
          type="button"
          onClick={() => {
            setAreFiltersVisible(!areFiltersVisible);
          }}
        >
          <FilterStyled />
          <StyledTextButton>Show filters</StyledTextButton>
        </StyledButton>
      )}
      <StyledButton
        disabled={disabled}
        className="c-search-actions__save-filter-button"
        type="button"
        onClick={() => {
          setIsSaveModalOpen(true);
        }}
      >
        <SaveStyled />
        <StyledTextButton>Save</StyledTextButton>
      </StyledButton>
      {module !== "RI" && (
        <OptionsButton
          id={idOptionsButton}
          disabled={disabled}
          options={[
            {
              label: "Save Search",
              action: () => {
                setIsSaveModalOpen(true);
              },
              icon: "save",
            },
            {
              label: "Create Alert from Search",
              action: () => {
                setIsAlertsModalOpen(true);
              },
              icon: "alert",
            },
          ]}
        />
      )}
      {module === "RI" && (
        <AlertIcon
          onClick={() => {
            setIsAlertsModalOpen(true);
          }}
        />
      )}
      {isSaveModalOpen && !isLoading && !error && (
        <SaveSearchModal
          header="Save Search"
          onClose={() => setIsSaveModalOpen(false)}
          onSubmit={handleSubmitSearch}
          defaultValue={savedSearch.name}
          options={[
            ...listSavedSearch.map(({ workspaceName }) => workspaceName),
          ]}
          menuItemOptions={listSavedSearch.map(
            ({ workspaceName: savedName, workspaceId }) => (
              <MenuItem id="menu-item" key={workspaceId} value={savedName}>
                {savedName}
              </MenuItem>
            )
          )}
        />
      )}

      {overRideSavedSearch && (
        <ModalAdvertence
          onSubmit={handleSubmitAdvertence}
          onClose={() => {
            setOverRideSavedSearch(null);
            setIsSaveModalOpen(true);
          }}
          open={overRideSavedSearch}
          message="You have chosen to override the previous saved search with new criteria.
          This action cannot be undone and your previous search criteria will be
          lost. Do you want to continue?"
          rejectLabel="Cancel and Return"
          acceptLabel="Continue & Override Search"
        />
      )}

      {listSavedSearch !== undefined && (
        <AlertsModal
          header="Create New Alert"
          defaultValue={savedSearch.id}
          isModalOpen={isAlertsModalOpen}
          setIsModalOpen={setIsAlertsModalOpen}
        />
      )}

      <SearchActionsTutorial actionsEnabled={!disabled} />
    </div>
  );
};

export default SearchActions;

const StyledButton = styled.button`
  display: flex;
  align-items: center;

  ${({ disabled }) =>
    disabled &&
    `color: #162a3a;
    
    &:hover{
      color: #162a3a;
    }
  
    & > svg {
      fill: #162a3a;
    }
    `}
`;

const StyledTextButton = styled.span`
  display: none;
  @media (min-width: 790px) {
    display: inline-block;
  }
`;
