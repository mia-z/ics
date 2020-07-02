import React from 'react';
import { connect } from "react-redux";
import { UpdateActivityTickers, UpdateWorkers } from "./../Actions/GlobalStateActions";
import { Container, Row, Col, ButtonGroup, Button } from "react-bootstrap";
import Timer from "../Objects/Timer";
import { Line } from "rc-progress";
import { GetImages } from "../ImageRepo";
import "../styles/woodcutting.scss";

const mapStateToProps = (state) => { 
    return { 
        globalTicker: state.GlobalState.globalTicker,
        activityTickers: state.GlobalState.activityTickers,
        woodTickers: {
            "Oak": state.GlobalState.activityTickers.some(x => x.activity === "Woodcutting" && x.extra === "Oak") ? 
                state.GlobalState.activityTickers.find(x => x.activity === "Woodcutting" && x.extra === "Oak") : new Timer("Woodcutting", "Oak"),
            "Ash": state.GlobalState.activityTickers.some(x => x.activity === "Woodcutting" && x.extra === "Ash") ? 
                state.GlobalState.activityTickers.find(x => x.activity === "Woodcutting" && x.extra === "Ash") : new Timer("Woodcutting", "Ash"),
            "Willow": state.GlobalState.activityTickers.some(x => x.activity === "Woodcutting" && x.extra === "Willow") ? 
                state.GlobalState.activityTickers.find(x => x.activity === "Woodcutting" && x.extra === "Willow") : new Timer("Woodcutting", "Willow"),
            "Ebony": state.GlobalState.activityTickers.some(x => x.activity === "Woodcutting" && x.extra === "Ebony") ? 
                state.GlobalState.activityTickers.find(x => x.activity === "Woodcutting" && x.extra === "Ebony") : new Timer("Woodcutting", "Ebony"),
        }, 
        availableWorkers: state.GlobalState.user.workers
    }
}

const mapDispatchToProps = {
    UpdateActivityTickers,
    UpdateWorkers
}

export const Woodcutting = (props) => {
    const images = GetImages(WoodTypes);

    const HandleMinusClick = (wood) => { //MAYBE BATCH THESE TO REDUCE RERENDERS
        props.UpdateWorkers(props.availableWorkers + 1);
        let updatedState =  props.activityTickers.filter(x => x.extra !== wood);
        let woodToUpdate = props.activityTickers.find(x => x.extra === wood);
        if (woodToUpdate.activeWorkers - 1 === 0) 
            return props.UpdateActivityTickers([...updatedState]);
        return props.UpdateActivityTickers([...updatedState, {...woodToUpdate, activeWorkers: woodToUpdate.activeWorkers -= 1}]);
    }

    const HandlePlusClick = (wood) => { //MAYBE BATCH THESE TO REDUCE RERENDERS
        props.UpdateWorkers(props.availableWorkers - 1);
        let updatedState =  props.activityTickers.filter(x => x.extra !== wood);
        let woodToUpdate = props.activityTickers.find(x => x.extra === wood);
        if (!woodToUpdate) 
            return props.UpdateActivityTickers([...updatedState, {...props.woodTickers[wood], activeWorkers: 1}]);
        return props.UpdateActivityTickers([...updatedState, {...woodToUpdate, activeWorkers: woodToUpdate.activeWorkers += 1}]);
    }

    const percent = (value, total) => (value / total) * 100;

    return(
        <Container fluid>
            <Row>
                <Col>
                    <h3>Available Workers: {props.availableWorkers}</h3>
                </Col>
            </Row>
            <Row>
            {images.map((wood, key) => (
                <Col key={key} md={4}>
                    <div className="card woodcutting">
                        <Row className="justify-content-center">
                            <Col md={12}>
                                <h5>
                                    {wood.ImageName}
                                </h5>
                            </Col>
                            <Col md={12}>
                                <img src={wood.ImageUrl} alt={wood.ImageName} />
                            </Col>
                            <Col md={12}>
                                <ButtonGroup className="w-100 px-2 pb-2">
                                    <Button variant="danger" disabled={props.availableWorkers < 1 && props.woodTickers[wood.ImageName].activeWorkers > 0 ? "" : true ? props.availableWorkers < 1 ? true : props.woodTickers[wood.ImageName].activeWorkers < 1 ? true : "" : "" } onClick={() => HandleMinusClick(wood.ImageName)}>Remove</Button>
                                    <Button variant="success" disabled={props.availableWorkers < 1 ? true : "" } onClick={() => HandlePlusClick(wood.ImageName)}>Add</Button>
                                </ButtonGroup>
                            </Col>
                            <Col md={12}>
                                <p>Current workers: {props.woodTickers[wood.ImageName].activeWorkers}</p>
                            </Col>
                            <Col md={10}>
                                <div style={{height: "30px"}}>
                                    <Line percent={percent(props.woodTickers[wood.ImageName].tick, props.woodTickers[wood.ImageName].resetTick)} strokeWidth="2" strokeColor="#333" />
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

const WoodTypes = [ 
    "Oak", "Ash", "Ebony", "Willow"
];

export default connect(mapStateToProps, mapDispatchToProps)(Woodcutting);