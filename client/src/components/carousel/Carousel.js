import React, { useState } from "react";
import "./Carousel.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const CarouselComponent = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleMoreInfoClick = (index) => {
    setActiveIndex(index);
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
  };

  const carouselItems = [
    {
      src: "/images/login.jpg",
      alt: "First slide",
      title: "Login",
      text: "1Space's Login page offers users an easy and safe way to access their accounts. Users are to fill in the fields of email address and password, and these credentials are eventually saved. Users can click on the 'Forgot Password' button to gain reset instructions and help with password recovery. With an intuitive layout and necessary links for account administration, the page is made to be easily navigated.",
    },
    {
      src: "/images/dashboard.jpg",
      alt: "Second slide",
      title: "Dashboard",
      text: "The Dashboard page provides an overview of your task productivity and a summary of your financial status. It has direct links to the Task Manager, Finance Board, and Budget Hub pages. It also includes recent deals or events and daily motivational quotes.",
    },
    {
      src: "/images/dashboard.jpg",
      alt: "Third slide",
      title: "Task Manager",
      text: "On the Task Manager page, you may create, categorize, prioritize, edit, and delete your tasks. For every task, you can set reminders and due dates through notifications. To organize your tasks according to categories, priority, or type of task, you can use labels. You can monitor your progress by ticking off the tasks you've finished. You can also earn various badges based on the missions you have completed.",
    },
    {
      src: "/images/dashboard.jpg",
      alt: "Fourth slide",
      title: "Finance Board",
      text: "On our Finance Board page, you can track your income and expenses, as well as get a financial summary that shows you exactly how much you have already spent and how much is left. Utilize the categorization function to assign labels and arrange your spendings. Pie charts can also be used to visualize your expenses, broken down into categories.",
    },
    {
      src: "/images/dashboard.jpg",
      alt: "Fifth slide",
      title: "Budget Hub",
      text: "Here, the most recent local events as well as the greatest offers and savings on dining, apparel, entertainment, and other items can be found on the Budget Hub page. Your interests are taken into consideration when suggesting events, so you are never missing out on fascinating local events. Every deal is shown on a card with complete information and direct links to social media profiles are provided for further information. To offer the newest and the best deals, this page is updated on a regular basis.",
    },
  ];

  return (
    <div>
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {carouselItems.map((item, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={index}
            >
              <div className="d-flex">
                <h3 className="fw-bold pb-1">{item.title}</h3>
                &nbsp; &nbsp;
                <button
                  className="more-info justify-content-center align-items-center p-0 mt-1 rounded-3 px-3 text-white border-0"
                  onClick={() => handleMoreInfoClick(index)}
                >
                  <p className="m-0 fw-bold">More Info</p>
                </button>
              </div>

              <img
                src={item.src}
                className="d-block w-100 rounded-4"
                alt={item.alt}
              />
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {showOverlay && (
        <div className="overlay" onClick={handleCloseOverlay}>
          <div className="overlay-content">
            <h3>{carouselItems[activeIndex].title}</h3>
            <p>{carouselItems[activeIndex].text}</p>
            <button className="btn btn-secondary" onClick={handleCloseOverlay}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarouselComponent;
