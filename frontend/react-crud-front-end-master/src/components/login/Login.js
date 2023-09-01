import {
  EmailAuthProvider,
  linkWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { auth, gitHubProvider, provider } from "../../firebase";
import { GlobalContext } from "../../GloblaCotext";
import LoginGoogle from "../buttons/LoginGoogle";
import LoginGitHub from "../buttons/LoginGitHub";

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
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {}
    setEmail("");
    setPassword("");
  };

  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((data) => {
        console.log(data);
        toast.success("Logged in successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const gitHubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, gitHubProvider);
      console.log(result);
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        // Handle the case where the user's GitHub account is associated with a different credential (e.g., email/password).
        // You can implement the account linking logic here if needed.
        console.log(
          "Account exists with different credential. Handle linking."
        );
        toast.error("Account exists with a different credential.");
      } else {
        // Handle other errors
        console.error(error);
        toast.error("Login with GitHub failed.");
      }
    }
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
        <LoginGitHub gitHubLogin={gitHubLogin} />
      </Form>
    </div>
  );
}

export default Login;
