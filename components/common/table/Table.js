import { DataGrid } from "@material-ui/data-grid";
import TablePagination from "@material-ui/core/TablePagination";
import NoResults from "../../../icons/NoResults";
import Spinner from "../../../icons/Spinner";

function TableNoResults() {
  return (
    <div className="c-table__no-results-container">
      <div className="c-table__no-results-box">
        <NoResults />
        <h2 className="c-table__no-results-title">
          Oops…nothing to see here!
        </h2>{" "}
        <p className="c-table__no-results-message">
          Your current search and/or filter settings did not return any results.
          Please try a different search.
        </p>
      </div>
    </div>
  );
}

function LoadingOverlayComponent() {
  return (
    <div className="c-table__loading-container">
      <Spinner />
    </div>
  );
}

const Table = ({
  rows,
  columns,
  FooterButton,
  page = 0,
  setPage,
  total = -1,
  rowsPerPage = 25,
  setRowsPerPage,
  loading,
  rowsPerPageOptions = [25, 30, 60, 120, 240],
}) => {
  const handleChangePage = (event, newPage) => {
    if (page !== newPage) {
      setPage(newPage);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    if (rowsPerPage !== parseInt(event.target.value, 10)) {
      setRowsPerPage(parseInt(event.target.value, 10));
    }
  };

  function CustomFooter() {
    return (
      <div
        className={`c-table__custom-footer ${
          FooterButton ? "" : "c-table__custom-footer--no-action-button"
        }`}
      >
        {FooterButton && <FooterButton />}
        <TablePagination
          component="div"
          className="c-pagination"
          count={total}
          page={page}
          rowsPerPageOptions={rowsPerPageOptions}
          onChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
    );
  }
  return (
    <div className="c-table">
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        page={page}
        HorizontalScrollBarVisibility="Hidden"
        pageSize={rowsPerPage}
        components={{
          Footer: CustomFooter,
          NoRowsOverlay: TableNoResults,
          LoadingOverlay: LoadingOverlayComponent,
        }}
        classes={{ columnHeader: "c-table__header" }}
      />
    </div>
  );
};

export default Table;
