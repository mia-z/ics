import React from 'react';
import { connect, batch } from "react-redux";
import { SetActivity, SetActivityParams, StopActivityTimer, SetActivityThreshold, StartActivityTimer, ResetActivityTimer } from "./../Actions/GlobalStateActions";
import { Container, Row, Col, Button } from "react-bootstrap";
import { GetImages } from "../ImageRepo";
import "../styles/woodcutting.scss";

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

export const Woodcutting = (props) => {
    console.log(props.activityTimer);

    const images = GetImages(WoodTypes);

    const HandleClick = (wood) => {
        if (props.activityTimer.extra === wood && props.activityTimer.activity === "Woodcutting") {
            props.StopActivityTimer();
            return;
        }
        batch(() => {
            props.SetActivity("Woodcutting");
            props.ResetActivityTimer();
            props.SetActivityParams(wood);
            props.StartActivityTimer();
            //SET THRESHOLD
        })
    }

    return(
        <Container fluid>
            <Row>
            {images.map((wood, key) => (
                <Col key={key} md={4}>
                    <div className="card woodcutting">
                        <Row className="justify-content-center mb-3">
                            <Col md={12}>
                                <h5>
                                    {wood.ImageName}
                                </h5>
                            </Col>
                            <Col md={12}>
                                <img src={wood.ImageUrl} alt={wood.ImageName} />
                            </Col>
                            <Col md={10}>
                                <Button
                                    className="w-100 px-2 pb-2"
                                    variant={props.activityTimer.extra === wood.ImageName ? "danger" : "primary"}
                                    onClick={() => HandleClick(wood.ImageName)}>
                                        {props.activityTimer.extra === wood.ImageName ? "Stop Chopping" : "Chop"}
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

const WoodTypes = [ 
    "Oak", "Ash", "Ebony", "Willow"
];

export default connect(mapStateToProps, mapDispatchToProps)(Woodcutting);