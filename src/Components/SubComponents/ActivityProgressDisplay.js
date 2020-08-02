import React from "react";
import { connect } from "react-redux";
import { Row, Col, Container } from "react-bootstrap";
import "../../styles/activityprogressdisplay.scss"
import { Line } from "rc-progress";

const mapStateToProps = (state) => {
    return {
        activity: state.GlobalState.activity,
        tick: state.GlobalState.activityTick,
        resetTick: state.GlobalState.activityReset,
        details: state.GlobalState.activityDetails
    }
}

const percent = (value, total) => (value / total) * 100;

export const ActivityProgressDisplay = ({tick, resetTick, activity, details}) => {
    return(
        <Container className={"activity-progress-display my-4"}>
            <Row className={"activity-item"}>
                <Col>
                    Current Activity:
                </Col>
            </Row>
            <Row className={"activity-item"}>
                <Col className={"align-middle"}>
                    {activity}
                </Col>
            </Row>
            <Row className={"activity-item"}>
                <Col>
                    {details}
                </Col>
            </Row>
            <Row className={"activity-item"}>
                <Col>
                    <Line percent={percent(tick, resetTick)} trailWidth="5" strokeWidth="5" strokeLinecap="round" strokeColor="#3b6978" />
                </Col>
            </Row>
        </Container>
    );
}

export default connect(mapStateToProps, null)(ActivityProgressDisplay);