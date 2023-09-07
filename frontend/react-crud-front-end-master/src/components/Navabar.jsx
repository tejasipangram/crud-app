import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { useContext } from "react";
import { GlobalContext } from "../GloblaCotext";

function NavbarComp({ user, setDarkMode }) {
  const { darkMode } = useContext(GlobalContext);
  const logout = () => {
    auth
      .signOut()
      .then(() => {
        toast.success("Logged out successfully");
      })
      .catch((error) => {
        console.log(error);
        // Handle logout error
      });
  };
  return (
    <Navbar
      expand="lg"
      className={`${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}
    >
      <Container className="d-flex justify-content-center align-items-center">
        <Navbar.Brand className={`${darkMode ? "text-light" : "text-dark"}`}>
          CRUD APP
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto d-flex justify-content-center align-items-center">
            <Link className="text-decoration-none mx-2" to={"/"}>
              <span>Home</span>
            </Link>

            <Link className="text-decoration-none mx-2" to={"/login"}>
              <span>Login</span>
            </Link>
            <Link className="text-decoration-none mx-2" to={"/register"}>
              <span>Register</span>
            </Link>
            {user && (
              <button className="btn btn-danger py-0" onClick={logout}>
                Log out
              </button>
            )}
            <button
              onClick={() => {
                setDarkMode(!darkMode);
              }}
              className={`mx-2 py-0 btn ${
                darkMode ? "bg-light text-dark" : "bg-dark text-light"
              }`}
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
