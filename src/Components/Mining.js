import React, { useState, useEffect } from 'react';
import "../styles/mining.scss";
import { Container, Row, Col, ButtonGroup, Button } from "react-bootstrap";
import { GetImages } from "../ImageRepo";
import useInterval from '../Hooks/useTimeout';

export const Mining = () => {
    const images = GetImages(OreTypes);

    const [timers, setTimers] = useState([]);
    useInterval(() => {
        if (timers.length != 0) {

        }
    }, 35)

    const HandleMinusClick = (ore) => {

    }

    const HandlePlusClick = (ore) => {
        
    }

    return(
        <Container fluid>
            <Row>
            {images.map((ore, key) => (
                <Col key={key} md={4}>
                    <div className="card">
                        <Row className="justify-content-center">
                            <Col md={12}>
                                <h5>
                                    {ore.ImageName}
                                </h5>
                            </Col>
                            <Col md={12}>
                                <img src={ore.ImageUrl} alt={ore.ImageName} />
                            </Col>
                            <Col md={12}>
                                <ButtonGroup className="w-100 px-2 pb-2">
                                    <Button onClick={HandleMinusClick(ore.ImageName)}>Remove</Button>
                                    <Button onClick={HandlePlusClick(ore.ImageName)}>Add</Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </div>
                </Col>                
            ))}
            </Row>
        </Container>
    );
}

const OreTypes = [
    "Coal", "Copper", "Tin", "Iron", "Silver", "Gold"
];

export default Mining;