import React, { useContext } from "react";
import CreateList from "./components/List/Modal";
import ListCard from "./components/List/ListCards";
import { GlobalContext } from "./GloblaCotext";
import PaginationOutlined from "./components/MuiPagination";

const Home = () => {
  const { pageSize, currentData, darkMode, setPageSize, getAllData } =
    useContext(GlobalContext);
  console.log(currentData);

  return (
    <div
      className={`min-vh-100 d-flex flex-wrap gap-4 justify-content-start flex-column align-items-center ${
        darkMode ? "bg-dark text-light " : "bg-light text-dark"
      }`}
    >
      <CreateList />
      <div className="d-flex flex-wrap gap-4 justify-content-center">
        {currentData.length > 0 ? (
          currentData.map((list, index) => {
            return (
              <ListCard
                key={list._id}
                title={list.title}
                description={list.description}
                id={list._id}
                filePath={list.filePath}
              />
            );
          })
        ) : (
          <div>No data found</div>
        )}
      </div>
      {/* <ShowPagesButton /> */}
      {/* <PaginatedItems items={currentData} /> */}
      <PaginationOutlined />
    </div>
  );
};

export default Home;
