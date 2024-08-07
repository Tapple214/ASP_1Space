import React, { useState, useEffect } from "react";
import NavBar from "../../components/navbar/navbar";
import "./FinancialOrganizer.css";
import EntryOutput from "../../components/entry-output/entry-output";
import axios from "axios";
import { Row, Col, Table } from "react-bootstrap";

// To enable cross-origin cookies
axios.defaults.withCredentials = true;

// Input form component
const ExpenseForm = ({ fetchExpenses }) => {
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
    console.log("Form submitted with data:", {
      title,
      todayDate,
      category,
      description,
      amount,
    });
    try {
      await axios.post(
        "http://localhost:3001/expense-add",
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
      fetchExpenses();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="transaction-form">
      <form onSubmit={handleSubmit}>
        <div className="form-inputs">
          <div className="form-row">
            <input
              type="text"
              placeholder="Title"
              className="title-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="date"
              className="date-input"
              value={todayDate}
              readOnly
            />
            <select
              className="category-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Category</option>
              <option value="food">Food</option>
              <option value="transport">Transport</option>
              <option value="entertainment">Entertainment</option>
            </select>
          </div>
          <div className="form-row">
            <input
              type="text"
              placeholder="Description for transaction"
              className="description-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              placeholder="$"
              className="amount-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="add-button">
          +
        </button>
      </form>
    </div>
  );
};

export default function FinancialOrganizer() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:3001/expense-get");
      console.log(res.data);
      setExpenses(res.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/expense-delete/${id}`, {
        withCredentials: true,
      });
      setExpenses(expenses.filter((expense) => expense.expense_id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="ps-5 ms-4 me-3 mt-4">
        <Row>
          <Col md={12} lg={4} className="mb-4">
            <div className="financial-overview">
              <h2>Enter your financial overview!</h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th></th>
                    <th>$</th>
                    <th>%</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Income</td>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td>Rent</td>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td>Debt</td>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td>Invest</td>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td>Others</td>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                  <tr>
                    <td>Month's Budget</td>
                    <td>0</td>
                    <td>0</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div className="summary">
              <h3>Your Summary</h3>
              <div className="summary-details">
                <div>
                  <p>You've spent</p>
                  <p>SGD 300</p>
                </div>
                <div>
                  <p>Budget left</p>
                  <p>SGD 1200</p>
                </div>
              </div>
            </div>
          </Col>

          <Col md={12} lg={8}>
            <div className="transactions-container">
              <ExpenseForm fetchExpenses={fetchExpenses} />
              <div className="transaction-list">
                {expenses.length > 0 ? (
                  expenses.map((expense) => (
                    <EntryOutput
                      key={expense.expense_id}
                      id={expense.expense_id}
                      date={expense.created_at}
                      title={expense.expense_name}
                      description={expense.expense_description}
                      onDelete={handleDelete}
                    />
                  ))
                ) : (
                  <p>No expenses to display.</p>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
