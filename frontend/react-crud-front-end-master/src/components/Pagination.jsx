import { useContext } from "react";
import Pagination from "react-bootstrap/Pagination";
import { GlobalContext } from "../GloblaCotext";

export const PaginationBasic = () => {
  const { currentPage, setCurrentPage, setKey, totalItems } =
    useContext(GlobalContext);
  let active = currentPage;
  const totalPages = Math.ceil(totalItems / 10);
  let items = [];
  const changeHandler = (number) => {
    setCurrentPage(number);
    setKey(Math.random());
  };
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        onClick={() => {
          changeHandler(number);
        }}
        key={number}
        active={number === active}
      >
        {number}
      </Pagination.Item>
    );
  }
  return (
    <div className="d-flex justify-content-center mt-2">
      <Pagination>{items}</Pagination>
    </div>
  );
};
