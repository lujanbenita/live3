import { TablePagination } from "@material-ui/core";
import { useEffect } from "react";
import { numberFormatter } from "../../../utils/formatters";

const Pagination = ({
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  total,
  setInfoPagination,
}) => {
  let info;
  useEffect(() => {
    setInfoPagination(info);
  }, [info]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      component="div"
      className="c-pagination"
      count={total}
      page={page}
      labelDisplayedRows={({ from, to, count }) => {
        info = `${from}-${to} of ${
          count !== -1 ? numberFormatter(count) : `more than ${to}`
        }`;
        return info;
      }}
      rowsPerPageOptions={[10, 30, 60, 120, 240]}
      onChangePage={handleChangePage}
      rowsPerPage={rowsPerPage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default Pagination;
