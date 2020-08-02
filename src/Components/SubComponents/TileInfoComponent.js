import React from "react";
import store from "./../../store";
import { batch } from "react-redux";
import { Col, Row, Button, Container } from "react-bootstrap";
import { TileStates } from "../../Objects/Tile"
import { ResetActivityTimer, SetActivity, SetActivityParams, SetActivityThreshold, StartActivityTimer, StopActivityTimer, SetActivityDelegate, SetActivityDetails, } from "../../Actions/GlobalStateActions";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
        activity: state.GlobalState.activity,
        isRunning: state.GlobalState.activityIsRunning,
        params: state.GlobalState.activityParameters
    }
}

const mapDispatchToProps = {
    SetActivity,
    SetActivityParams,
    StopActivityTimer,
    StartActivityTimer,
    SetActivityThreshold,
    ResetActivityTimer,
    SetActivityDelegate,
    SetActivityDetails,
}

export const TileInfoComponent = ({activity, isRunning, params, tileInfo, SetActivity, SetActivityParams, StartActivityTimer, SetActivityThreshold, SetActivityDelegate, SetActivityDetails, ResetActivityTimer, StopActivityTimer}) => {
    const IsExploringThisTile = () => {
        return params && params.x === tileInfo.x && params.y === tileInfo.y;
    }

    const HandleExploreClick = (location) => {
        if (IsExploringThisTile()) {
            return StopActivityTimer();
        }

        switch(location) {
            case "Grassland": return updateTimer(`Exploring`, {x: tileInfo.x, y: tileInfo.y}, 100, location);
            case "Woodland": return updateTimer(`Exploring`, {x: tileInfo.x, y: tileInfo.y}, 200, location);
            case "Tundra": return updateTimer(`Exploring`, {x: tileInfo.x, y: tileInfo.y}, 350, location);
            case "Desert": return updateTimer(`Exploring`, {x: tileInfo.x, y: tileInfo.y}, 600, location);
            case "Celestial": return updateTimer(`Exploring`, {x: tileInfo.x, y: tileInfo.y}, 1200, location);
            default: return console.log("@@DEFAULT CASE HIT IN HANDLEEXPLORE, GAME WILL PROBABLY CRASH");
        }
    }

    const updateTimer = (activity, extra, reset, details) => {
        batch(() => {
            ResetActivityTimer();
            SetActivity(activity);
            SetActivityParams(extra);
            SetActivityThreshold(reset);
            SetActivityDetails(`${details} @ (${tileInfo.x}, ${tileInfo.y})`);
            SetActivityDelegate(() => store.dispatch(SetActivityDetails(`Idle`))); //TODO: Do I need this?
            StartActivityTimer();
        });
    }

    if (tileInfo) {
        switch (tileInfo.state) {
            case TileStates.UNEXPLORED:
                return (
                    <div>
                        <Row>
                            <Col>
                                <h4 className="text-center">{tileInfo.state} - {tileInfo.biome}</h4>
                            </Col>
                        </Row>
                        <Container>
                            <Row className="justify-content-center">
                                <Col md={4} className="px-3 py-1">
                                    <Button
                                        block
                                        disabled={activity === "Exploring" && isRunning && !IsExploringThisTile()}
                                        variant={activity === "Exploring" && isRunning && IsExploringThisTile() ? "danger" : "primary"}
                                        onClick={() => HandleExploreClick(tileInfo.biome)}
                                    >{activity === "Exploring" && isRunning && IsExploringThisTile() ? "Cancel" : "Start Exploring"}</Button>
                                </Col>
                            </Row>
                            { activity === "Exploring" && isRunning && IsExploringThisTile() &&
                            <div className="progress-container">
                                <h5>Exploring...</h5>
                            </div>
                            }
                        </Container>
                    </div>
                );

            case TileStates.EXPLORED:
                return (
                    <div>
                        <Row>
                            <Col>
                                <h4>{tileInfo.state}</h4>
                            </Col>
                        </Row>
                    </div>
                );
            default:
                return("you shouldnt EVER see this, im satisfying the ESLint");
        }
    } else
        return (
            <div>
                <Row>
                    <Col>
                        <h4>Select a tile to see more info</h4>
                    </Col>
                </Row>
            </div>
        );
}

export default connect(mapStateToProps, mapDispatchToProps)(TileInfoComponent);

/*
Grassland
Woodland
Tundra
Desert
Celestial
*/