import React from "react";
import "./Carousel.css";
import "bootstrap/dist/css/bootstrap.min.css";

import loginImage from "./images/login.jpg";
import dashboardImage from "./images/dashboard.jpg";
import taskManagerImage from "./images/taskManager.jpg";
import financeBoardImage from "./images/financeBoard.jpg";
import budgetHubImage from "./images/budgetHub.jpg";

const CarouselComponent = () => {
  return (
    <div
      id="carouselExampleCaptions"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="3"
          aria-label="Slide 4"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="4"
          aria-label="Slide 5"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={loginImage} className="d-block w-100" alt="First slide" />
          <div className="carousel-caption">
            <h3>Login</h3>
            <p>
              1Space's Login page offers users an easy and safe way to access
              their accounts. Users are to fill in the fields of email address
              and password, and these credentials are eventually saved. Users
              can click on the "Forgot Password" button to gain reset
              instructions and help with password recovery. With an intuitive
              layout and necessary links for account administration, the page is
              made to be easily navigated.
            </p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src={dashboardImage}
            className="d-block w-100"
            alt="Second slide"
          />
          <div className="carousel-caption">
            <h3>Dashboard</h3>
            <p>
              The Dashboard page provides an overview of your task productivity
              and a summary of your financial status. It has direct links to the
              Task Manager, Finance Board and Budget Hub pages. It also includes
              recents deals or events and daily motivational quotes.
            </p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src={taskManagerImage}
            className="d-block w-100"
            alt="Third slide"
          />
          <div className="carousel-caption">
            <h3>Task Manager</h3>
            <p>
              On the Task Manager page, you may create, categorize, prioritize,
              edit and delete your tasks . For every task, you can set reminders
              and due dates through notifications. To organize your tasks
              according to categories, priority, or type of task, you can use
              labels. You can monitor your progress by ticking off the tasks
              you've finished. You can also earn various badges based on the
              missions you have completed.
            </p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src={financeBoardImage}
            className="d-block w-100"
            alt="Fourth slide"
          />
          <div className="carousel-caption">
            <h3>Finance Board</h3>
            <p>
              On our Finance Board page, you can track your income and expenses,
              as well as get a financial summary that shows you exactly how much
              you have already spent and how much is left. Utilize the
              categorization function to assign labels and arrange your
              spendings. Pie charts can also be used to visualize your expenses,
              broken down into categories.
            </p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src={budgetHubImage}
            className="d-block w-100"
            alt="Fifth slide"
          />
          <div className="carousel-caption">
            <h3>Bugdet Hub</h3>
            <p>
              Here, the most recent local events as well as the greatest offers
              and savings on dining, apparel, entertainment, and other items can
              be found on the Budget Hub page. Your interests are taken into
              consideration when suggesting events, so you are never missing out
              on fascinating local events. Every deal is shown on a card with
              complete information and direct links to social media profiles are
              provided for further information. To offer the newest and the best
              deals, this page is updated on a regular basis.
            </p>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default CarouselComponent;
