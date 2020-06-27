import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { UpdateActivityTickers } from "./../Actions/Actions";
import { ExploreReward } from "../Rewards";
import { Col, Row, Container, Button } from "react-bootstrap";
import { Line } from "rc-progress";
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
        if (ticker.isRunning && ticker.extra === location) {
            setTicker({...ticker, tick: 0, isRunning: false, extra: "None"});
            return;
        }
        
        if (ticker.isRunning && ticker.extra !== location) {
            setTicker({...ticker, tick: 0, extra: location});
            return;
        }

        setTicker({...ticker, activity: "Explore", extra: location, isRunning: true});
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
                    <Line percent={ticker.tick} strokeWidth="2" strokeColor={ticker.tick >= 100 ? "green" : "red"}/>
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

