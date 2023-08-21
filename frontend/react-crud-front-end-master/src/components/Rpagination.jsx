import { useContext, useState } from "react";
import ReactPaginate from "react-paginate";
import { GlobalContext } from "../GloblaCotext";
export function PaginatedItems({ itemsPerPage, items }) {
  const {
    currentPage,

    totalPages,
    getAllData,
  } = useContext(GlobalContext);
  let active = currentPage;
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    getAllData(event.selected + 1);
  };
  return (
    <>
      <ReactPaginate
        forcePage={currentPage - 1}
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={10}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
    </>
  );
}
