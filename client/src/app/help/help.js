import React, { useState } from "react";
import CarouselComponent from "../../components/carousel/Carousel";
import "./help.css";
import "../home/Home.css";
import faqData from "../../components/json/faqData.json";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="d-flex flex-column  p-3">
      <img
        src="./images/astronaut.png"
        className="position-absolute z-3"
        style={{ top: "15px", right: "20px" }}
        width={"200"}
        height={"200"}
      />
      <div className="App p-3">
        <div className="header-container card p-4 rounded-4 bg-img mb-5 mt-3">
          <h1 className="fw-bold">Help</h1>
        </div>

        <div className="ms-3 m-0 p-0 mx-auto">
          <div className="row w-100 g-4">
            {/* Carousel Section */}
            <div
              className="col-12 col-lg-8 p-0 m-0 mt-4"
              style={{ zIndex: "1000" }}
            >
              <CarouselComponent />
            </div>

            {/* FAQ Section */}
            <div className="col-xs-12 col-md-12 col-lg-4 p-0 ps-3">
              <h2 className="fw-bold text-center">FAQ</h2>
              {faqData.map((item, index) => (
                <div
                  className="faq-item p-3 mb-3 card rounded-4 bg-opacity-10"
                  key={index}
                >
                  <div
                    className="faq-question"
                    onClick={() => toggleFAQ(index)}
                  >
                    <p className="m-0">{item.question}</p>
                    <span className="toggle-icon">
                      {activeIndex === index ? "-" : "+"}
                    </span>
                  </div>
                  {activeIndex === index && (
                    <p className="faq-answer m-0 opacity-75">{item.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
