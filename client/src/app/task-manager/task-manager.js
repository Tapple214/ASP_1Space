import "../task-manager/task-manager.css";
import NavBar from "../../components/navbar/navbar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "../../components/form/form";
import { Row, Col } from "react-bootstrap";
import EntryOutput from "../../components/entry-output/entry-output";

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/delete/${type}/${id}`, {
        withCredentials: true,
      });
      setTasks(tasks.filter((task) => task.expense_id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="ps-5 ms-4 me-4 mt-4">
        <Row>
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
                  <p>No expenses to display.</p>
                )}
              </div>
            </div>
          </Col>

          {/* Right side of the page */}
          <Col md={12} lg={4}>
            {/* Badges and missions */}
            <div className="badges w-100">
              <button type="button" className="help-button">
                ❔
              </button>
              <h1 className="text-center">Badges</h1>
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

            {/* Mission list */}
            <div className="missions w-100">
              <h1 className="text-center">Missions</h1>
              <div className="mission-content">
                <p>
                  ● Complete Your First Task: Finish your first task to
                  kickstart your productivity journey.
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
                  ● Weekly Goal: Successfully complete 20 tasks by the end of
                  the week.
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
          </Col>
        </Row>
      </div>
    </>
  );
}
