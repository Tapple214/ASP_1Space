import "../task-manager/task-manager.css";
import NavBar from "../../components/navbar/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "react-bootstrap";

export default function taskManager() {
  return(
    <>
      {/* <NavBar /> */}
      <div className="left-section">
          <div className="task-form">
            <form>
              <input type="text" placeholder="Title" />
              <input type="date" placeholder="Current date" />
              <select className="category">
                <option value="default">Choose a category</option>
                <option value="Type1">Type1</option>
                <option value="Type2">Type2</option>
                <option value="Type3">Type3</option>
                <option value="Type4">Type4</option>
                <option value="Type5">Type5</option>
              </select>
              <textarea name="description"></textarea>
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
                  <button className="task-complete">✔</button>
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
                  <button className="task-complete">✔</button>
                </div>
              </div>
              <p>Body Soap, Eggs, Bread, AAA batteries</p>
            </div>
          </div>
        </div>
        <div className="right-section">
          <div className="badges">
            <img src="../public/images/first-launch.PNG" alt="first-launch"></img>
            <img src="../public/images/first-orbit.PNG" alt="first-orbit"></img>
            <img src="../public/images/galactic-traveler.PNG" alt="galactic-traveler"></img>
            <img src="../public/images/rocket-rider.PNG" alt="rocket-rider"></img>
            <img src="../public/images/star-seeker.PNG" alt="star-seeker"></img>
            <img src="../public/images/stellar-navigator.PNG" alt="stellar-navigator"></img>
            <p>test</p>
          </div>
        </div>
    </>
  )
}