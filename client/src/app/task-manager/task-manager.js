import "../task-manager/task-manager.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "../../components/form/form";
import { Row, Col } from "react-bootstrap";
import EntryOutput from "../../components/entry-output/entry-output";
import badgesData from "../../components/json/badges.json";
import ModalPopup from "../../components/modal/modal";
import Toaster from "../../components/toaster/toaster";
import { useShowToaster } from "../../components/toaster/toastHook";

// To enable cross-origin cookies
axios.defaults.withCredentials = true;

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

const Badges = ({ tasks }) => {
  const [badges, setBadges] = useState([]);
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const fetchBadges = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/badges");
      setBadges(res.data);
    } catch (error) {
      console.error("Error fetching badges: ", error);
    }
  };

  useEffect(() => {
    fetchBadges();
  }, []);

  const awardBadge = async (badgeName, badgeDescription) => {
    try {
      await axios.post("http://localhost:3001/api/badges", {
        badgeName,
        badgeDescription,
      });
    } catch (error) {
      console.error("Error awarding badge: ", error);
    }
  };

  useEffect(() => {
    const completedTasks = tasks.filter((task) => task.is_complete);
    const taskDates = completedTasks.map((task) =>
      new Date(task.created_at).toDateString()
    );

    // if statements to see if user meets the criteria to earn the respective badges
    badgesData.forEach((badge) => {
      switch (badge.name) {
        case "First Launch":
          if (
            tasks.length > 0 &&
            !badges.find((b) => b.name === "First Launch")
          ) {
            awardBadge(badge.name, badge.img);
          }
          break;
        case "First Orbit":
          if (
            completedTasks.length >= 3 &&
            !badges.find((b) => b.name === "First Orbit")
          ) {
            awardBadge(badge.name, badge.img);
          }
          break;
        case "Rocket Rider":
          if (
            completeRocketRider(tasks) &&
            !badges.find((b) => b.name === "Rocket Rider")
          ) {
            awardBadge(badge.name, badge.img);
          }
          break;
        case "Galactic Traveler":
          if (
            completeGalacticTraveler(tasks) &&
            !badges.find((b) => b.name === "Rocket Rider")
          ) {
            awardBadge(badge.name, badge.img);
          }
          break;
        case "Star Seeker":
          if (
            checkUrgentTasksInLast5Days(tasks) &&
            !badges.find((b) => b.name === "Rocket Rider")
          ) {
            awardBadge(badge.name, badge.img);
          }
          break;
        case "Stellar Navigator":
          if (badges.length === 5) {
            awardBadge(badge.name, badge.img);
          }
          break;
        default:
          break;
      }
    });
  }, [tasks, badges]);

  // Helper functions to deal with badge requirements

  // Collects tasks completed before 5PM
  const completeTaskBefore5PM = (tasks) => {
    return tasks.filter((task) => {
      if (task.is_complete && task.completed_at) {
        const completedAt = new Date(task.completed_at);
        const hours = completedAt.getHours();
        return hours < 17;
      }
      return false;
    });
  };

  // Sorts tasks in ascending order
  const sortTasksByCompletionTime = (tasks) => {
    return tasks.sort((a, b) => {
      const dateA = new Date(a.completed_at);
      const dateB = new Date(b.completed_at);
      return dateA - dateB;
    });
  };

  // Extracts the Date portion of the tasks
  const separateTasksByDate = (tasks) => {
    const tasksByDate = {};

    tasks.forEach((task) => {
      if (task.is_complete && task.completed_at) {
        const dateOnly = task.completed_at.split(" ")[0];
        if (!tasksByDate[dateOnly]) {
          tasksByDate[dateOnly] = [];
        }
        tasksByDate[dateOnly].push(task);
      }
    });

    return tasksByDate;
  };

  // Checks if there are three consecutive days within the input dates
  const hasThreeConsecutiveDays = (tasksByDate) => {
    if (tasksByDate.length < 3) {
      return false;
    }

    for (let i = 0; i <= tasksByDate.length - 3; i++) {
      const date1 = new Date(tasksByDate[i]);
      const date2 = new Date(tasksByDate[i + 1]);
      const date3 = new Date(tasksByDate[i + 2]);

      const diff1 = (date2 - date1) / 86400000;
      const diff2 = (date3 - date2) / 86400000;

      // checks if both differences are exactly 1 day (consecutive days)
      if (diff1 === 1 && diff2 === 1) {
        return true;
      }
    }

    return false;
  };

  // Checks if there are six consecutive days within the input dates
  const hasSixConsecutiveDays = (tasksByDate) => {
    if (tasksByDate.length < 6) {
      return false;
    }

    for (let i = 0; i <= tasksByDate.length - 6; i++) {
      const date1 = new Date(tasksByDate[i]);
      const date2 = new Date(tasksByDate[i + 1]);
      const date3 = new Date(tasksByDate[i + 2]);
      const date4 = new Date(tasksByDate[i + 3]);
      const date5 = new Date(tasksByDate[i + 4]);
      const date6 = new Date(tasksByDate[i + 5]);

      const diff1 = (date2 - date1) / 86400000;
      const diff2 = (date3 - date2) / 86400000;
      const diff3 = (date4 - date3) / 86400000;
      const diff4 = (date5 - date4) / 86400000;
      const diff5 = (date6 - date5) / 86400000;

      // checks if all differences are exactly 1 day (consecutive days)
      if (
        diff1 === 1 &&
        diff2 === 1 &&
        diff3 === 1 &&
        diff4 === 1 &&
        diff5 === 1
      ) {
        return true;
      }
    }

    return false;
  };

  // checks to see whether user is eligible to get Rocket Rider badge
  const completeRocketRider = (tasks) => {
    // Step 1: Filter tasks completed before 5 PM
    const tasksBefore5PM = completeTaskBefore5PM(tasks);

    // Step 2: Sort the tasks
    const sortedTasksBefore5PM = sortTasksByCompletionTime(tasksBefore5PM);

    // Step 3: Separate the tasks by date
    const tasksByDate = separateTasksByDate(sortedTasksBefore5PM);

    // Step 4: Filter the dates with at least 5 tasks
    const datesWith5Tasks = Object.keys(tasksByDate).filter(
      (date) => tasksByDate[date].length >= 5
    );

    // Step 5: Checks if there are 3 consecutive dates which has completed at least 5 tasks from the previous functions result
    return hasThreeConsecutiveDays(datesWith5Tasks);
  };

  // checks to see whether user is eligible to get Galactic Traveler badge
  const completeGalacticTraveler = (tasks) => {
    // Step 1: Filter tasks completed before 5 PM
    const tasksBefore5PM = completeTaskBefore5PM(tasks);

    // Step 2: Sort the tasks
    const sortedTasksBefore5PM = sortTasksByCompletionTime(tasksBefore5PM);

    // Step 3: Separate tasks by date
    const tasksByDate = separateTasksByDate(sortedTasksBefore5PM);

    // Step 4: Filter the dates with at least 10 tasks
    const datesWith5Tasks = Object.keys(tasksByDate).filter(
      (date) => tasksByDate[date].length >= 10
    );

    // Step 5: Checks if there are 6 consecutive dates which has completed at least 5 tasks from the previous functions result
    return hasSixConsecutiveDays(datesWith5Tasks);
  };

  // checks to see whether user is eligible to get Star Seeker badge
  const checkUrgentTasksInLast5Days = (tasks) => {
    // Get today's date and calculate the date 5 days ago
    const today = new Date();
    const fiveDaysAgo = new Date(today);
    fiveDaysAgo.setDate(today.getDate() - 5);

    // Filter for urgent tasks completed within the last 5 days
    const urgentTasksInLast5Days = tasks.filter((task) => {
      const isUrgent = task.task_category === "urgent";
      const completedAt = new Date(task.completed_at);
      return isUrgent && completedAt >= fiveDaysAgo && completedAt <= today;
    });

    // Checks if there are at least 3 such tasks
    return urgentTasksInLast5Days.length >= 3;
  };

  return (
    <div className="badges w-100" style={{ marginBottom: "5%" }}>
      <button
        type="button ms-0"
        className="help-button position-absolute me-5 mt-1 text-white"
        onClick={handleShow}
      >
        ❔
      </button>
      <h1 className="text-center">Badges</h1>
      <div
        className="badge-img-cont"
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {badges.map((badge, index) => (
          <div key={index} className="badge-item">
            <img
              src={badge.badge_description}
              alt={badge.alt}
              className="img-fluid"
            />
          </div>
        ))}
      </div>
      {show && (
        <ModalPopup
          type="none"
          showModal={show}
          handleCloseModal={handleClose}
          title={"What are badges?"}
          content={
            "Badges are rewards earned by completing specific missions below, each representing a significant achievement or milestone. To redeem your rewards, simply take a screenshot of your earned badge and send it via email shown in the help section of the app, oh and don't forget to write in your username! Upon verification, your reward will be processed and given accordingly."
          }
        />
      )}
    </div>
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

  const handleComplete = async (taskId) => {
    try {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      const hours = String(today.getHours()).padStart(2, "0");
      const minutes = String(today.getMinutes()).padStart(2, "0");
      const seconds = String(today.getSeconds()).padStart(2, "0");
      const completedAt = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      await axios.put(
        `http://localhost:3001/api/tasks/${taskId}`,
        { is_complete: true, completed_at: completedAt },
        { withCredentials: true }
      );
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const incompleteTasks = tasks.filter((task) => !task.is_complete);

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
                {incompleteTasks.length > 0 ? (
                  incompleteTasks.map((task) => (
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
                      onComplete={handleComplete}
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
            <p style={{ fontSize: "12px" }}>
              Note your TO-DOs and keep in check!
            </p>
            {/* Badges */}
            <Badges tasks={tasks} />
            <Mission />
          </Col>
        </Row>
      </div>
    </>
  );
}
