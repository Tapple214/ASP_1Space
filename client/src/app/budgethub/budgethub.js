import React, { useState } from "react";
import NavBar from "../../components/navbar/navbar";
import "./budgethub.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import food from "../../components/json/food.json";
import shop from "../../components/json/shop.json";
import place from "../../components/json/place.json";

import Slider from "react-slick";
import { Modal, Button } from "react-bootstrap";

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
    <Modal
      show={showModal.category === category && showModal.index === index}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>{eachCard.name}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <img src={eachCard.image} alt={eachCard.alt} className="photoModal" />
        <p>{eachCard.description}</p>
        <p>Location: {eachCard.location}</p>
        <p>Opening Times: {eachCard.details}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button href={eachCard.link}>Link</Button>
      </Modal.Footer>
    </Modal>
  );

  // Slider component
  const CategorySlider = ({ items, category }) => (
    <div className="slider" style={{ width: isOpen ? "80%" : "95%" }}>
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
        <br />
        <h2
          className="heading text-white ms-3 p-2 px-3 rounded-4 fw-bold"
          style={{ width: "fit-content" }}
        >
          Food and Beverages
        </h2>
        <br />
        <CategorySlider items={food} category="food" />

        <h2
          className="heading mt-5 text-white ms-3 p-2 px-3 rounded-4 fw-bold"
          style={{ width: "fit-content" }}
        >
          Shop
        </h2>
        <br />
        <CategorySlider items={shop} category="shop" />

        <h2
          className="heading mt-5 text-white ms-3 p-2 px-3 rounded-4 fw-bold"
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
