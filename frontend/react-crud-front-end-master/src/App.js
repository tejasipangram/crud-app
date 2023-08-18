import logo from "./logo.svg";
import "./App.css";
import { GlobalContext } from "./GloblaCotext";
import { useEffect, useState } from "react";

import NavbarComp from "./components/Navabar";

import "bootstrap/dist/css/bootstrap.min.css";
import ListCard from "./components/List/ListCards";
import { PaginationBasic } from "./components/Pagination";
import CreateList from "./components/List/Modal";

function App() {
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
      });
  };
  //getting the data from json api
  const getAllData = (page = 1) => {
    fetch(`${process.env.REACT_APP_SERVER}/read?page=${page}`)
      .then((response) => response.json())
      .then((json) => {
        setTotalPages(json.totalPages);
        setCurrentData(json.data);
        setCurrentPage(json.page);
      });
  };

  //updating the list

  const updateList = async (id, title, body) => {
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

    const newData = currentData.map((list, index) => {
      if (data.data._id === list._id) {
        list.title = title;
        list.description = body;
      }
      return list;
    });

    setCurrentData(newData);
  };

  //deleting a list

  const deleteList = async (id) => {
    await fetch(`${process.env.REACT_APP_SERVER}/delete/${id}`, {
      method: "DELETE",
    });

    const newData = currentData.filter((list, index) => {
      console.log(list._id, id);
      return list._id !== id;
    });

    setCurrentData(newData);
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
