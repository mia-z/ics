import React from 'react';
import "../styles/mining.scss";
import {batch, connect} from "react-redux";
import { SetActivity, SetActivityParams, StopActivityTimer, SetActivityThreshold, StartActivityTimer, ResetActivityTimer } from "../Actions/GlobalStateActions";
import { Container, Row, Col, Button } from "react-bootstrap";
import { GetImages } from "../ImageRepo";

const mapStateToProps = (state) => { 
    return { 
        activityTimer: state.GlobalState.activityTimer,
    }
}

const mapDispatchToProps = {
    SetActivity,
    SetActivityParams,
    StopActivityTimer,
    StartActivityTimer,
    SetActivityThreshold,
    ResetActivityTimer
}

export const Mining = (props) => {
    console.log(props.activityTimer);

    const images = GetImages(OreTypes);

    const HandleClick = (ore) => {
        if (props.activityTimer.extra === ore && props.activityTimer.activity === "Mining") {
            props.StopActivityTimer();
            return;
        }
        batch(() => {
            props.SetActivity("Mining");
            props.ResetActivityTimer();
            props.SetActivityParams(ore);
            props.StartActivityTimer();
            //SET THRESHOLD
        });
    }

    return(
        <Container fluid>
            <Row>
            {images.map((ore, key) => (
                <Col key={key} md={4}>
                    <div className="card mining">
                        <Row className="justify-content-center mb-3">
                            <Col md={12}>
                                <h5>
                                    {ore.ImageName}
                                </h5>
                            </Col>
                            <Col md={12}>
                                <img src={ore.ImageUrl} alt={ore.ImageName} />
                            </Col>
                            <Col md={10}>
                                <Button
                                    className="w-100 px-2 pb-2"
                                    variant={props.activityTimer.extra === ore.ImageName ? "danger" : "primary"}
                                    onClick={() => HandleClick(ore.ImageName)}>
                                    {props.activityTimer.extra === ore.ImageName ? "Stop Mining" : "Mining"}
                                </Button>
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