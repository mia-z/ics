import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { TickTimer } from "./../Actions/Actions";
import { ExploreReward } from "../Rewards";
import { Col, Row, Container, Button } from "react-bootstrap";
import { Line } from "rc-progress";
import "../styles/explore.scss";
import useInterval from '../Hooks/useTimeout';
import Timer from "../Objects/Timer";

const mapStateToProps = (...state) => { 
    return { 
        globalTicker: state[0].globalTicker
    }
}

const mapDispatchToProps = {
    TickTimer,
}

const Explore = (props) => {
    const [backgroundActivities] = useState(props.backgroundActivities);
    const [ticker, setTicker] = useState(new Timer("null", "None"));
    useInterval(() => {
        if (ticker.isRunning) {
            setTicker({...ticker, tick: ticker.tick += 1});
            if (ticker.tick >= 100) {
                setTicker({...ticker, tick: 0});
                ExploreReward(ticker.extra);
            }
        }
    }, 35);

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

    useEffect(() => {
        let updatedActivities = backgroundActivities
            .filter(item => {
                if (item.activity === "Explore") {
                    setTicker(item);
                } else return item;
        });
        if (updatedActivities !== backgroundActivities)
            props.updateBackground("remove", updatedActivities);
        return () => {
            if (ticker.isRunning) {
                props.updateBackground("add", ticker);
            }
        }
    }, [ticker]);

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

