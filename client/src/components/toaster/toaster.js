import { Toast } from "react-bootstrap";

export default function Toaster({ toast }) {
  return (
    <div
      className="fixed-bottom w-25 mb-3"
      style={{
        zIndex: "9999",
        marginLeft: "80px",
      }}
    >
      <Toast
        bg={toast.mode === "error" ? "danger" : "success"}
        className="text-white fw-medium w-auto ps-3"
        show={toast.show}
        animation={false}
      >
        <Toast.Body>{toast.message}</Toast.Body>
      </Toast>
    </div>
  );
}
