import React from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function ModalPopup({
  showModal,
  handleCloseModal,
  title,
  content,
}) {
  return (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
      dialogClassName="modal-dialog-centered"
      size="lg"
    >
      <Modal.Body>
        <Modal.Title className="pb-3">{title}</Modal.Title>

        {content}

        <div className="d-flex justify-content-end">
          <button
            className="px-4 py-2 border-0 text-white rounded-2"
            onClick={handleCloseModal}
          >
            Close
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
