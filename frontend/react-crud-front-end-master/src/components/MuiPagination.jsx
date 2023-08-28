import React, { useContext } from "react";
import TablePagination from "@mui/material/TablePagination";
import { GlobalContext } from "../GloblaCotext";

export default function TablePaginationDemo() {
  const { currentPage, totalPages, getAllData, setPageSize } =
    useContext(GlobalContext);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    getAllData(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setPageSize(event.target.value);
    console.log(event.target.value);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <TablePagination
      component="div"
      count={totalPages * rowsPerPage}
      page={currentPage - 1}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
