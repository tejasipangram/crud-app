import "./App.css";
import { GlobalContext } from "./GloblaCotext";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import NavbarComp from "./components/Navabar";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Loader from "./Loader";

import { auth } from "./firebase";
import { signInWithCustomToken } from "firebase/auth";
import Resetpassword from "./components/resetpassword/Resetpassword";

function App() {
  const [userId, setUserId] = useState(null);
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

    fetch(`${process.env.REACT_APP_SERVER}/create/${userId}`, {
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
    if (userId) {
      setLoading(true);
      const encodedUserId = encodeURIComponent(userId);
      fetch(
        `${process.env.REACT_APP_SERVER}/read/${encodedUserId}?page=${page}&pageSize=${pageSize}`
      )
        .then((response) => response.json())
        .then((json) => {
          if (json.success) {
            console.log(json);
            setLoading(false);
            setTotalPages(json.totalPages);
            setCurrentData(json.data);
            setCurrentPage(json.page);
          } else {
            setLoading(false);
            setTotalPages(0);
            setCurrentData([]);
            setCurrentPage(1);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          setCurrentData([]);
        });
    }
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
  const AuthorizeUser = async () => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      try {
        await signInWithCustomToken(authToken);
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getAllData();
  }, [pageSize, userId]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is logged in
        console.log("User is logged in:", user.uid);
        setUserId(user.uid);
      } else {
        setUserId(null);
        // User is logged out
        console.log("User is logged out");
      }
    });

    return () => unsubscribe(); // Clean up the listener when component unmounts
  }, []);
  return (
    <BrowserRouter>
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
          currentData,
          loading,
          setLoading,
          userId,
          setUserId,
        }}
      >
        <NavbarComp userId={userId} />
        <Loader loading={loading} setLoading={setLoading} />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route path="/" element={userId ? <Home /> : <Login />} />

          <Route path="/login" element={userId ? <Home /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/resetpassword" element={<Resetpassword />} />
        </Routes>
      </GlobalContext.Provider>
    </BrowserRouter>
  );
}

export default App;
