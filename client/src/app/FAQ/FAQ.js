import React, { useState } from "react";
import NavBar from "../../components/navbar/navbar";
import CarouselComponent from "./Carousel";
import "./FAQ.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <NavBar />
      <div className="faq-page">
        <div className="header-container">
          <h1>Help</h1>
        </div>
        <div className="content">
          {/* Carousel Section */}
          <div className="carousel-section">
            <CarouselComponent />
          </div>

          {/* FAQ Section */}
          <div className="faq-container">
            <h2>FAQ</h2>
            {faqData.map((item, index) => (
              <div className="faq-item" key={index}>
                <div className="faq-question" onClick={() => toggleFAQ(index)}>
                  <h3>{item.question}</h3>
                  <span className="toggle-icon">
                    {activeIndex === index ? "-" : "+"}
                  </span>
                </div>
                {activeIndex === index && (
                  <p className="faq-answer">{item.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const faqData = [
  {
    question: "What is 1Space?",
    answer:
      "At 1Space, we make sure to provide a thorough web application that aids students by emphasizing organization, drive, productivity and financial wellness. Our aim is to effectively include these fundamental aspects into a unified platform, catering to the diverse requirements of students. We hope to improve or support the student experience by combining these essential elements into an intuitive interface, encouraging a budget-conscious, socially aware and well-organized way of everyday living.",
  },
  {
    question: "Can I make a custom category for my tasks?",
    answer:
      'Yes, it is possible to make individual categories for your tasks on 1Space. Choose the "Add Category" option after navigating to the Task Manager page. Enter the name of your new category, then save it. When this custom category is created, you can attach tasks to it in order to properly organize your to-do list based on your requirements.',
  },
  {
    question: "How do I filter and sort deals and events to find what I need?",
    answer:
      "On the budget hub page, you can modify your viewings by utilizing the filters and sorting tools. Using filters, you may focus your search on specific categories, such as the type of event or deal (food, clothes, entertainment). You can organize the results using the sorting feature according to relevance, date, or popularity.",
  },
  {
    question: "Can I edit or delete a transaction?",
    answer:
      'Yes, navigate to the Finance page, find the transaction you wish to edit or delete, and then make your changes. To view the transaction details, click on it. Options to edit or delete the transaction will be visible to you. Choose "Delete" to remove the transaction, or select "Edit" to modify the transaction.',
  },
  {
    question: "How do I know if a deal is still valid?",
    answer:
      "Browse through the details of the deal on the Budget Hub to see if it is still available. The validity period or date of expiration is displayed on each deal card. You may also utilize the hyperlinks provided to the official deal site or social media accounts to verify the current status of the deal in real-time.",
  },
];

export default FAQ;
