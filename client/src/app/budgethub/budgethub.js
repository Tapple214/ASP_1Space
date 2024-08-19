import React, { useState } from 'react';
import NavBar from '../../components/navbar/navbar';
import './budgethub.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import food from '../../components/json/food.json';
import shop from '../../components/json/shop.json';
import place from '../../components/json/place.json';

import Slider from "react-slick";
import { Modal, Button } from 'react-bootstrap';

export default function BudgetHub() {
    const [showModal, setShowModal] = useState({ category: null, index: null });

    const handleShow = (category, index) => setShowModal({ category, index });
    const handleClose = () => setShowModal({ category: null, index: null });

    let foodArr = food;
    let shopArr = shop;
    let placeArr = place;

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
                    arrows: true
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: true
                },
            },
        ]
      };

    const renderModal = (category, eachCard, index) => (
        <Modal show={showModal.category === category && showModal.index === index} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{eachCard.name}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <img 
                    src={eachCard.image}  
                    alt={eachCard.alt}
                    className='photoModal' 
                />
                <p>{eachCard.description}</p>
                <p>Location: {eachCard.location}</p>
                <p>Opening Times: {eachCard.details}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button href={eachCard.link}>
                    Link
                </Button>
            </Modal.Footer>
        </Modal>
    );

    return (
        <>
            <NavBar />
            <div className='left'>
                <br></br>
                <h2 className='heading'>Food</h2>
                <br></br>
                <div className="slider">
                    <Slider {...settings}>
                        {foodArr.map((eachCard, index) => (
                            <React.Fragment key={index}>
                                <img 
                                    className="photoAlbum" 
                                    src={eachCard.image} 
                                    alt={eachCard.alt}
                                    onClick={() => handleShow('food', index)} 
                                    style={{ cursor: 'pointer' }} 
                                />
                                {renderModal('food', eachCard, index)}
                            </React.Fragment>
                        ))}
                    </Slider>
                </div>

                <h2 className='heading'>Shop</h2>
                <br></br>
                <div className="slider">
                    <Slider {...settings}>
                        {shopArr.map((eachCard, index) => (
                            <React.Fragment key={index}>
                                <img 
                                    className="photoAlbum" 
                                    src={eachCard.image} 
                                    alt={eachCard.alt}
                                    onClick={() => handleShow('shop', index)} 
                                    style={{ cursor: 'pointer' }} 
                                />
                                {renderModal('shop', eachCard, index)}
                            </React.Fragment>
                        ))}
                    </Slider>
                </div>

                <h2 className='heading'>Place</h2>
                <br></br>
                <div className="slider">
                    <Slider {...settings}>
                        {placeArr.map((eachCard, index) => (
                            <React.Fragment key={index}>
                                <img 
                                    className="photoAlbum" 
                                    src={eachCard.image} 
                                    alt={eachCard.alt}
                                    onClick={() => handleShow('place', index)} 
                                    style={{ cursor: 'pointer' }} 
                                />
                                {renderModal('place', eachCard, index)}
                            </React.Fragment>
                        ))}
                    </Slider>
                </div>
            </div>
        </>
    );
};

