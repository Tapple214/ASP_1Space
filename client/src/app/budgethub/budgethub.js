//import React from 'react';
import NavBar from '../../components/navbar/navbar';
import './budgethub.css';

import food from '../../components/json/food.json';
import shop from '../../components/json/shop.json';
import place from '../../components/json/place.json';

import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const BudgetHub = () => {
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
                    // style={{ width: '50%', height: '50%' }}
                    className='photo' 
                />
                <p>{eachCard.description}</p>
                <p>Location: {eachCard.location}</p>
                <p>Opening Times: {eachCard.details}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button href={eachCard.link}>
                    Link
                </Button>

                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );

    return (
        <>
            <NavBar />
            <div className='left'>
                <h1>Food</h1>
                {foodArr.map((eachCard, index) => (
                    <React.Fragment key={index}>
                        <img 
                            className="photo" 
                            src={eachCard.image} 
                            onClick={() => handleShow('food', index)} 
                            style={{ cursor: 'pointer' }} 
                        />
                        {renderModal('food', eachCard, index)}
                    </React.Fragment>
                ))}

                <h1>Shop</h1>
                {shopArr.map((eachCard, index) => (
                    <React.Fragment key={index}>
                        <img 
                            className="photo" 
                            src={eachCard.image} 
                            onClick={() => handleShow('shop', index)} 
                            style={{ cursor: 'pointer' }} 
                        />
                        {renderModal('shop', eachCard, index)}
                    </React.Fragment>
                ))}

                <h1>Place</h1>
                {placeArr.map((eachCard, index) => (
                    <React.Fragment key={index}>
                        <img 
                            className="photo" 
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

export default BudgetHub;