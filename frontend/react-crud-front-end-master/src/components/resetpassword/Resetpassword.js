import { sendPasswordResetEmail } from "firebase/auth";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { useContext, useState } from "react";
import { GlobalContext } from "../../GloblaCotext";

function Resetpassword() {
  const { loading, setLoading } = useContext(GlobalContext);
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
        toast.success("Email verifcation link sent");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage);
        // ..
      });
  };
  return (
    <div className="container d-flex justify-content-center">
      <Form onSubmit={handleSubmit} style={{ maxWidth: "25rem" }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Button disabled={loading} variant="primary" type="submit">
          Reset
        </Button>
      </Form>
    </div>
  );
}

export default Resetpassword;
