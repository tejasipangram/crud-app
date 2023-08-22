import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { GlobalContext } from "../../GloblaCotext";
import Form from "react-bootstrap/Form";
export function ShowPagesButton() {
  const { pageSize, setPageSize, getAllData } = useContext(GlobalContext);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = () => {
    getAllData();
    handleClose();
  };
  return (
    <div className="m-4">
      <Button variant="primary" onClick={handleShow}>
        Edit Show pages
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Show </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>List Title</Form.Label>
              <Form.Control
                min={1}
                onChange={(e) => {
                  setPageSize(e.target.value);
                }}
                type="number"
                value={pageSize}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
