import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { GlobalContext } from "../../GloblaCotext";
function EditList({ id, title, description, filePath }) {
  const [show, setShow] = useState(false);
  const { updateList, setKey } = React.useContext(GlobalContext);
  const handleClose = () => {
    setShow(false);
    // setFile({ original: filePath });
  };
  const handleShow = () => setShow(true);
  const currentInnerWidth = window.innerWidth;
  const colsValue = currentInnerWidth > 400 ? 35 : 25;
  const [modalTitle, setModalTitle] = React.useState(title);
  const [modalBody, setModalBody] = React.useState(description);
  const [file, setFile] = useState({ original: filePath, updated: "" });

  const onChangeTitleHandler = (e) => {
    setModalTitle(e.target.value);
  };
  const onChangeBodyeHandler = (e) => {
    setModalBody(e.target.value);
  };

  const saveHandler = async () => {
    if (modalTitle && modalBody) {
      await updateList(id, modalTitle, modalBody, file.updated);

      setFile({ original: filePath });
      handleClose();

      setKey(Math.random());
    } else {
      alert("please provide all fields");
    }
  };
  const onFileHandler = (e) => {
    const selected = e.target.files[0];

    // Validate file type and size

    setFile({ updated: selected });
  };

  useEffect(() => {}, [title, description, file]);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Update
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>List Title</Form.Label>
              <Form.Control
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
                onChange={onChangeBodyeHandler}
                as="textarea"
                rows={3}
                value={modalBody}
              />
            </Form.Group>
            {file && file.original && (
              <img
                src={process.env.REACT_APP_SERVER + "/static/" + file.original}
                style={{ maxWidth: "100%" }}
              />
            )}
            {file && file.updated && (
              <img
                src={URL.createObjectURL(new Blob([file.updated]))}
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

export default EditList;
