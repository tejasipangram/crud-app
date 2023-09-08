import { useContext, useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { GlobalContext } from "../../GloblaCotext";
import { Button } from "bootstrap";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

function UsersList() {
  const [user, setUser] = useState([]);
  const getUserData = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER}/user`);
      const data = await res.json();
      console.log(data, "this is data");
      setUser(data.data);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  const { darkMode } = useContext(GlobalContext);
  return (
    <div
      className={`min-vh-100 ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      <div className="container">
        <ListGroup data-bs-theme={darkMode ? "dark" : "light"}>
          {user.map((user) => {
            return <ListGroup.Item>{user}</ListGroup.Item>;
          })}
        </ListGroup>
      </div>
    </div>
  );
}

export default UsersList;
