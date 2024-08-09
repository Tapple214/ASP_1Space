import axios from "axios";

export default function EntryOutput({
  type,
  id,
  date,
  title,
  category,
  description,
  onDelete,
  amount,
}) {
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

  return (
    <div
      className="transaction-item"
      style={{
        backgroundColor: type === "transaction" ? "#9731b1" : "#F6D0EE",
        color: type === "transaction" ? "white" : "black",
      }}
    >
      <div className="transaction-header">
        {/* Header area */}
        <div className="d-flex align-items-center">
          <h4>
            <span className="fw-bold">{title}</span>
            <span className="opacity-50"> • {date} • </span>
            {amount} SGD
          </h4>
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
          <button className="edit-button">✏️</button>
          <button className="delete-button" onClick={handleDelete}>
            🗑️
          </button>

          {/*  If the type is task then show the button else show <></> aka nothing */}
          {type === "task" ? (
            <button className="task-complete">✔</button>
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* Decription area */}
      {description === "" ? <></> : <p>{description}</p>}
    </div>
  );
}
