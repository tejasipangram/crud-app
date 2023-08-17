import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { GlobalContext } from "../../GloblaCotext";
function CreateList({ name, title = "", body = "" }) {
  const [show, setShow] = useState(false);
  const { createList } = React.useContext(GlobalContext);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const currentInnerWidth = window.innerWidth;
  const colsValue = currentInnerWidth > 400 ? 35 : 25;
  const [modalTitle, setModalTitle] = React.useState("");
  const [modalBody, setModalBody] = React.useState("");
  const onChangeTitleHandler = (e) => {
    setModalTitle(e.target.value);
  };
  const onChangeBodyeHandler = (e) => {
    setModalBody(e.target.value);
  };
  const saveHandler = async () => {
    await createList(modalTitle, modalBody);
    setModalBody("");
    setModalTitle("");
    handleClose();
  };
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Create List
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>List Title</Form.Label>
              <Form.Control
                required
                onChange={onChangeTitleHandler}
                type="text"
                value={modalTitle}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                onChange={onChangeBodyeHandler}
                as="textarea"
                rows={3}
                value={modalBody}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateList;
