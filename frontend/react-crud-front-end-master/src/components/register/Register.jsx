import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { auth } from "../../firebase"; // Import the initialized auth instance
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { GlobalContext } from "../../GloblaCotext";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const { setUserId, userId } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const signUp = async (email, password) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      toast.success("Registered successfully");
      console.log(user);
      setUserId(user.uid);

      user
        .getIdToken()
        .then((token) => {
          localStorage.setItem("authToken", token);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    setName("");
    setEmail("");
    setPassword("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    signUp(email, password);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <Form className="" style={{ maxWidth: "25rem" }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            placeholder="Enter Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Button onClick={onSubmit} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Register;
