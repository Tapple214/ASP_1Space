import React, { useState, useEffect } from "react";
import axios from "axios";

// Input form component
export default function Form({ type, fetchData }) {
  const [todayDate, setTodayDate] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    setTodayDate(`${year}-${month}-${day}`);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `http://localhost:3001/add/${type}`,
        {
          title,
          date: todayDate,
          category,
          description,
          amount,
        },
        { withCredentials: true }
      );

      // Refresh the expense list after adding a new expense
      fetchData();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div
      className="transaction-form p-3"
      style={{
        backgroundColor: type === "transaction" ? "#9731b1" : "#F6D0EE",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="form-inputs">
          <div className="form-row">
            {/* Title */}
            <input
              type="text"
              placeholder="Title"
              className="title-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            {/* Date */}
            <input
              type="date"
              className="date-input"
              value={todayDate}
              readOnly
            />

            {/* Category */}
            <select
              className="category-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Category</option>
              {type === "transaction" ? (
                <>
                  <option value="food">Food</option>
                  <option value="transport">Transport</option>
                  <option value="entertainment">Entertainment</option>
                </>
              ) : (
                <>
                  <option value="urgent">Urgent</option>
                  <option value="chill">Chill</option>
                  <option value="undefined">Undefined</option>
                </>
              )}
            </select>
          </div>

          {/* Description */}
          <div className="form-row">
            <input
              type="text"
              placeholder="Description for transaction"
              className="description-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {/* Amount or Finish by date (depends on type) */}
            {type === "transaction" ? (
              <input
                type="number"
                placeholder="$"
                className="amount-input"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            ) : (
              <div className="d-flex flex-column">
                <p className="p-0 m-0" style={{ fontSize: "10px" }}>
                  &nbsp; Deadline:
                </p>
                <input type="date" className="date-input" required />
              </div>
            )}
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className="add-button">
          +
        </button>
      </form>
    </div>
  );
}
