import React from "react";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import axios from "axios";

export default function ModalPopup({
  type,
  showModal,
  handleCloseModal,
  title,
  content,
}) {
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3001/logout");
      // Handle successful logout
      console.log("Logout successful");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
          {type === "logout" ? (
            <>
              <button
                className="px-4 py-2 border-0 text-white rounded-2 me-2"
                onClick={handleLogout}
              >
                Confirm
              </button>

              <button
                className="px-4 py-2 border-0 text-white rounded-2"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </>
          ) : (
            <button
              className="px-4 py-2 border-0 text-white rounded-2"
              onClick={handleCloseModal}
            >
              Close
            </button>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
