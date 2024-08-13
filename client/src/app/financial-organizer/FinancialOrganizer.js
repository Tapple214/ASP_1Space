// import React, { useState, useEffect } from "react";
// import NavBar from "../../components/navbar/navbar";
// import "./FinancialOrganizer.css";
// import EntryOutput from "../../components/entry-output/entry-output";
// import axios from "axios";
// import { Row, Col, Table } from "react-bootstrap";
// import Form from "../../components/form/form";

// // To enable cross-origin cookies
// axios.defaults.withCredentials = true;

// const FinancialOverview = () => {
//   return (
//     <div className="financial-overview">
//       <h2>Enter your financial overview!</h2>
//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th></th>
//             <th>$</th>
//             <th>%</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>Income</td>
//             <td>0</td>
//             <td>0</td>
//           </tr>
//           <tr>
//             <td>Rent</td>
//             <td>0</td>
//             <td>0</td>
//           </tr>
//           <tr>
//             <td>Debt</td>
//             <td>0</td>
//             <td>0</td>
//           </tr>
//           <tr>
//             <td>Invest</td>
//             <td>0</td>
//             <td>0</td>
//           </tr>
//           <tr>
//             <td>Others</td>
//             <td>0</td>
//             <td>0</td>
//           </tr>
//           <tr>
//             <td>Month's Budget</td>
//             <td>0</td>
//             <td>0</td>
//           </tr>
//         </tbody>
//       </Table>
//     </div>
//   );
// };

// export default function FinancialOrganizer() {
//   const [expenses, setExpenses] = useState([]);
//   const type = "transaction";

//   const fetchExpenses = async () => {
//     try {
//       const res = await axios.get(`http://localhost:3001/get/${type}`);
//       setExpenses(res.data);
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//     }
//   };

//   useEffect(() => {
//     fetchExpenses();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3001/delete/${type}/${id}`, {
//         withCredentials: true,
//       });
//       setExpenses(expenses.filter((expense) => expense.expense_id !== id));
//     } catch (error) {
//       console.error("Error deleting expense:", error);
//     }
//   };

//   return (
//     <>
//       <NavBar />
//       <div className="ps-5 ms-4 me-4 mt-4">
//         <Row>
//           {/* Left side of the page */}
//           <Col md={12} lg={4} className="mb-4">
//             {/* Summary overview */}
//             <FinancialOverview />

//             {/* TODO: create an in-file component for "Summary" */}
//             <div className="summary">
//               <h3>Your Summary</h3>
//               <div className="summary-details">
//                 <div>
//                   <p>You've spent</p>
//                   <p>SGD 300</p>
//                 </div>
//                 <div>
//                   <p>Budget left</p>
//                   <p>SGD 1200</p>
//                 </div>
//               </div>
//             </div>
//           </Col>

//           {/* Right side of the page */}
//           <Col md={12} lg={8}>
//             <div className="transactions-container">
//               {/* Form component */}
//               <Form type="transaction" fetchData={fetchExpenses} />

//               {/* Entry-output component; type = transaction */}
//               <div className="transaction-list">
//                 {expenses.length > 0 ? (
//                   expenses.map((expense) => (
//                     <EntryOutput
//                       type="transaction"
//                       key={expense.expense_id}
//                       id={expense.expense_id}
//                       date={expense.created_at}
//                       title={expense.expense_name}
//                       category={expense.expense_category}
//                       description={expense.expense_description}
//                       amount={expense.expense_amount}
//                       onDelete={handleDelete}
//                     />
//                   ))
//                 ) : (
//                   <p>No expenses to display.</p>
//                 )}
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </div>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import NavBar from "../../components/navbar/navbar";
import "./FinancialOrganizer.css";
import EntryOutput from "../../components/entry-output/entry-output";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Form from "../../components/form/form";

axios.defaults.withCredentials = true;

const FinancialOverview = ({ financialData, setFinancialData }) => {
  const [customPercentages, setCustomPercentages] = useState({});
  const handleChangeAmount = (field, value) => {
    const numValue = parseFloat(value) || 0;
    setFinancialData(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const handleChangePercentage = (field, percentage) => {
    const numPercentage = parseFloat(percentage) || 0;
    const newAmount = (financialData.income * numPercentage) / 100;
    setFinancialData(prev => ({
      ...prev,
      [field]: newAmount
    }));
  };

  const calculatePercentage = (amount, income) => {
    if (income > 0) {
      const result = (amount / income) * 100;
      return result.toFixed(2);
    }
    return '';
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
              <td>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</td>
              <td className="text-center">
              <input
                type="number"
                className="form-control"
                placeholder="Input $"
                value={value || ''} // Ensures the input is controlled when value is 0
                onChange={(e) => handleChangeAmount(key, e.target.value)}
                // onFocus={(e) => e.target.placeholder = ''} // Remove placeholder on focus
                // onBlur={(e) => e.target.placeholder = 'Input Amount'} // Reapply placeholder when not focused
              />
              </td>
              <td className="text-center">
                {key === 'income' ? '100%' : (
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Input %"
                      value={calculatePercentage(value, financialData.income) || ''}
                      onChange={(e) => handleChangePercentage(key, e.target.value)}
                      onFocus={(e) => e.target.placeholder = ''}
                      onBlur={(e) => {
                        if (e.target.value === '') {
                          e.target.placeholder = 'Input %';
                        }
                      }}
                    />
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const FinancialOrganizer = () => {
  const [financialData, setFinancialData] = useState({
    income: 0,
    monthBudget: 0,
    rent: 0,
    debt: 0,
    invest: 0,
    others: 0
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

  const totalSpent = Object.entries(financialData)
    .filter(([key]) => key !== 'income' && key !== 'monthBudget')
    .reduce((total, [_, value]) => total + value, 0);
  
  const budgetLeft = financialData.monthBudget - totalSpent;

  return (
    <>
      <NavBar />
      <div className="ps-5 ms-4 me-4 mt-4">
        <Row>
          <Col md={12} lg={4} className="mb-4">
            <FinancialOverview financialData={financialData} setFinancialData={setFinancialData} />
            <div className="summary">
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
          </Col>
          <Col md={12} lg={8}>
            <div className="transactions-container">
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
};

export default FinancialOrganizer;