import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { GlobalContext } from "../../GloblaCotext";
function CreateList({ name, title = "", body = "" }) {
  const [show, setShow] = useState(false);
  const { createList } = React.useContext(GlobalContext);
  const handleClose = () => {
    setModalTitle("");
    setModalBody("");
    setFile(null);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const currentInnerWidth = window.innerWidth;
  const colsValue = currentInnerWidth > 400 ? 35 : 25;
  const [modalTitle, setModalTitle] = React.useState("");
  const [modalBody, setModalBody] = React.useState("");
  const [file, setFile] = useState(null);
  const onChangeTitleHandler = (e) => {
    setModalTitle(e.target.value);
  };
  const onChangeBodyeHandler = (e) => {
    setModalBody(e.target.value);
  };
  const onFileHandler = (e) => {
    const selected = e.target.files[0];

    // Validate file type and size

    setFile(selected);
  };
  const saveHandler = async (e) => {
    e.preventDefault();
    if (modalTitle && modalBody) {
      await createList(modalTitle, modalBody, file);
      setModalBody("");
      setModalTitle("");
      handleClose();
      setFile(null);
    } else {
      alert("please provide all fields");
    }
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
                required={true}
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
                required={true}
                onChange={onChangeBodyeHandler}
                as="textarea"
                rows={3}
                value={modalBody}
              />
            </Form.Group>
            {file && (
              <img
                src={URL.createObjectURL(new Blob([file]))}
                style={{ maxWidth: "100%" }}
              />
            )}
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Select a file</Form.Label>
              <Form.Control
                onChange={(e) => {
                  onFileHandler(e);
                }}
                accept=".png, .jpg"
                type="file"
              />
            </Form.Group>
            <Button className="mx-2" variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              className="mx-2"
              type="submit"
              variant="primary"
              onClick={saveHandler}
            >
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateList;
