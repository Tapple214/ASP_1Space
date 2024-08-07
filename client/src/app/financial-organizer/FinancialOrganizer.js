import React, { useState } from 'react';
import NavBar from '../../components/navbar/navbar';
import './FinancialOrganizer.css';

const FinancialOrganizer = () => {
  // State to store financial data
  const [financialData, setFinancialData] = useState({
    incomeDollar: 0, // Default total income
    rentDollar: 0,
    debtDollar: 0,
    investDollar: 0,
    othersDollar: 0,
  });

  // Handler to update dollar and percentage values
  const handleDollarChange = (field, value) => {
    const updatedData = { ...financialData, [field]: Number(value) };
    const totalExpenses =
      updatedData.rentDollar +
      updatedData.debtDollar +
      updatedData.investDollar +
      updatedData.othersDollar;

    // Calculate percentages based on the new total income
    const totalIncome = updatedData.incomeDollar;
    updatedData.rentPercent = (updatedData.rentDollar / totalIncome) * 100;
    updatedData.debtPercent = (updatedData.debtDollar / totalIncome) * 100;
    updatedData.investPercent = (updatedData.investDollar / totalIncome) * 100;
    updatedData.othersPercent = (updatedData.othersDollar / totalIncome) * 100;

    setFinancialData(updatedData);
  };

  const handlePercentChange = (field, value) => {
    const updatedData = { ...financialData, [field]: Number(value) };
    const totalIncome = updatedData.incomeDollar;

    updatedData.rentDollar = (updatedData.rentPercent * totalIncome) / 100;
    updatedData.debtDollar = (updatedData.debtPercent * totalIncome) / 100;
    updatedData.investDollar = (updatedData.investPercent * totalIncome) / 100;
    updatedData.othersDollar = (updatedData.othersPercent * totalIncome) / 100;

    setFinancialData(updatedData);
  };

  return (
    <>
      <NavBar />
      <div className="content">
        <div className="left-sec">
          <div className="financial-overview">
            <h2>Enter your financial overview!</h2>
            <table>
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
                  <td>
                    <input
                      type="number"
                      value={financialData.incomeDollar}
                      onChange={(e) => handleDollarChange('incomeDollar', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={100} // Income percent is always 100
                      disabled
                    />
                  </td>
                </tr>
                <tr>
                  <td>Rent</td>
                  <td>
                    <input
                      type="number"
                      value={financialData.rentDollar}
                      onChange={(e) => handleDollarChange('rentDollar', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={financialData.rentPercent}
                      onChange={(e) => handlePercentChange('rentPercent', e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Debt</td>
                  <td>
                    <input
                      type="number"
                      value={financialData.debtDollar}
                      onChange={(e) => handleDollarChange('debtDollar', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={financialData.debtPercent}
                      onChange={(e) => handlePercentChange('debtPercent', e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Invest</td>
                  <td>
                    <input
                      type="number"
                      value={financialData.investDollar}
                      onChange={(e) => handleDollarChange('investDollar', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={financialData.investPercent}
                      onChange={(e) => handlePercentChange('investPercent', e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Others</td>
                  <td>
                    <input
                      type="number"
                      value={financialData.othersDollar}
                      onChange={(e) => handleDollarChange('othersDollar', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={financialData.othersPercent}
                      onChange={(e) => handlePercentChange('othersPercent', e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Month's Budget</td>
                  <td>
                    <input
                      type="number"
                      value={
                        financialData.rentDollar +
                        financialData.debtDollar +
                        financialData.investDollar +
                        financialData.othersDollar
                      }
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={
                        financialData.rentPercent +
                        financialData.debtPercent +
                        financialData.investPercent +
                        financialData.othersPercent
                      }
                      disabled
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="summary">
            <h3>Your Summary</h3>
            <div className="summary-details">
              <div>
                <p>You've spent</p>
                <p>SGD {financialData.rentDollar + financialData.debtDollar + financialData.investDollar + financialData.othersDollar}</p>
              </div>
              <div>
                <p>Budget left</p>
                <p>SGD {financialData.incomeDollar - (financialData.rentDollar + financialData.debtDollar + financialData.investDollar + financialData.othersDollar)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="right-sec">
          <div className="transactions-container">
            <div className="transaction-form">
              <form>
                <div className="form-inputs">
                  <div className="form-row">
                    <input type="text" placeholder="Title" className="title-input" />
                    <input type="date" placeholder="Current date" className="date-input" />
                    <select className="category-input">
                      <option value="">Category</option>
                      <option value="food">Food</option>
                      <option value="transport">Transport</option>
                      <option value="entertainment">Entertainment</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <input type="text" placeholder="Description for transaction" className="description-input" />
                    <input type="number" placeholder="$" className="amount-input" />
                  </div>
                </div>
                <button type="submit" className="add-button">+</button>
              </form>
            </div>
            <div className="transaction-list">
              <div className="transaction-item">
                <div className="transaction-header">
                  <h4>June 5 Hang out (Movies)</h4>
                  <div className="transaction-buttons">
                    <button className="edit-button">✏️</button>
                    <button className="delete-button">🗑️</button>
                  </div>
                </div>
              </div>
              <div className="transaction-item">
                <div className="transaction-header">
                  <h4>June 6 Groceries</h4>
                  <div className="transaction-buttons">
                    <button className="edit-button">✏️</button>
                    <button className="delete-button">🗑️</button>
                  </div>
                </div>
                <p>Body Soap, Eggs, Bread, AAA batteries</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinancialOrganizer;
