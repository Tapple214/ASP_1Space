import "../task-manager/task-manager.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "../../components/form/form";
import { Row, Col } from "react-bootstrap";
import EntryOutput from "../../components/entry-output/entry-output";
import ModalPopup from "../../components/modal/modal";
import Toaster from "../../components/toaster/toaster";
import { useShowToaster } from "../../components/toaster/toastHook";

// To enable cross-origin cookies
axios.defaults.withCredentials = true;

const Badges = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      {/* Badges */}
      <div className="badges w-100 mt-4">
        <button
          type="button ms-0"
          className="help-button position-absolute me-5 mt-1 text-white"
          onClick={handleShow}
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

      {show && (
        <ModalPopup
          showModal={show}
          handleCloseModal={handleClose}
          title={"What are badges?"}
          content={
            "Badges are rewards earned by completing specific missions below, each representing a significant achievement or milestone. To redeem your rewards, simply take a screenshot of your earned badge and send it via email shown in the help section of the app. Upon verification, your reward will be processed and given accordingly."
          }
        />
      )}
    </>
  );
};

const Mission = () => {
  return (
    <>
      {/* Mission list */}
      <div className="missions w-100 mt-4">
        <h3 className="text-center fw-bold m-0">Missions</h3>
        <div className="mission-content">
          <p>
            1. Complete Your First Task: Finish your first task to kickstart
            your productivity journey.
          </p>
          <p>
            2. Three-Day Streak: Complete at least three tasks for three
            consecutive days.
          </p>
          <p>
            3. Consistent Productivity: Complete your 5 tasks before 5pm for 3
            days straight
          </p>
          <p>4. Staying Alert: Completed 3 urgent tasks in 5 days.</p>
          <p>
            5. Weekly Consistency: Complete your 10 tasks before 5pm for 6 days
            straight
          </p>
          <p>6. The Collector: Collected 5 badges.</p>
        </div>
      </div>
    </>
  );
};

export default function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const type = "task";
  const toast = useShowToaster();

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
      <div className="ps-5 ms-4 me-4 mt-4" style={{ zIndex: "1000" }}>
        <Toaster toast={toast} />

        <Row className="h-100">
          {/* Left side of the page */}
          <Col md={12} lg={8} className="mb-4" style={{ zIndex: "1000" }}>
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
                    className="d-flex flex-column justify-content-center align-items-center position-relative mt-5 pt-5"
                    style={{
                      color: "#6248a8",
                    }}
                  >
                    <p className="m-0 fw-bold">No tasks to display.</p>
                    <img
                      src="/images/no-item.png"
                      alt="no items here"
                      width={150}
                      height={150}
                    />
                  </div>
                )}
              </div>
            </div>
          </Col>

          {/* Right side of the page */}
          <Col md={12} lg={4}>
            <h1 className="m-0 fw-bold">Task Manager</h1>
            <p className="m-0 ms-2" style={{ fontSize: "12px" }}>
              Mark down To-dos and complete missions achieve badges and rewards!
            </p>
            {/* Badge component */}
            <Badges />

            {/* Mission component */}
            <Mission />
          </Col>
        </Row>
      </div>
    </>
  );
}
