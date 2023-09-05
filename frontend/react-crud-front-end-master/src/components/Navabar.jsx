import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { toast } from "react-toastify";

function NavbarComp({ user }) {
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
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>CRUD APP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="text-decoration-none mx-2" to={"/"}>
              <span>Home</span>
            </Link>

            <Link className="text-decoration-none mx-2" to={"/login"}>
              <span>Login</span>
            </Link>
            <Link className="text-decoration-none mx-2" to={"/register"}>
              <span>Register</span>
            </Link>
            {user && <button onClick={logout}>Log out</button>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
