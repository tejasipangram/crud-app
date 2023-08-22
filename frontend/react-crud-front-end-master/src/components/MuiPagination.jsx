import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useContext } from "react";
import { GlobalContext } from "../GloblaCotext";

export default function PaginationOutlined() {
  const {
    currentPage,

    totalPages,
    getAllData,
  } = useContext(GlobalContext);
  const handleChange = (event, value) => {
    getAllData(value);
  };
  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={currentPage}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
        color="primary"
      />
    </Stack>
  );
}
