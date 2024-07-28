import "../task-manager/task-manager.css";
import NavBar from "../../components/navbar/navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "react-bootstrap";

export default function taskManager() {
  return(
    <>
      <NavBar />
      <div className="task-manager-container">
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
              <button type="submit">+</button>
              <textarea name="description"></textarea>
            </form>
          </div>
          <div className="transaction-list">
            <div className="transaction-item">
              <div className="transaction-header">
                <h4>June 5 Hang out (Movies)</h4>
                <label className="category-label">Category</label>
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
                <label className="category-label">Category</label>
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
            <button type="button" className="help-button">❔</button>
            <h1 align="center">Badges</h1>
            <img src="/images/first-launch.png" alt="first-launch"></img>
            <img src="/images/first-orbit.png" alt="first-orbit"></img>
            <img src="/images/galactic-traveler.png" alt="galactic-traveler"></img>
            <img src="/images/rocket-rider.png" alt="rocket-rider"></img>
            <img src="/images/star-seeker.png" alt="star-seeker"></img>
            <img src="/images/stellar-navigator.png" alt="stellar-navigator"></img>
          </div>
          <div className="missions">
            <h1 align="center">Missions</h1>
            <p>Complete Your First Task: Finish your first task to kickstart your productivity journey.</p>
            <p>Three-Day Streak: Complete at least three tasks for three consecutive days.</p>
            <p>Morning Productivity: Complete your first task of the day before 10 AM for a week.</p>
            <p>Task Marathon: Finish 10 tasks in a single day.</p>
            <p>Weekly Goal: Successfully complete 20 tasks by the end of the week.</p>
            <p>Habit Builder: Work on the same task at the same time every day for a week.</p>
            <p>Focus Hour: Spend one uninterrupted hour on a single task without distractions.</p>
            <p>Top Priorities: Complete the three most important tasks on your list each day for five days.</p>
          </div>
        </div>
      </div>
    </>
  )
}