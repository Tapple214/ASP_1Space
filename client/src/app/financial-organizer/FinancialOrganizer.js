import React, { useState, useEffect } from "react";
import NavBar from "../../components/navbar/navbar";
import "./FinancialOrganizer.css";
import EntryOutput from "../../components/entry-output/entry-output";
import axios from "axios";
import { Row, Col, Table } from "react-bootstrap";
import Form from "../../components/form/form";

// To enable cross-origin cookies
axios.defaults.withCredentials = true;

export default function FinancialOrganizer() {
  const [expenses, setExpenses] = useState([]);
  const type = "transaction";

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/get/${type}`);
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
      await axios.delete(`http://localhost:3001/delete/${type}/${id}`, {
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
              {/* Form component */}
              <Form type="transaction" fetchData={fetchExpenses} />

              {/* Entry-output component; type = transaction */}
              <div className="transaction-list">
                {expenses.length > 0 ? (
                  expenses.map((expense) => (
                    <EntryOutput
                      type="transaction"
                      key={expense.expense_id}
                      id={expense.expense_id}
                      date={expense.created_at}
                      title={expense.expense_name}
                      description={expense.expense_description}
                      amount={expense.expense_amount}
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
