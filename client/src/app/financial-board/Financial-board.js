import React, { useState, useEffect } from "react";
import "./Finance-board.css";
import EntryOutput from "../../components/entry-output/entry-output";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Form from "../../components/form/form";
import { Bar } from "react-chartjs-2";
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
}) => {
  useEffect(() => {
    // Initialize financialData state with values from financeOverview when it changes

    console.log("inside", financeOverview);
    if (financeOverview) {
      setFinancialData({
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
      console.log("Financial overview created successfully:", response.data);
    } catch (error) {
      console.error("Error creating financial overview:", error);
    }
  };

  const handleSave = () => {
    createFinancialOverview();
    console.log("handle Save");
  };

  const handleChangeAmount = (field, value) => {
    const numValue = parseFloat(value) || 0;
    setFinancialData((prev) => ({
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
        className="border-0 px-4 mb-1 py-1 text-white rounded-3"
        onClick={() => handleSave()}
      >
        Save
      </button>
    </div>
  );
};

export default function FinancialOrganizer() {
  const [financeOverview, setFinanceOverview] = useState({});

  // Fetch data from server
  const fetchFinancialOverview = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/get/FinancialOverview"
      );
      setFinanceOverview(res.data[0]);
      console.log(res.data);
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
    } catch (error) {
      console.error("Error deleting expense:", error);
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

  // Data for the chart
  const chartData = {
    labels: Object.keys(financialData).filter(
      (key) => key !== "income" && key !== "monthBudget"
    ),
    datasets: [
      {
        label: "Amount Spent",
        data: Object.values(financialData).filter(
          (_, index) => index !== 0 && index !== 1
        ), // Exclude 'income' and 'monthBudget'
        backgroundColor: "rgba(115, 11, 158, 0.2)",
        borderColor: "rgba(115, 11, 158, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `$${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <>
      <div className="ps-5 ms-4 me-4 mt-4" style={{ height: "95vh" }}>
        <Row className="h-100">
          <Col md={12} lg={5} className="mb-4">
            <FinancialOverview
              financialData={financialData}
              setFinancialData={setFinancialData}
              financeOverview={financeOverview}
            />
            <div className="summary mt-4 p-2">
              <h3>Your Summary</h3>
              <div className="summary-details">
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

            <Col md={12} lg={4} className="h-auto w-100 ">
              <div className="chart-container mt-4 text-center">
                <h3>Category Breakdown</h3>
                <Bar data={chartData} options={chartOptions} />
              </div>
            </Col>
          </Col>

          <Col md={12} lg={7} className="h-100">
            <div className="transactions-container h-100 overflow-scroll">
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
