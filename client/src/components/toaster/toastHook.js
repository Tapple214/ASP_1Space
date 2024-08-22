import { useState } from "react";

export function useShowToaster() {
  const [mode, setMode] = useState("");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  return {
    mode,
    message,
    show,
    setSuccessMessage: (message) => {
      setMessage(message);
      setMode("success");
      setShow(true);
      setTimeout(() => setShow(false), 5000);
      clearTimeout();
    },

    setErrorMessage: (message) => {
      setMessage(message);
      setMode("error");
      setShow(true);
      setTimeout(() => setShow(false), 5000);
      clearTimeout();
    },
  };
}
