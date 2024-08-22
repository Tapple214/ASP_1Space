import React, { useState, useEffect } from "react";
import "./Finance-board.css";
import EntryOutput from "../../components/entry-output/entry-output";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Form from "../../components/form/form";
import ChartDisplay from "../../components/chart/chart";
import { useShowToaster } from "../../components/toaster/toastHook";
import Toaster from "../../components/toaster/toaster";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

axios.defaults.withCredentials = true;

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Create a get for financial overview and then use that to do graph calcs

const FinancialOverview = ({
  financialData,
  setFinancialData,
  financeOverview,
  setHomeFinanceData,
  toast,
}) => {
  useEffect(() => {
    // Initialize financialData state with values from financeOverview when it changes
    if (financeOverview) {
      setFinancialData({
        income: financeOverview.income || 0,
        monthBudget: financeOverview.month_budget || 0,
        rent: financeOverview.rent || 0,
        debt: financeOverview.debt || 0,
        invest: financeOverview.invest || 0,
        others: financeOverview.others || 0,
      });

      setHomeFinanceData({
        income: financeOverview.income || 0,
        monthBudget: financeOverview.month_budget || 0,
        rent: financeOverview.rent || 0,
        debt: financeOverview.debt || 0,
        invest: financeOverview.invest || 0,
        others: financeOverview.others || 0,
      });
    }
  }, [financeOverview, setFinancialData]);

  const createFinancialOverview = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/add/FinancialOverview",
        {
          income: financialData.income,
          monthBudget: financialData.monthBudget,
          rent: financialData.rent,
          debt: financialData.debt,
          invest: financialData.invest,
          others: financialData.others,
        }
      );

      toast.setSuccessMessage("Your financial overview has been saved!");
    } catch (error) {
      console.error("Error creating financial overview:", error);
    }
  };

  const handleSave = () => {
    createFinancialOverview();
  };

  const handleChangeAmount = (field, value) => {
    const numValue = parseFloat(value) || 0;
    setFinancialData((prev) => ({
      ...prev,
      [field]: numValue,
    }));

    setHomeFinanceData((prev) => ({
      ...prev,
      [field]: numValue,
    }));
  };

  const handleChangePercentage = (field, percentage) => {
    const numPercentage = parseFloat(percentage) || 0;
    const newAmount = (financialData.income * numPercentage) / 100;
    setFinancialData((prev) => ({
      ...prev,
      [field]: newAmount,
    }));

    setHomeFinanceData((prev) => ({
      ...prev,
      [field]: newAmount,
    }));
  };

  const calculatePercentage = (amount, income) => {
    if (income > 0) {
      const result = (amount / income) * 100;
      return result.toFixed(2);
    }
    return "";
  };

  return (
    <div className="financial-overview">
      <h2>Enter your financial overview!</h2>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>Category</th>
            <th className="text-center">$</th>
            <th className="text-center">%</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(financialData).map(([key, value], index) => (
            <tr key={index}>
              <td>
                {key.charAt(0).toUpperCase() +
                  key.slice(1).replace(/([A-Z])/g, " $1")}
              </td>
              <td className="text-center">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Input $"
                  value={value || ""} // Ensures the input is controlled when value is 0
                  onChange={(e) => handleChangeAmount(key, e.target.value)}
                />
              </td>
              <td className="text-center">
                {key === "income" ? (
                  "100%"
                ) : (
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Input %"
                    value={
                      calculatePercentage(value, financialData.income) || ""
                    }
                    onChange={(e) =>
                      handleChangePercentage(key, e.target.value)
                    }
                    onFocus={(e) => (e.target.placeholder = "")}
                    onBlur={(e) => {
                      if (e.target.value === "") {
                        e.target.placeholder = "Input %";
                      }
                    }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="table-save border-0 px-4 mb-1 py-1 text-white rounded-3 fw-bold"
        onClick={() => handleSave()}
      >
        Save
      </button>
    </div>
  );
};

export default function FinancialOrganizer({ setHomeFinanceData }) {
  const [financeOverview, setFinanceOverview] = useState({});
  const toast = useShowToaster();

  // Fetch data from server
  const fetchFinancialOverview = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/get/FinancialOverview"
      );
      setFinanceOverview(res.data[0]);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  const [financialData, setFinancialData] = useState({
    income: 0,
    monthBudget: 0,
    rent: 0,
    debt: 0,
    invest: 0,
    others: 0,
  });

  const [expenses, setExpenses] = useState([]);
  const type = "transaction";

  const fetchExpenses = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/get/${type}`);
      setExpenses(res.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchFinancialOverview();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete/${type}/${id}`, {
        withCredentials: true,
      });
      setExpenses(expenses.filter((expense) => expense.expense_id !== id));
      toast.setSuccessMessage(
        "Your expense entry has been deleted successfully!"
      );
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.setErrorMessage(
        "Uh oh! We can't seem to delete your expense entry"
      );
    }
  };

  const totalSpentFromExpenses = expenses.reduce(
    (total, expense) => total + expense.expense_amount,
    0
  );

  const totalSpentFromOverview = Object.entries(financialData)
    .filter(([key]) => key !== "income" && key !== "monthBudget")
    .reduce((total, [_, value]) => total + value, 0);

  const totalSpent = totalSpentFromExpenses + totalSpentFromOverview;

  const budgetLeft = financialData.monthBudget - totalSpent;

  return (
    <>
      <div className="ps-5 ms-4 me-4 mt-4" style={{ height: "95vh" }}>
        <Toaster toast={toast} />

        <Row className="h-100">
          <Col md={12} lg={5} className="mb-4" style={{ zIndex: "1000" }}>
            <FinancialOverview
              financialData={financialData}
              setFinancialData={setFinancialData}
              financeOverview={financeOverview}
              setHomeFinanceData={setHomeFinanceData}
              toast={toast}
            />
            <div className="summary mt-4 p-2">
              <h3>Your Summary</h3>
              <div className="summary-details pb-2">
                <div>
                  <p>You've spent</p>
                  <p>SGD {totalSpent}</p>
                </div>
                <div>
                  <p>Budget left</p>
                  <p>SGD {budgetLeft}</p>
                </div>
              </div>
            </div>

            <ChartDisplay financialData={financialData} />
          </Col>

          <Col md={12} lg={7} className="h-100">
            <h1 className="m-0 fw-bold">Finance Board</h1>
            <p className="mb-3" style={{ fontSize: "12px" }}>
              Track your daily and monthly expenses!
            </p>
            <div
              className="transactions-container h-100 overflow-scroll"
              style={{ maxHeight: "85vh" }}
            >
              <Form type="transaction" fetchData={fetchExpenses} />
              <div className="transaction-list">
                {expenses.length > 0 ? (
                  expenses.map((expense) => (
                    <EntryOutput
                      type="transaction"
                      key={expense.expense_id}
                      id={expense.expense_id}
                      date={expense.created_at}
                      title={expense.expense_name}
                      category={expense.expense_category}
                      description={expense.expense_description}
                      amount={expense.expense_amount}
                      onDelete={handleDelete}
                    />
                  ))
                ) : (
                  <div
                    className="d-flex flex-column justify-content-center align-items-center mt-5 pt-5"
                    style={{ color: "#6248a8" }}
                  >
                    <p className="m-0 fw-bold">No expenses to display.</p>
                    <img
                      src="/images/no-item.png"
                      alt={"no items here"}
                      width={150}
                      height={150}
                    />
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
