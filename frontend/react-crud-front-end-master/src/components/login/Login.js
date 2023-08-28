import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { GlobalContext } from "../../GloblaCotext";

function Login() {
  const { setUserId } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = async (email, password) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    setUserId(user.uid);
    user
      .getIdToken()
      .then((token) => {
        localStorage.setItem("authToken", token);
      })
      .catch((error) => {
        console.log(error);
      });

    setEmail("");
    setPassword("");
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      await login(email, password);
      toast.success("Login success");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="container d-flex justify-content-center align-items-center">
      <Form className="" style={{ maxWidth: "25rem" }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
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
}

export default Login;
