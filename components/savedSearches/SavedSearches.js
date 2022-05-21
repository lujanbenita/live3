/* eslint-disable prefer-const */

import format from "date-fns/format";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { useState, useCallback, useEffect } from "react";
import { formatToTimeZone, parseFromTimeZone } from "date-fns-timezone";

import SavedSearchActionsTutorial from "@/components/tutorial/SavedSearchActionsTutorial";

import ModalAdvertence from "@/components/common/modal/ModalAdvertence";
import Table from "@/components/common/table/Table";
import { DeleteIcon, OpenIcon } from "@/icons/IconsLibrary";
import useSavedSearchList from "@/hooks/rq/useSavedSearchList";
import useDeleteSavedSearch from "@/hooks/rq/useDeleteSavedSearch";
import { loadSavedSearch } from "@/redux/searchObject/actions";

import LetterAvatar from "@/components/common/avatar/LetterAvatar";
import { useResponsive } from "@/utils/hooks/useResponsive";
import { setLoadedSavedSearch } from "@/redux/savedSearch/actions";

const transformDateRangeToDates = (string) => {
  if (string.length > 2) {
    let [first, ...rest] = string.split(" ");
    rest = rest.join(" ");
    const second = rest.replace("to ", "");

    return `${first} - ${second}`;
  }

  if (string === "1D" || string === "7D") {
    const [numberOfDays] = string.split("D");
    const number = Math.floor(numberOfDays);

    const date = new Date();
    const firstDate = new Date().setDate(date.getDate() - number);

    return `${string} (${format(firstDate, "dd/MM/yyyy")} - ${format(
      date,
      "dd/MM/yyyy"
    )})`;
  }

  if (string === "1M") {
    const date = new Date();
    const firstDate = new Date().setDate(date.getDate() - 30);

    return `${string} (${format(firstDate, "dd/MM/yyyy")} - ${format(
      date,
      "dd/MM/yyyy"
    )})`;
  }
};

const SavedSearches = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [deleteAdvertence, setDeleteAdvertence] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const user = useSelector((state) => state.user);

  const firstName = useSelector((state) => state.user.firstName);
  const lastName = useSelector((state) => state.user.lastName);
  const countryOptions = useSelector(
    (state) => state.search.filterOptions.countries
  );

  const { isTabletOrPhone } = useResponsive();

  const { data = [], error, isLoading } = useSavedSearchList();

  const mutation = useDeleteSavedSearch();

  const handleDelete = (values) => {
    setDeleteAdvertence(values);
  };

  useEffect(() => {
    setPage(0);
  }, [rowsPerPage]);

  const handleMILoad = async (savedSearch) => {
    await dispatch(loadSavedSearch(savedSearch.id, countryOptions)); // <-- countryOptions needed to find correct iso Code of the country
    router.push("/media-intelligence/dashboard");
    dispatch(setLoadedSavedSearch(savedSearch));
  };

  const handleRILoad = async (savedSearch) => {
    await dispatch(loadSavedSearch(savedSearch.id, countryOptions)); // <-- countryOptions needed to find correct iso Code of the country
    router.push("/reputation-intelligence/reputation");
    dispatch(setLoadedSavedSearch(savedSearch));
  };

  const handleSubmitAdvertence = useCallback(() => {
    mutation.mutate(deleteAdvertence.id);
    setDeleteAdvertence(null);
  }, [mutation]);

  const columns = [
    {
      field: "col1",
      headerName: "Name",
      width: isTabletOrPhone ? 300 : 0,
      flex: isTabletOrPhone ? 0 : 0.3,
      renderCell: ({ value }) => <strong>{value}</strong>,
    },
    {
      field: "col2",
      headerName: "Author",
      width: isTabletOrPhone ? 250 : 0,
      flex: isTabletOrPhone ? 0 : 0.22,
      renderCell: ({ value }) => (
        <div className="c-saved-searches__table-author">
          <LetterAvatar>{value && value}</LetterAvatar>
          <span className="c-saved-searches__table-author-title">{value}</span>
        </div>
      ),
    },
    {
      field: "col3",
      headerName: "Last Edited",
      width: isTabletOrPhone ? 200 : 0,
      flex: isTabletOrPhone ? 0 : 0.18,
      renderCell: ({ value }) => {
        const d = parseFromTimeZone(value, { timeZone: "UTC" });
        const isoDate = d.toISOString();
        return (
          <span>
            {formatToTimeZone(isoDate, "YYYY-MM-DD HH:mm:ss", {
              timeZone: user.timeZone,
            })}
          </span>
        );
      },
    },
    {
      field: "col4",
      headerName: "Date Range",
      width: isTabletOrPhone ? 250 : 0,
      flex: isTabletOrPhone ? 0 : 0.25,
      renderCell: ({ value }) => (
        <span>{transformDateRangeToDates(value)}</span>
      ),
    },
    {
      field: "col5",
      headerName: "Actions",
      width: isTabletOrPhone ? 100 : 0,
      flex: isTabletOrPhone ? 0 : 0.1,
      disableColumnMenu: true,
      sortable: false,
      renderCell: ({ value }) => (
        <div className="c-saved-searches__table-actions">
          <div className="c-saved-searches__tutorial">
            <button
              type="button"
              title="Media Intelligence"
              className="c-saved-searches__table-icon"
              onClick={() => handleMILoad(value)}
            >
              <OpenIcon />
            </button>
            <SavedSearchActionsTutorial />
          </div>
          {`${firstName} ${lastName}` === value.owner && (
            <button
              title="Delete Saved Sarch"
              type="button"
              className="c-saved-searches__table-icon"
              onClick={() => handleDelete(value)}
            >
              <DeleteIcon />
            </button>
          )}
        </div>
      ),
    },
  ];

  if (error) return <p>error</p>;

  const rows = data.map((search) =>
    isLoading
      ? {}
      : {
          id: search.workspaceId,
          col1: search.workspaceName,
          col2: search.owner,
          col3: search.lastUpdate,
          col4: search.dateRange,
          col5: {
            owner: search.owner,
            name: search.workspaceName,
            id: search.workspaceId,
          },
        }
  );

  return (
    <div className="c-saved-searches">
      {deleteAdvertence && (
        <ModalAdvertence
          open={deleteAdvertence}
          onSubmit={handleSubmitAdvertence}
          onClose={() => {
            setDeleteAdvertence(null);
          }}
          message={`Do you want to delete the search ${deleteAdvertence.name}?`}
          rejectLabel="Cancel"
          acceptLabel="Confirm delete"
        />
      )}
      <h1 className="c-saved-searches__title">Saved Searches</h1>
      <Table
        columns={columns}
        rows={rows}
        total={isLoading ? -1 : data.length}
        page={page}
        loading={isLoading}
        rowsPerPage={rowsPerPage}
        setPage={(p) => setPage(p)}
        setRowsPerPage={(r) => setRowsPerPage(r)}
      />
    </div>
  );
};

export default SavedSearches;
