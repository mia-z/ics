import React, { useState, useEffect } from 'react';
import "../styles/mining.scss";
import { connect } from "react-redux";
import { UpdateActivityTickers } from "./../Actions/Actions";
import { Container, Row, Col, ButtonGroup, Button } from "react-bootstrap";
import { Line } from "rc-progress";
import { GetImages } from "../ImageRepo";
import useInterval from '../Hooks/useTimeout';
import Timer from "../Objects/Timer";

const mapStateToProps = (...state) => { 
    return { 
        globalTicker: state[0].globalTicker,
        activityTickers: state.activityTickers
    }
}

const mapDispatchToProps = {
    UpdateActivityTickers
}

export const Mining = (props) => {
    const images = GetImages(OreTypes);

    const initialTimers = {
        "Coal": { name: "Coal", activeWorkers: 0, tick: 0 },
        "Copper": { name: "Copper", activeWorkers: 0, tick: 0 },
        "Tin": { name: "Tin", activeWorkers: 0, tick: 0 },
        "Iron": { name: "Iron", activeWorkers: 0, tick: 0 },
        "Silver": { name: "Silver", activeWorkers: 0, tick: 0 },
        "Gold": { name: "Gold", activeWorkers: 0, tick: 0 },
    }

    const [timers, setTimers] = useState(initialTimers);
    const [availableWorkers, setAvailableWorkers] = useState(5);
    const [backgroundActivities] = useState(props.backgroundActivities);
    useInterval(() => {
        if (Object.values(timers).some(item => {
                if (item.activeWorkers > 0) {
                    //console.log(`${item.name} has ${item.activeWorkers}`);
                    HandleTick(item.name);
                }
        }));
    }, 40)

    const HandleMinusClick = (ore) => {
        setAvailableWorkers(availableWorkers + 1); 
        setTimers({...timers, 
            [ore]: {...timers[ore], activeWorkers: timers[ore].activeWorkers -= 1 }});
    }

    const HandlePlusClick = (ore) => {
        setAvailableWorkers(availableWorkers - 1); 
        setTimers({...timers, 
            [ore]: {...timers[ore], activeWorkers: timers[ore].activeWorkers += 1 }});
    }

    const HandleTick = (tickerName) => {
        if (timers[tickerName].tick + 1 > 100)
            setTimers({...timers, [tickerName]: { ...timers[tickerName], tick: timers[tickerName].tick = 0}});
        else
            setTimers({...timers, [tickerName]: { ...timers[tickerName], tick: timers[tickerName].tick += 1}});
    }

    useEffect(() => {
        console.log("mounted", backgroundActivities);
        let updatedActivities = backgroundActivities
            .filter(item => {
                if (item.activity === "Mining") {
                    setTimers({...timers, [item.extra]: { ...timers[item.extra], tick: timers[item.extra].tick = 0}});
                    console.log(`added ${item.extra} from background, starting at tick ${item.tick}`);
                } else return item;
        });
        if (updatedActivities !== backgroundActivities)
            props.updateBackground("remove", updatedActivities);
        return () => {
            console.log("unmounted", backgroundActivities);
            if (Object.values(timers).some(item => {
                if (item.activeWorkers > 0) {
                    let timerToAdd = new Timer("Mining", item.name);
                    timerToAdd.activeWorkers = item.activeWorkers;
                    timerToAdd.tick = item.tick;
                    props.updateBackground("add", timerToAdd);
                    console.log(`added ${timerToAdd} to background`);
                }
            }));
        }
    }, [timers]);

    return(
        <Container fluid>
            <Row>
                <Col>
                    <h3>Available Miners: {availableWorkers}</h3>
                </Col>
            </Row>
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
                                    <Button disabled={availableWorkers < 1 && timers[ore.ImageName].activeWorkers > 1 ? "" : true ? availableWorkers < 1 ? true : timers[ore.ImageName].activeWorkers < 1 ? true : "" : "" } onClick={() => HandleMinusClick(ore.ImageName)}>Remove</Button>
                                    <Button disabled={availableWorkers < 1 ? true : "" } onClick={() => HandlePlusClick(ore.ImageName)}>Add</Button>
                                </ButtonGroup>
                            </Col>
                            <Col md={12}>
                                <p>Current workers: {timers[ore.ImageName].activeWorkers}</p>
                            </Col>
                            <Col md={10}>
                                <div style={{height: "30px"}}>
                                    <Line percent={timers[ore.ImageName].tick} strokeWidth="2" strokeColor="brown"/>
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Mining);