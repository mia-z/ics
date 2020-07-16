import React from 'react';
import { connect } from "react-redux";
import { UpdateGrid, SelectTile, ExploreTile, ControlTile, UnselectTile, BuildHouse, AssignWorker } from "../Actions/ExplorationStateActions";
import { UpdateWorkers } from "../Actions/GlobalStateActions";
import { Col, Row } from "react-bootstrap";
import TileInfoComponent from "./SubComponents/TileInfoComponent";
import TileComponent from "./SubComponents/TileComponent";
import { TileStates } from "../Objects/Tile"
import "../styles/exploration.scss";

const mapStateToProps = (state) => { 
    return { 
        exploration: state.ExplorationState.explorationState,
        prevCoords: state.ExplorationState.selectedTileCoords,
        selectedTile: state.ExplorationState.explorationState.flat(1).find(x => x.selected) || null,
        availableWorkers: state.GlobalState.user.workers
    }
}

const mapDispatchToProps = {
    UpdateGrid,
    SelectTile,
    ExploreTile,
    ControlTile,
    UnselectTile,
    BuildHouse,
    AssignWorker,
    UpdateWorkers
}

export const Exploration = (props) => {
    const HandleTileClick = (x, y) => {
        if (props.exploration[y][x].state === TileStates.UNAVAILABLE) return;
        if (props.exploration[y][x].selected) return props.UnselectTile(x, y);
        props.SelectTile(x, y);
    }

    const ExploreTile = (x, y) => {
        console.log("exploring");
        props.ExploreTile(x, y);
    }

    const ControlTile = (x, y) => {
        console.log("controlling tile");
        props.ControlTile(x, y);
    }

    const BuildHouse = (x, y) => {
        props.BuildHouse();
    }

    const AssignWorker = () => {
        props.AssignWorker();
        props.UpdateWorkers(props.availableWorkers + 1);
    }

    console.log(props.selectedTile);
    return(
        <>
        <Row className="justify-content-center my-2 no-gutters">
            <Col md={8} className="explore-grid-container p-2">
                {props.exploration.map((row, index) => (
                    <div key={index} className="explore-grid-row">
                        {row.map((col, index) => (
                            <div key={index} className="explore-grid-col">
                                <TileComponent coords={{x: col.x, y: col.y}} click={HandleTileClick} selected={col.selected} state={col.state} />
                            </div>
                        ))}
                    </div>
                ))}
            </Col>
        </Row>
        <TileInfoComponent tileInfo={props.selectedTile} controlThisTile={ControlTile} exploreThisTile={ExploreTile} buildHouseOnTile={BuildHouse} assignWorkerToTile={AssignWorker}/>
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Exploration);