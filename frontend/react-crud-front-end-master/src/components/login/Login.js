import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { auth, provider } from "../../firebase";
import { GlobalContext } from "../../GloblaCotext";
import LoginGoogle from "../buttons/LoginGoogle";

function Login() {
  const { setUserId, setLoading } = useContext(GlobalContext);
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
          toast.success("Login success");
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          toast.error(error.message);
        });
    } catch (error) {
      toast.message(error.message);
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
      if (email === "" || password === "") {
        toast.error("Please provide all the fields");
      } else {
        await login(email, password);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="container d-flex flex-column   justify-content-center align-items-center">
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
        <LoginGoogle onSubmit={signInWithGoogle} />
      </Form>
    </div>
  );
}

export default Login;
