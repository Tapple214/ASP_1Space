import "../task-manager/task-manager.css";
import NavBar from "../../components/navbar/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "react-bootstrap";

export default function taskManager() {
  return(
    <>
      <NavBar />
      <div className="right-section">
          <div className="transaction-form">
            <form>
              <input type="text" placeholder="Title" />
              <input type="date" placeholder="Current date" />
              <input type="text" placeholder="Category" />
              <input type="number" placeholder="$" />
              <button type="submit">+</button>
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
              <p>Body Soap, Eggs, Bread, AAA batteries</p>
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
    </>
  )
}