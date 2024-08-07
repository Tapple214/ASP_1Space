export default function EntryOutput({ date, title, description }) {
  return (
    <>
      <div className="transaction-item">
        <div className="transaction-header">
          <h4>
            <span>{date} </span> {title}
          </h4>
          <div className="transaction-buttons">
            <button className="edit-button">✏️</button>
            <button className="delete-button">🗑️</button>
          </div>
        </div>
        <p>{description}</p>
      </div>
    </>
  );
}
