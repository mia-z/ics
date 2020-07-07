import React from 'react';
import { connect } from "react-redux";
import { UpdateActivityTickers } from "./../Actions/GlobalStateActions";
import { Col, Row, Container, Button } from "react-bootstrap";
import { Line } from "rc-progress";
import "../styles/explore.scss";
import Timer from "../Objects/Timer";

const mapStateToProps = (state) => { 
    return { 
        globalTicker: state.GlobalState.globalTicker,
        activityTickers: state.GlobalState.activityTickers,
        exploreTicker: state.GlobalState.activityTickers.some(x => x.activity === "Explore") ? state.GlobalState.activityTickers.find(x => x.activity === "Explore") : new Timer("Explore", "None")
    }
}

const mapDispatchToProps = {
    UpdateActivityTickers
}

const Explore = (props) => {

    const HandleExploreClick = (location) => {
        if (props.exploreTicker.extra === location)
            return props.UpdateActivityTickers([...props.activityTickers.filter(t => t.activity !== "Explore")]);
                    
        if (props.exploreTicker.extra !== location || props.exploreTicker.extra !== "None") {
            let updatedState = props.activityTickers.filter(t => t.activity !== "Explore");
            switch(location) {
                case "Villages": return props.UpdateActivityTickers([...updatedState, new Timer("Explore", location, 100, true)]);
                case "Farmlands": return props.UpdateActivityTickers([...updatedState, new Timer("Explore", location, 200, true)]);
                case "Forest": return props.UpdateActivityTickers([...updatedState, new Timer("Explore", location, 350, true)]);
                case "Desert": return props.UpdateActivityTickers([...updatedState, new Timer("Explore", location, 600, true)]);
                default: return console.log("@@DEFAULT CASE HIT IN HANDLEEXPLORE, GAME WILL PROBABLY CRASH");
            }
        }
    }

    const percent = () => (props.exploreTicker.tick / props.exploreTicker.resetTick) * 100;

    return(
        <>
        <h3>Explore new areas</h3>
        <h4>Currently exploring: {props.exploreTicker.extra}</h4>
        <Container>
            <Row>
            {
                Locations.map((location, key) => (
                    <Col key={key} md={4} className="px-3 py-1">
                        <Button 
                            block 
                            variant={props.exploreTicker.extra === location ? "success" : "primary"}
                            onClick={() => HandleExploreClick(location)}
                        >{location}</Button>
                    </Col>
                ))
            }
            </Row>
            { props.exploreTicker.isRunning &&
            <div className="progress-container">
                <h5>Exploring...</h5>
                <div className="px-3">
                    <Line percent={percent()} strokeWidth="2" strokeColor="#333" />
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

