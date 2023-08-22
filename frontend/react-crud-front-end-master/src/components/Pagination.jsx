import { useContext } from "react";
import Pagination from "react-bootstrap/Pagination";
import { GlobalContext } from "../GloblaCotext";

export const PaginationBasic = () => {
  const {
    currentPage,

    setKey,

    totalPages,
    getAllData,
  } = useContext(GlobalContext);
  let active = currentPage;

  let items = [];
  const changeHandler = (number) => {
    getAllData(number);
    setKey(Math.random());
  };
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        role="button"
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
