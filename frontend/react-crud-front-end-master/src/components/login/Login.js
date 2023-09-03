import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { auth, provider } from "../../firebase";
import { GlobalContext } from "../../GloblaCotext";
import LoginGoogle from "../buttons/LoginGoogle";

function Login() {
  const { setUserId, setLoading, darkMode } = useContext(GlobalContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = async (email, password) => {
    try {
      setLoading(true);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setUserId(user.uid);
      setLoading(false);

      user
        .getIdToken()
        .then((token) => {
          localStorage.setItem("authToken", token);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    } catch (error) {
      setLoading(false);
    }
    setEmail("");
    setPassword("");
  };

  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();

      await login(email, password);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div
      className={`min-vh-100 ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      <div className="container d-flex flex-column   justify-content-center align-items-center">
        <Form className="" style={{ maxWidth: "25rem" }}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              value={email}
              required={true}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className={` ${darkMode ? "text-light" : "text-dark"}`}>
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required={true}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <Button
            className="w-100"
            onClick={onSubmit}
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
          <LoginGoogle onSubmit={signInWithGoogle} />
        </Form>
      </div>
    </div>
  );
}

export default Login;
