import { useState, useEffect, useCallback } from "react";
import { formatToTimeZone, parseFromTimeZone } from "date-fns-timezone";

import useAlertList from "hooks/rq/useAlertList";
import useDeleteAlert from "hooks/rq/useDeleteAlert";
import { useSelector } from "react-redux";
import { Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

import ModalAdvertence from "components/common/modal/ModalAdvertence";

import { DeleteIcon, PlusIcon } from "icons/IconsLibrary";
import { useResponsive } from "utils/hooks/useResponsive";

import AlertsModal from "components/search/searchActions/AlertsModal";

// import ReactTooltip from "react-tooltip";
import Table from "../common/table/Table";
import { UserIcon } from "../../icons/IconsLibrary";

const LightTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: "white",
    color: "#575757",
    boxShadow: "0 5px 12px 0 rgb(0 0 0 / 15%)",
    border: "solid 1px #bdc3d5",
    padding: "8px 21px",
    fontSize: "12px",
    borderRadius: "3px",
    transition: "opacity 0.3s ease-out",
    fontFamily: "Museo Sans",
    fontWeight: 500,
    paddingBottom: "3px",
  },
  popper: {
    top: "15px !important",
  },

  arrow: {
    color: "white",
    // border: "solid 1px #bdc3d5",
  },
}))(Tooltip);

const Alerts = () => {
  const [deleteAdvertence, setDeleteAdvertence] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const user = useSelector((state) => state.user);
  const [isAlertsModalOpen, setIsAlertsModalOpen] = useState(false);
  const savedSearch = useSelector((state) => state.savedSearch);
  const isPendingSaveSearch = useSelector(
    (state) => state.alerts.isPendingSaveSearch
  );

  const FooterButton = () => (
    <button
      type="button"
      className="c-table__footer-action c-table__footer-action--create"
      onClick={() => setIsAlertsModalOpen(true)}
    >
      <PlusIcon /> New Alert
    </button>
  );

  const mutation = useDeleteAlert();
  const { isTabletOrPhone } = useResponsive();

  const handleDelete = (values) => setDeleteAdvertence(values);

  const handleSubmitAdvertence = useCallback(() => {
    mutation.mutate(deleteAdvertence.alertId);
    setDeleteAdvertence(null);
  }, [mutation]);

  const { data, error, isLoading, refetch } = useAlertList();

  useEffect(() => {
    if (!isPendingSaveSearch) {
      refetch();
    }
  }, [isPendingSaveSearch]);

  if (error) return <p>error</p>;

  const columns = [
    {
      field: "col1",
      headerName: "Name",
      width: isTabletOrPhone ? 250 : 0,
      flex: isTabletOrPhone ? 0 : 0.2,
      renderCell: ({ value }) => <strong>{value}</strong>,
    },
    {
      field: "col2",
      headerName: "Email Subject",
      width: isTabletOrPhone ? 300 : 0,
      flex: isTabletOrPhone ? 0 : 0.22,
      renderCell: ({ value }) => <span className="c-table__text">{value}</span>,
    },
    {
      field: "col3",
      headerName: "Type",
      width: isTabletOrPhone ? 250 : 0,
      flex: isTabletOrPhone ? 0 : 0.18,
      renderCell: ({ value }) => (
        <span
          className={`c-table__text c-alerts__type--${value.toLowerCase()}`}
        >
          {`${value} Alert`}
        </span>
      ),
    },
    {
      field: "col4",
      headerName: "Created",
      width: isTabletOrPhone ? 170 : 0,
      flex: isTabletOrPhone ? 0 : 0.2,
      renderCell: ({ value }) => {
        const d = parseFromTimeZone(value, { timeZone: "UTC" });
        const isoDate = d.toISOString();
        return (
          <span className="c-table__text">
            {value
              ? formatToTimeZone(isoDate, "YYYY-MM-DD HH:mm:ss", {
                  timeZone: user.timeZone,
                })
              : ""}
          </span>
        );
      },
    },
    {
      field: "col5",
      headerName: "Receivers",
      width: isTabletOrPhone ? 170 : 0,
      flex: isTabletOrPhone ? 0 : 0.15,
      renderCell: ({ value }) => (
        <LightTooltip
          title={
            <>
              <ul style={{ margin: 0 }}>
                {value.alertReceivers.map((item) => (
                  <li
                    style={{ marginBottom: "5px", display: "flex" }}
                    key={`${value.alertId}-${item}`}
                  >
                    <UserIcon />
                    <span
                      style={{
                        display: "inline-block",
                        lineHeight: "33px",
                        verticalAlign: "middle",
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          }
          placement="top"
          arrow
        >
          <div className="c-table__text c-alerts__receivers">{`${value.alertReceiversCount} receivers`}</div>
        </LightTooltip>
      ),
    },
    {
      field: "col6",
      headerName: "Actions",
      width: isTabletOrPhone ? 100 : 0,
      flex: isTabletOrPhone ? 0 : 0.1,
      disableColumnMenu: true,
      sortable: false,
      renderCell: ({ value }) => (
        <div className="c-alerts__table-actions">
          <button
            type="button"
            className="c-alerts__table-icon"
            style={{
              width: "fit-content",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => handleDelete(value)}
          >
            <DeleteIcon />
          </button>
        </div>
      ),
    },
  ];

  const rows = isLoading
    ? []
    : [
        ...data.results.map((alert) => ({
          id: alert.alertId,
          col1: alert.alertName,
          col2: alert.alertSubject,
          col3: alert.alertType,
          col4: alert.createDateTime,
          col5: {
            alertReceiversCount: alert.alertReceiversCount,
            alertReceivers: alert.alertReceivers,
          },
          col6: alert,
        })),
      ];

  return (
    <div className="c-alerts">
      {deleteAdvertence && (
        <ModalAdvertence
          onSubmit={handleSubmitAdvertence}
          open={deleteAdvertence}
          onClose={() => {
            setDeleteAdvertence(null);
          }}
          message={`Do you want to delete the alert <strong>${deleteAdvertence.alertName}</strong>?`}
          rejectLabel="Cancel"
          acceptLabel="Confirm delete"
        />
      )}
      <h1 className="c-alerts__title">Alerts</h1>
      <Table
        columns={columns}
        FooterButton={FooterButton}
        rows={rows}
        total={isLoading ? -1 : data.total}
        loading={isLoading}
        page={page}
        setPage={(p) => {
          setPage(p);
        }}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={(r) => {
          setRowsPerPage(r);
        }}
      />
      <AlertsModal
        header="Create New Alert"
        defaultValue={savedSearch.id}
        isModalOpen={isAlertsModalOpen}
        setIsModalOpen={setIsAlertsModalOpen}
      />
    </div>
  );
};

export default Alerts;
