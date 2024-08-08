import "../task-manager/task-manager.css";
import NavBar from "../../components/navbar/navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "../../components/form/form";

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const type = "task";

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/get/${type}`);
      console.log(res.data);
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <NavBar />
      <div className="task-manager-container">
        <div className="left-section">
          {/* Form component */}
          <div className="task-form">
            <Form type="task" fetchData={fetchTasks} />
          </div>

          {/* Entry-output component; type = task */}
          <div className="task-list">
            <div className="task-item">
              <div className="task-header">
                <div className="task-date">
                  <h4>June 5</h4>
                </div>
                <div className="task-title">
                  <h4>Organize study table</h4>
                </div>
                <div className="task-buttons">
                  <label className="category-label">Category</label>
                  <button className="edit-button">✏️</button>
                  <button className="delete-button">🗑️</button>
                  <button className="task-complete">✔</button>
                </div>
              </div>
              <p>Laptop, notepad, charger, glasses, bottle</p>
            </div>
            <div className="task-item">
              <div className="task-header">
                <div className="task-date">
                  <h4>June 6</h4>
                </div>
                <div className="task-title">
                  <h4>Finish task</h4>
                </div>
                <div className="task-buttons">
                  <label className="category-label">Category</label>
                  <button className="edit-button">✏️</button>
                  <button className="delete-button">🗑️</button>
                  <button className="task-complete">✔</button>
                </div>
              </div>
              <p>Agile proposal interview</p>
            </div>
          </div>
        </div>

        {/* Badges and mission */}
        {/* TODO: convert this into a component */}
        <div className="right-section">
          <div className="badges">
            <button type="button" className="help-button">
              ❔
            </button>
            <h1 align="center">Badges</h1>
            <img src="/images/first-launch.png" alt="first-launch"></img>
            <img src="/images/first-orbit.png" alt="first-orbit"></img>
            <img
              src="/images/galactic-traveler.png"
              alt="galactic-traveler"
            ></img>
            <img src="/images/rocket-rider.png" alt="rocket-rider"></img>
            <img src="/images/star-seeker.png" alt="star-seeker"></img>
            <img
              src="/images/stellar-navigator.png"
              alt="stellar-navigator"
            ></img>
          </div>
          <div className="missions">
            <h1 align="center">Missions</h1>
            <div className="mission-content">
              <p>
                ● Complete Your First Task: Finish your first task to kickstart
                your productivity journey.
              </p>
              <p>
                ● Three-Day Streak: Complete at least three tasks for three
                consecutive days.
              </p>
              <p>
                ● Morning Productivity: Complete your first task of the day
                before 10 AM for a week.
              </p>
              <p>● Task Marathon: Finish 10 tasks in a single day.</p>
              <p>
                ● Weekly Goal: Successfully complete 20 tasks by the end of the
                week.
              </p>
              <p>
                ● Habit Builder: Work on the same task at the same time every
                day for a week.
              </p>
              <p>
                ● Focus Hour: Spend one uninterrupted hour on a single task
                without distractions.
              </p>
              <p>
                ● Top Priorities: Complete the three most important tasks on
                your list each day for five days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
