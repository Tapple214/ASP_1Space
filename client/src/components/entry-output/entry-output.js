import axios from "axios";

export default function EntryOutput({
  id,
  date,
  title,
  description,
  onDelete,
}) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/expense-delete/${id}`);
      if (onDelete) {
        onDelete(id);
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <div className="transaction-item">
      <div className="transaction-header">
        <h4>
          <span> {date} </span> {title}
        </h4>
        <div className="transaction-buttons">
          <button className="edit-button">✏️</button>
          <button className="delete-button" onClick={handleDelete}>
            🗑️
          </button>
        </div>
      </div>
      <p>{description}</p>
    </div>
  );
}
