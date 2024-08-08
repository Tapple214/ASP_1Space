import axios from "axios";

export default function EntryOutput({
  type,
  id,
  date,
  title,
  description,
  onDelete,
  amount,
}) {
  //   const currentDateTime = new Date();
  //   const date = currentDateTime.toDateString();

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
    <div className={type === "transaction" ? "transaction-item" : ""}>
      <div className={type === "transaction" ? "transaction-header" : ""}>
        <h4>
          <span className="fw-bold">{title}</span>
          <span className="opacity-50"> • {date} • </span>
          {amount} SGD
        </h4>
        <div className="transaction-buttons">
          <button className="edit-button">✏️</button>
          <button className="delete-button" onClick={handleDelete}>
            🗑️
          </button>
        </div>
      </div>
      {description === "" ? <></> : <p>{description}</p>}
    </div>
  );
}
