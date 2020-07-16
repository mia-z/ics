import React from 'react';
import { connect } from "react-redux";
import { UpdateHousingGrid, SelectTile, ExploreTile, ControlTile, UnselectTile, BuildHouse, AssignWorker } from "../Actions/HousingStateActions";
import { UpdateWorkers } from "../Actions/GlobalStateActions";
import { Col, Row } from "react-bootstrap";
import TileInfoComponent from "./SubComponents/TileInfoComponent";
import TileComponent from "./SubComponents/TileComponent";
import { TileStates } from "../Objects/Tile"
import "../styles/housing.scss";

const mapStateToProps = (state) => { 
    return { 
        housing: state.HousingState.housingState,
        prevCoords: state.HousingState.selectedTileCoords,
        selectedTile: state.HousingState.housingState.flat(1).find(x => x.selected) || null,
        availableWorkers: state.GlobalState.user.workers
    }
}

const mapDispatchToProps = {
    UpdateHousingGrid,
    SelectTile,
    ExploreTile,
    ControlTile,
    UnselectTile,
    BuildHouse,
    AssignWorker,
    UpdateWorkers
}

export const Housing = (props) => {
    const HandleTileClick = (x, y) => {
        if (props.housing[y][x].state === TileStates.UNAVAILABLE) return;
        if (props.housing[y][x].selected) return props.UnselectTile(x, y);
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
            <Col md={8} className="housing-grid-container p-2">
                {props.housing.map((row, index) => (
                    <div key={index} className="housing-grid-row">
                        {row.map((col, index) => (
                            <div key={index} className="housing-grid-col">
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

export default connect(mapStateToProps, mapDispatchToProps)(Housing);