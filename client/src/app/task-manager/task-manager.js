import "../task-manager/task-manager.css";
import NavBar from "../../components/navbar/navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "../../components/form/form";
import { Row, Col } from "react-bootstrap";
import EntryOutput from "../../components/entry-output/entry-output";

// To enable cross-origin cookies
axios.defaults.withCredentials = true;

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const type = "task";

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/get/${type}`);
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete/${type}/${id}`, {
        withCredentials: true,
      });
      setTasks(tasks.filter((task) => task.task_id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <>
      <div className="ps-5 ms-4 me-4 mt-4">
        <Row className="h-100">
          {/* Left side of the page */}
          <Col md={12} lg={8} className="mb-4">
            <div className="left-section">
              {/* Form component */}
              <div className="task-form">
                <Form type="task" fetchData={fetchTasks} />
              </div>

              {/* Entry-output component; type = task */}
              <div className="task-list">
                {tasks.length > 0 ? (
                  tasks.map((task) => (
                    <EntryOutput
                      type="task"
                      key={task.task_id}
                      id={task.task_id}
                      date={task.created_at}
                      title={task.task_name}
                      category={task.task_category}
                      description={task.task_description}
                      finishBy={task.finish_by}
                      onDelete={handleDelete}
                    />
                  ))
                ) : (
                  <div
                    className="d-flex flex-column justify-content-center align-items-center"
                    style={{ color: "#6248a8" }}
                  >
                    <p className="m-0 fw-bold">No tasks to display.</p>
                    <img src="/images/no-item.png" width={150} height={150} />
                  </div>
                )}
              </div>
            </div>
          </Col>

          {/* Right side of the page */}
          <Col md={12} lg={4}>
            {/* TODO: create an in-file component for Badges and missions */}
            {/* Badges */}
            <div className="badges w-100">
              <button
                type="button ms-0"
                className="help-button position-absolute me-5 mt-1"
              >
                ❔
              </button>
              <h3 className="text-center fw-bold">Badges</h3>
              <img
                src="/images/first-launch.png"
                alt="first-launch"
                className="img-fluid"
              ></img>
              <img
                src="/images/first-orbit.png"
                alt="first-orbit"
                className="img-fluid"
              ></img>
              <img
                src="/images/galactic-traveler.png"
                alt="galactic-traveler"
                className="img-fluid"
              ></img>
              <img
                src="/images/rocket-rider.png"
                alt="rocket-rider"
                className="img-fluid"
              ></img>
              <img
                src="/images/star-seeker.png"
                alt="star-seeker"
                className="img-fluid"
              ></img>
              <img
                src="/images/stellar-navigator.png"
                alt="stellar-navigator"
                className="img-fluid"
              ></img>
            </div>

            {/* TODO: create an in-file component for Mission list */}
            {/* Mission list */}
            <div className="missions w-100 mt-4">
              <h3 className="text-center fw-bold">Missions</h3>
              <div className="mission-content">
                <p>
                  1. Complete Your First Task: Finish your first task to
                  kickstart your productivity journey.
                </p>
                <p>
                  2. Three-Day Streak: Complete at least three tasks for three
                  consecutive days.
                </p>
                <p>
                  3. Morning Productivity: Complete your first task of the day
                  before 10 AM for a week.
                </p>
                <p>4. Task Marathon: Finish 10 tasks in a single day.</p>
                <p>
                  5. Weekly Goal: Successfully complete 20 tasks by the end of
                  the week.
                </p>
                <p>
                  6. Habit Builder: Work on the same task at the same time every
                  day for a week.
                </p>
                <p>
                  7. Focus Hour: Spend one uninterrupted hour on a single task
                  without distractions.
                </p>
                <p>
                  8. Top Priorities: Complete the three most important tasks on
                  your list each day for five days.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
