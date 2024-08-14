//import React from 'react';
import NavBar from '../../components/navbar/navbar';
import './budgethub.css';

import food from '../../components/json/food.json';
import shop from '../../components/json/shop.json';
import place from '../../components/json/place.json';

import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function BudgetHub() {
    const [showModal, setShowModal] = useState({ category: null, index: null });

    const handleShow = (category, index) => setShowModal({ category, index });
    const handleClose = () => setShowModal({ category: null, index: null });

    let foodArr = food;
    let shopArr = shop;
    let placeArr = place;

    const renderModal = (category, eachCard, index) => (
        <Modal show={showModal.category === category && showModal.index === index} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{eachCard.name}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <img 
                    src={eachCard.image}  
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
                <h1 className='heading'>Food</h1>
                <br></br>
                {foodArr.map((eachCard, index) => (
                    <React.Fragment key={index}>
                        <img 
                            className="photoAlbum" 
                            src={eachCard.image} 
                            onClick={() => handleShow('food', index)} 
                            style={{ cursor: 'pointer' }} 
                        />
                        {renderModal('food', eachCard, index)}
                    </React.Fragment>
                ))}

                <br></br>
                <h1 className='heading'>Shop</h1>
                <br></br>
                {shopArr.map((eachCard, index) => (
                    <React.Fragment key={index}>
                        <img 
                            className="photoAlbum" 
                            src={eachCard.image} 
                            onClick={() => handleShow('shop', index)} 
                            style={{ cursor: 'pointer' }} 
                        />
                        {renderModal('shop', eachCard, index)}
                    </React.Fragment>
                ))}

                <br></br>
                <h1 className='heading'>Place</h1>
                <br></br>
                {placeArr.map((eachCard, index) => (
                    <React.Fragment key={index}>
                        <img 
                            className="photoAlbum" 
                            src={eachCard.image} 
                            onClick={() => handleShow('place', index)} 
                            style={{ cursor: 'pointer' }} 
                        />
                        {renderModal('place', eachCard, index)}
                    </React.Fragment>
                ))}
            </div>
        </>
    );
};

