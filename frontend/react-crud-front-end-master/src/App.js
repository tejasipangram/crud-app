import logo from "./logo.svg";
import "./App.css";
import { GlobalContext } from "./GloblaCotext";
import { useEffect, useState } from "react";

import { InfinitySpin } from "react-loader-spinner";
import NavbarComp from "./components/Navabar";

import "bootstrap/dist/css/bootstrap.min.css";
import ListCard from "./components/List/ListCards";
import { PaginationBasic } from "./components/Pagination";
import CreateList from "./components/List/Modal";
import Spinner from "react-bootstrap/esm/Spinner";
import { PaginatedItems } from "./components/Rpagination";
import { ShowPagesButton } from "./components/buttons/SelectData";
import PaginationOutlined from "./components/MuiPagination";

function App() {
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [allData, setAllData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [totalItems, setTotaItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [key, setKey] = useState(null);
  //creating a list
  //when we create a list we will update the alldata and currentdata

  const createList = (title, description, file) => {
    //creating a form data
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", file);

    fetch(`${process.env.REACT_APP_SERVER}/create`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((json) => {
        setLoading(false);
        if (json.success) {
          if (!allData) {
            setAllData(json.data);
          } else {
            setAllData((prev) => {
              return [json.data, ...prev];
            });
          }
        } else {
          alert(json.message);
        }
        setKey(Math.random());
        getAllData();
      })
      .catch((err) => {
        setLoading(false);
        getAllData();
      });
  };
  //getting the data from json api
  const getAllData = (page = 1) => {
    console.log(pageSize, "get all data");
    setLoading(true);
    fetch(
      `${process.env.REACT_APP_SERVER}/read?page=${page}&pageSize=${pageSize}`
    )
      .then((response) => response.json())
      .then((json) => {
        setLoading(false);
        setTotalPages(json.totalPages);
        setCurrentData(json.data);
        setCurrentPage(json.page);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setCurrentData([]);
      });
  };

  //updating the list

  const updateList = async (id, title, description, file) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", file);

      const res = await fetch(`${process.env.REACT_APP_SERVER}/update/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json();

      const newData = currentData.map((list, index) => {
        if (data.data._id === list._id) {
          list.title = title;
          list.description = description;
          list.filePath = data.data.filePath;
        }
        return list;
      });

      setCurrentData(newData);
      setLoading(false);
      setKey(Math.random());
    } catch (error) {
      setLoading(false);
    }
  };

  //deleting a list

  const deleteList = async (id) => {
    try {
      setLoading(true);
      await fetch(`${process.env.REACT_APP_SERVER}/delete/${id}`, {
        method: "DELETE",
      });
      setLoading(false);
      const newData = currentData.filter((list, index) => {
        return list._id !== id;
      });

      setCurrentData(newData);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData();
  }, [pageSize]);

  return (
    <GlobalContext.Provider
      value={{
        setKey,
        totalItems,
        currentPage,
        setCurrentPage,
        createList,
        updateList,
        deleteList,
        totalPages,
        getAllData,
        pageSize,
        setPageSize,
      }}
    >
      <div className="App">
        <div className={`loader ${!loading ? "hide" : null}`}>
          {loading && <InfinitySpin width="200" color="#4fa94d" />}
        </div>
        <NavbarComp />
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
    </GlobalContext.Provider>
  );
}

export default App;
