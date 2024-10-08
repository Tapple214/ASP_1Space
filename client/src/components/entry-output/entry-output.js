import axios from "axios";
import { useState } from "react";

export default function EntryOutput({
  type,
  id,
  date,
  title,
  category,
  description,
  onDelete,
  onComplete,
  amount,
}) {
  const [isComplete, setIsComplete] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/delete/${type}/${id}`);
      if (onDelete) {
        onDelete(id);
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleComplete = async () => {
    try {
      await axios.get(`http://localhost:3001/complete/task/${id}`);
      setIsComplete(true);
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  return (
    <>
      <div
        className="transaction-item"
        style={{
          backgroundColor:
            type === "transaction"
              ? "#9731b1"
              : isComplete === true
              ? "grey"
              : "#F6D0EE",

          color: type === "transaction" ? "white" : "black",
        }}
      >
        <div className="transaction-header">
          {/* Header area */}
          <div className="d-flex align-items-center">
            {type === "transaction" ? (
              <h4>
                <span className="fw-bold">{title}</span>
                <span className="opacity-50"> • {date} • </span>
                {amount} SGD
              </h4>
            ) : (
              <h4>
                <span className="fw-bold">{title}</span>
                <span className="opacity-50"> • {date} • </span>
              </h4>
            )}
            <span
              className={`badge ${
                category === "food" || category === "urgent"
                  ? "bg-danger"
                  : category === "transport" || category === "chill"
                  ? "bg-success"
                  : "bg-secondary"
              } ms-2`}
            >
              {category}
            </span>
          </div>

          {/* Buttons */}
          <div
            className={
              type === "transaction" ? "transaction-buttons" : "task-buttons"
            }
          >
            <button className="delete-button p-0" onClick={handleDelete}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-trash-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
              </svg>
            </button>

            {/*  If the type is task then show the button else show <></> aka nothing */}
            {type === "task" ? (
              <button className="task-complete" onClick={handleComplete}>
                ✔
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>

        {/* Decription area */}
        {description === "" ? <></> : <p>{description}</p>}
      </div>
    </>
  );
}
