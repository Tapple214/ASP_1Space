import React from 'react';
import NavBar from '../../components/navbar/navbar';
import './FinancialOrganizer.css';

const FinancialOrganizer = () => {
  return (
    <>
      <NavBar />
      <div className="content">
        <div className="left-section">
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
            </table>
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
        </div>
        <div className="right-section">
          <div className="transactions-container">
            <div className="transaction-form">
              <form>
                <div className="form-inputs">
                  <div className="form-row">
                    <input type="text" placeholder="Title" className="title-input" />
                    <input type="date" placeholder="Current date" className="date-input" />
                    <input type="text" placeholder="Category" className="category-input" />
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
