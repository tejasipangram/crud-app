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

function App() {
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
      .catch((err) => setLoading(false));
  };
  //getting the data from json api
  const getAllData = (page = 1) => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_SERVER}/read?page=${page}`)
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
      });
  };

  //updating the list

  const updateList = async (id, title, body) => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.REACT_APP_SERVER}/update/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          id: id,
          title: title,
          body: body,
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const data = await res.json();
      setLoading(false);
      const newData = currentData.map((list, index) => {
        if (data.data._id === list._id) {
          list.title = title;
          list.description = body;
        }
        return list;
      });

      setCurrentData(newData);
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
        console.log(list._id, id);
        return list._id !== id;
      });

      setCurrentData(newData);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

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
        <PaginationBasic />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
