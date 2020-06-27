import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { UpdateActivityTickers } from "./../Actions/Actions";
import { Col, Row, Container, Button } from "react-bootstrap";
import { ProgressBar } from "./StyleComponents/ProgressBar";
import "../styles/explore.scss";
import Timer from "../Objects/Timer";

const mapStateToProps = (...state) => { 
    return { 
        globalTicker: state[0].globalTicker,
        activityTickers: state[0].activityTickers
    }
}

const mapDispatchToProps = {
    UpdateActivityTickers,
}

const Explore = (props) => {
    const [activityTickers] = useState(props.activityTickers);
    const [ticker, setTicker] = useState(new Timer("Explore", "None"));

    useEffect(() => {
        console.log(activityTickers);
        if (activityTickers.some(item => item.activity === "Explore")) {
            setTicker(activityTickers.find(ticker => ticker.activity === "Explore"));
        }
    }, [activityTickers])

    useEffect(() => {
        if (ticker.extra === "None") {
            let updatedActs = activityTickers.filter(item => item.activity !== "Explore");
            props.UpdateActivityTickers(updatedActs);
        } else {
            let updatedActs = activityTickers.filter(item => item.activity !== "Explore");
            props.UpdateActivityTickers([...updatedActs, ticker]);
        }
    }, [ticker])

    const HandleExploreClick = (location) => {
        if (ticker.isRunning && ticker.extra === location) 
            return setTicker(new Timer("Explore", "None"));
        
        if (ticker.extra !== location) {
            switch(location) {
                case "Villages": return setTicker(new Timer("Explore", location, 100, true));
                case "Farmlands": return setTicker(new Timer("Explore", location, 200, true));
                case "Forest": return setTicker(new Timer("Explore", location, 350, true));
                case "Desert": return setTicker(new Timer("Explore", location, 600, true));
            }
        }
    }

    return(
        <>
        <h3>Explore new areas</h3>
        <h4>Currently exploring: {ticker.extra}</h4>
        <Container>
            <Row>
            {
                Locations.map((location, key) => (
                    <Col key={key} md={4} className="px-3 py-1">
                        <Button 
                            block 
                            variant={ticker.extra === location ? "success" : "primary"}
                            onClick={() => HandleExploreClick(location)}
                        >{location}</Button>
                    </Col>
                ))
            }
            </Row>
            { ticker.isRunning &&
            <div className="progress-container">
                <h5>Exploring...</h5>
                <div className="px-3">
                    <ProgressBar total={ticker.resetTick} value={ticker.tick} bgColor="red" />
                </div>
                {/* <Button variant="primary" onClick={() => StopExplore()}>Stop</Button> */}
            </div>
            }
        </Container>
        </>
    );
}

const Locations = [
    "Villages", "Farmlands", "Forest", "Desert"
]

export default connect(mapStateToProps, mapDispatchToProps)(Explore);

