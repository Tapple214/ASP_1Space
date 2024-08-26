import React, { useState } from "react";
import "./budgethub.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import food from "../../components/json/food.json";
import shop from "../../components/json/shop.json";
import place from "../../components/json/place.json";

import Slider from "react-slick";
import ModalPopup from "../../components/modal/modal";

export default function BudgetHub({ isOpen }) {
  // State to manage which modal is shown
  const [showModal, setShowModal] = useState({ category: null, index: null });

  // Handlers to show and hide modals
  const handleShow = (category, index) => setShowModal({ category, index });
  const handleClose = () => setShowModal({ category: null, index: null });

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
        },
      },
    ],
  };

  // Render a modal with details about each card
  const renderModal = (category, eachCard, index) => (
    <ModalPopup
      type="none"
      showModal={showModal.category === category && showModal.index === index}
      handleCloseModal={handleClose}
      title={<p className="fw-bold text-center m-0">{eachCard.name}</p>}
      content={
        <div className="d-flex flex-column justify-content-center align-items-center">
          <img
            src={eachCard.image}
            alt={eachCard.alt}
            className="photoModal mb-3 rounded-4"
          />
          <p className="mx-3 text-center">{eachCard.description}</p>
          <p className="text-center">
            <span className="fw-bold">Location:</span>
            <br />
            {eachCard.location}
          </p>
          <p className="text-center">
            <span className="fw-bold">Opening Times:</span>
            <br />
            {eachCard.details}
          </p>
        </div>
      }
    />
  );

  // Slider component
  const CategorySlider = ({ items, category }) => (
    <div
      className="slider"
      style={{
        width: isOpen ? "70vw" : "90vw",
      }}
    >
      <Slider {...settings}>
        {items.map((eachCard, index) => (
          <React.Fragment key={index}>
            <img
              className="photoAlbum"
              src={eachCard.image}
              alt={eachCard.alt}
              onClick={() => handleShow(category, index)}
              style={{ cursor: "pointer" }}
            />
            {renderModal(category, eachCard, index)}
          </React.Fragment>
        ))}
      </Slider>
    </div>
  );

  return (
    <>
      <div className="App">
        <h1 className="m-0 fw-bold ms-4 mt-3">Budget Hub</h1>
        <p className="m-0 ms-4" style={{ fontSize: "12px" }}>
          Catch the latest Singaporean budget deals!
        </p>

        <br />
        <h2
          className="heading ms-3 p-2 fw-bold mb-0"
          style={{ width: "fit-content" }}
        >
          Food and Beverages
        </h2>
        <br />
        <CategorySlider items={food} category="food" />

        <h2
          className="heading mt-3 ms-3 p-2 fw-bold mb-0"
          style={{ width: "fit-content" }}
        >
          Shop
        </h2>
        <br />
        <CategorySlider items={shop} category="shop" />

        <h2
          className="heading mt-3 ms-3 p-2 fw-bold mb-0"
          style={{ width: "fit-content" }}
        >
          Place
        </h2>
        <br />
        <CategorySlider items={place} category="place" />
      </div>
    </>
  );
}
