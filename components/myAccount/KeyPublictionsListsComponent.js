import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchPublicationsList,
  deletePublicationsList,
} from "services/listsServices/listsServices";
import { DeleteIcon, EditIcon } from "icons/IconsLibrary";
import { MY_ACCOUNT_TABS } from "data/tabLinks";
import { getPublicationsLists } from "redux/lists/listsActions";
import { useResponsive } from "utils/hooks/useResponsive";

import KeyListsModal from "./KeyListsModal";
import LetterAvatar from "../common/avatar/LetterAvatar";
import ModalAdvertence from "../common/modal/ModalAdvertence";
import Table from "../common/table/Table";
import TabsBar from "../common/tabs/TabsBar";

const KeyPublicationsListsComponent = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const [listDetail, setListDetail] = useState(false);
  const [selectedList, setSelectedList] = useState(false);
  const [showAdvertence, setShowAdvertence] = useState(false);
  const [isNewList, setIsNewList] = useState(false);

  const dispatch = useDispatch();
  const { isTabletOrPhone } = useResponsive();

  const keyPublicationsLists = useSelector(
    (state) => state.lists.keyPublicationsLists
  );
  const totalKeyPublicationsLists = useSelector(
    (state) => state.lists.totalKeyPublicationsLists
  );
  const isPending = useSelector((state) => state.lists.isPendingGetLists);

  const updateList = (reqPage, reqPageSize) => {
    dispatch(
      getPublicationsLists({ page: reqPage + 1, pageSize: reqPageSize })
    );
  };

  const handleDeleteList = async (list) => {
    await deletePublicationsList(list.filterId);
    await updateList(page, pageSize);
    setShowAdvertence(false);
  };

  useEffect(() => {
    updateList(page, pageSize);
  }, []);

  const columns = [
    {
      field: "col1",
      headerName: "Name",
      width: isTabletOrPhone ? 300 : 0,
      flex: isTabletOrPhone ? 0 : 0.37,
      className: { root: "TEST" },
      renderCell: ({ value }) => {
        const letter = value !== undefined ? value : "-";
        return (
          <div className="c-key-publications-lists__title">
            <LetterAvatar color="blue">{letter}</LetterAvatar>
            {letter}
          </div>
        );
      },
    },
    {
      field: "col2",
      headerName: "Last Edited",
      width: isTabletOrPhone ? 200 : 0,
      flex: isTabletOrPhone ? 0 : 0.25,
      renderCell: ({ value }) => {
        let date = null;
        try {
          date = format(new Date(value), "dd MMM yyyy, HH:mm");
        } catch (e) {
          date = "-";
        }
        return <span className="c-key-publications-lists__text">{date}</span>;
      },
    },
    {
      field: "col3",
      headerName: "Publications Included",
      width: isTabletOrPhone ? 260 : 0,
      flex: isTabletOrPhone ? 0 : 0.25,
      renderCell: ({ value }) => {
        const numPublications = value !== undefined ? value : 0;
        return (
          <span className="c-key-publications-lists__publications-included c-key-publications-lists__text">
            {`${numPublications} Publications`}
          </span>
        );
      },
    },
    {
      field: "col5",
      headerName: "Actions",
      width: isTabletOrPhone ? 100 : 0,
      flex: isTabletOrPhone ? 0 : 0.13,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => (
        <div className="c-key-authors-lists__table-actions">
          <button
            type="button"
            className="c-key-authors-lists__table-icon"
            onClick={() => {
              params.row.col4.setIsNewList(false);
              params.row.col4.setSelectedList(params.row.col4.list);
            }}
          >
            <EditIcon />
          </button>
          <button
            type="button"
            className="c-key-authors-lists__table-icon"
            onClick={() => {
              params.row.col4.setShowAdvertence(params.row.col4.list);
            }}
          >
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];

  const rows = [
    ...keyPublicationsLists.map((list) => ({
      id: list.filterId,
      col1: list.filterName,
      col2: list.lastUpdateAt,
      col3: list.filterParameterCount,
      col4: { list, setSelectedList, setShowAdvertence, setIsNewList },
    })),
  ];

  const NewSearchButton = () => (
    <button
      className="c-saved-searches__button-new-search"
      type="button"
      onClick={() => {
        setListDetail({
          filterParameters: [],
        });
        setIsNewList(true);
      }}
    >
      New Key Publications List
    </button>
  );

  useEffect(() => {
    if (selectedList && !isNewList) {
      (async () => {
        const res = await fetchPublicationsList(selectedList.filterId);
        setListDetail(res);
      })();
    }
  }, [selectedList]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
    updateList(newPage, pageSize);
  };

  const handleChangeRowsPerPage = (rowsPerPage) => {
    setPage(0);
    setPageSize(rowsPerPage);
    updateList(0, rowsPerPage);
  };

  return (
    <div className="c-my-settings">
      <TabsBar tabs={MY_ACCOUNT_TABS} extraClassTab="c-my-settings__tab" />

      <div className="c-my-settings__section-container">
        <Table
          columns={columns}
          rows={rows}
          FooterButton={NewSearchButton}
          page={page}
          loading={isPending}
          rowsPerPage={pageSize}
          setPage={handleChangePage}
          setRowsPerPage={handleChangeRowsPerPage}
          total={totalKeyPublicationsLists}
        />
      </div>

      {listDetail && listDetail.filterParameters && (
        <KeyListsModal
          handleClose={() => {
            setSelectedList(false);
            setListDetail(false);
          }}
          entity="publications"
          isOpen={selectedList}
          updateList={updateList}
          isNew={isNewList}
          listDetail={listDetail}
          title={
            isNewList
              ? "Add new Publication Keylist"
              : "Edit Publication Keylist"
          }
        ></KeyListsModal>
      )}
      {showAdvertence && (
        <ModalAdvertence
          title={`Delete ${showAdvertence.filterName}?`}
          open={showAdvertence}
          onClose={() => {
            setShowAdvertence(false);
          }}
          onSubmit={() => {
            handleDeleteList(showAdvertence);
          }}
          message={`Are you sure you want to delete the "${showAdvertence.filterName}" Key Publications List? the list will be permanently deleted`}
          rejectLabel="Cancel"
          acceptLabel="Delete"
        />
      )}
    </div>
  );
};

export default KeyPublicationsListsComponent;
