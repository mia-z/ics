import React from "react";
import {Col, Row, Button, Container} from "react-bootstrap";
import { TileStates } from "../../Objects/Tile"
import Timer from "../../Objects/Timer";
import { UpdateActivityTickers } from "../../Actions/GlobalStateActions";
import { connect } from "react-redux";
import { Line } from "rc-progress";

const mapStateToProps = (state) => {
    return {
        activityTickers: state.GlobalState.activityTickers,
        thisTicker: state.GlobalState.activityTickers.find(t => t.extra === `${state.HousingState.selectedTileCoords.x}-${state.HousingState.selectedTileCoords.y}`)
    }
}

const mapDispatchToProps = {
    UpdateActivityTickers
}

export const TileInfoComponent = (props) => {

    const HandleExploreClick = (location) => {
        if (props.thisTicker)
            return props.UpdateActivityTickers([...props.activityTickers.filter(t => t.extra !== `${props.tileInfo.x}-${props.tileInfo.y}`)]);

        let updatedState = props.activityTickers.filter(t => t.extra !== `${props.tileInfo.x}-${props.tileInfo.y}`);
        switch(location) {
            case "Grassland": return props.UpdateActivityTickers([...updatedState, new Timer(`Explore`, `${props.tileInfo.x}-${props.tileInfo.y}`, 100, true, () => props.exploreThisTile(props.tileInfo.x, props.tileInfo.y))]);
            case "Woodland": return props.UpdateActivityTickers([...updatedState, new Timer(`Explore`, `${props.tileInfo.x}-${props.tileInfo.y}`, 200, true, () => props.exploreThisTile(props.tileInfo.x, props.tileInfo.y))]);
            case "Tundra": return props.UpdateActivityTickers([...updatedState, new Timer(`Explore`, `${props.tileInfo.x}-${props.tileInfo.y}`, 350, true, () => props.exploreThisTile(props.tileInfo.x, props.tileInfo.y))]);
            case "Desert": return props.UpdateActivityTickers([...updatedState, new Timer(`Explore`, `${props.tileInfo.x}-${props.tileInfo.y}`, 600, true, () => props.exploreThisTile(props.tileInfo.x, props.tileInfo.y))]);
            case "Celestial": return props.UpdateActivityTickers([...updatedState, new Timer(`Explore`, `${props.tileInfo.x}-${props.tileInfo.y}`, 1200, true, () => props.exploreThisTile(props.tileInfo.x, props.tileInfo.y))]);
            default: return console.log("@@DEFAULT CASE HIT IN HANDLEEXPLORE, GAME WILL PROBABLY CRASH");
        }
    }

    const percent = (current, max) => (current / max) * 100;

    if (props.tileInfo) {
        switch (props.tileInfo.state) {
            case TileStates.UNEXPLORED:
                return (
                    <div>
                        <Row>
                            <Col>
                                <h4>{props.tileInfo.state} - {props.tileInfo.biome}</h4>
                            </Col>
                        </Row>
                        <Container>
                            <Row className="justify-content-center">
                                <Col md={4} className="px-3 py-1">
                                    <Button
                                        block
                                        variant={props.thisTicker ? "danger" : "primary"}
                                        onClick={() => HandleExploreClick(props.tileInfo.biome)}
                                    >{props.thisTicker ? "Cancel" : "Start Exploring"}</Button>
                                </Col>
                            </Row>
                            { props.thisTicker &&
                            <div className="progress-container">
                                <h5>Exploring...</h5>
                                <div className="px-3">
                                    <Line percent={percent(props.thisTicker.tick, props.thisTicker.resetTick)} strokeWidth="2" strokeColor="#333" />
                                </div>
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
                                <h4>{props.tileInfo.state}</h4>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col md={3}>
                                <Button
                                    onClick={() => props.controlThisTile(props.tileInfo.x, props.tileInfo.y)}
                                    block>
                                    Control
                                </Button>
                            </Col>
                        </Row>
                    </div>
                );

            case TileStates.CONTROLLED:
                return (
                    <>
                        <Row className="justify-content-center">
                            <Col md={8}>
                                <h4>Biome: <span>{props.tileInfo.biome}</span></h4>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col>
                                <h4 style={{textAlign: "right"}}>Houses: <span>{props.tileInfo.houses}/{props.tileInfo.maxPlots}</span></h4>
                            </Col>
                            <Col>
                                <Button disabled={props.tileInfo.canBuild() ? "" : true} onClick={() => props.buildHouseOnTile()}>Build house</Button>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col>
                                <h4 style={{textAlign: "right"}}>Space for workers: <span>{props.tileInfo.availableLivingSpots}/{props.tileInfo.houses * 5}</span></h4>
                            </Col>
                            <Col>
                                <Button disabled={props.tileInfo.canAssignWorker() ? "" : true} onClick={() => props.assignWorkerToTile()}>Assign worker here</Button>
                            </Col>
                        </Row>
                    </>
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