import React from 'react';
import "../styles/mining.scss";
import { connect } from "react-redux";
import { UpdateActivityTickers, UpdateWorkers } from "./../Actions/Actions";
import { Container, Row, Col, ButtonGroup, Button } from "react-bootstrap";
import { Line } from "rc-progress";
import { GetImages } from "../ImageRepo";
import Timer from "../Objects/Timer";

const mapStateToProps = (state) => { 
    return { 
        globalTicker: state.globalTicker,
        activityTickers: state.activityTickers,
        miningTickers: {
            "Coal": state.activityTickers.some(x => x.activity === "Mining" && x.extra === "Coal") ? 
                state.activityTickers.find(x => x.activity === "Mining" && x.extra === "Coal") : new Timer("Mining", "Coal"),
            "Copper": state.activityTickers.some(x => x.activity === "Mining" && x.extra === "Copper") ? 
                state.activityTickers.find(x => x.activity === "Mining" && x.extra === "Copper") : new Timer("Mining", "Copper"),
            "Tin": state.activityTickers.some(x => x.activity === "Mining" && x.extra === "Tin") ? 
                state.activityTickers.find(x => x.activity === "Mining" && x.extra === "Tin") : new Timer("Mining", "Tin"),
            "Iron": state.activityTickers.some(x => x.activity === "Mining" && x.extra === "Iron") ? 
                state.activityTickers.find(x => x.activity === "Mining" && x.extra === "Iron") : new Timer("Mining", "Iron"),
            "Silver": state.activityTickers.some(x => x.activity === "Mining" && x.extra === "Silver") ? 
                state.activityTickers.find(x => x.activity === "Mining" && x.extra === "Silver") : new Timer("Mining", "Silver"),
            "Gold": state.activityTickers.some(x => x.activity === "Mining" && x.extra === "Gold") ? 
                state.activityTickers.find(x => x.activity === "Mining" && x.extra === "Gold") : new Timer("Mining", "Gold")
        },
        availableWorkers: state.user.workers
    }
}

const mapDispatchToProps = {
    UpdateActivityTickers,
    UpdateWorkers
}

export const Mining = (props) => {
    const images = GetImages(OreTypes);

    const HandleMinusClick = (ore) => { //MAYBE BATCH THESE TO REDUCE RERENDERS
        props.UpdateWorkers(props.availableWorkers + 1);
        let updatedState =  props.activityTickers.filter(x => x.extra !== ore);
        let oreToUpdate = props.activityTickers.find(x => x.extra === ore);
        if (oreToUpdate.activeWorkers - 1 === 0) 
            return props.UpdateActivityTickers([...updatedState]);
        return props.UpdateActivityTickers([...updatedState, {...oreToUpdate, activeWorkers: oreToUpdate.activeWorkers -= 1}]);
    }

    const HandlePlusClick = (ore) => { //MAYBE BATCH THESE TO REDUCE RERENDERS
        props.UpdateWorkers(props.availableWorkers - 1);
        let updatedState =  props.activityTickers.filter(x => x.extra !== ore);
        let oreToUpdate = props.activityTickers.find(x => x.extra === ore);
        if (!oreToUpdate) 
            return props.UpdateActivityTickers([...updatedState, {...props.miningTickers[ore], activeWorkers: 1}]);
        return props.UpdateActivityTickers([...updatedState, {...oreToUpdate, activeWorkers: oreToUpdate.activeWorkers += 1}]);
    }

    const percent = (value, total) => (value / total) * 100;

    return(
        <Container fluid>
            <Row>
                <Col>
                    <h3>Available Miners: {props.availableWorkers}</h3>
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
                                    <Button variant="danger" disabled={props.availableWorkers < 1 && props.miningTickers[ore.ImageName].activeWorkers > 0 ? "" : true ? props.availableWorkers < 1 ? true : props.miningTickers[ore.ImageName].activeWorkers < 1 ? true : "" : "" } onClick={() => HandleMinusClick(ore.ImageName)}>Remove</Button>
                                    <Button variant="success" disabled={props.availableWorkers < 1 ? true : "" } onClick={() => HandlePlusClick(ore.ImageName)}>Add</Button>
                                </ButtonGroup>
                            </Col>
                            <Col md={12}>
                                <p>Current workers: {props.miningTickers[ore.ImageName].activeWorkers}</p>
                            </Col>
                            <Col md={10}>
                                <div style={{height: "30px"}}>
                                    <Line percent={percent(props.miningTickers[ore.ImageName].tick, props.miningTickers[ore.ImageName].resetTick)} strokeWidth="2" strokeColor="#333" />
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