import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { UpdateHousingGrid, SelectTile, PurchaseTile, UnselectTile, BuildHouse, AssignWorker } from "../Actions/HousingStateActions";
import { UpdateWorkers } from "../Actions/GlobalStateActions";
import { Col, Row, Container, Button, FormControl, FormLabel } from "react-bootstrap";
import TileInfoComponent from "./SubComponents/TileInfoComponent";
import TileComponent from "./SubComponents/TileComponent";
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
    PurchaseTile,
    UnselectTile,
    BuildHouse,
    AssignWorker,
    UpdateWorkers
}

export const Housing = (props) => {
    const HandleTileClick = (x, y) => {
        if (props.housing[y][x].state === "UNAVAILABLE") return;
        if (props.housing[y][x].selected) return props.UnselectTile(x, y);
        props.SelectTile(x, y);
    }

    const PurchaseTile = (x, y) => {
        console.log("purchasing");
        props.PurchaseTile(x, y);
    }

    const BuildHouse = (x, y) => {
        console.log("building house");
        props.BuildHouse();
    }

    const AssignWorker = () => {
        console.log("assigning worker to house in plot");
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
                                <TileComponent coords={{x: col.x, y: col.y}} click={HandleTileClick}  selected={col.selected} state={col.state} />
                            </div>
                        ))}
                    </div>
                ))}
            </Col>
        </Row>
        <TileInfoComponent tileInfo={props.selectedTile} purchaseThisTile={PurchaseTile} buildHouseOnTile={BuildHouse} assignWorkerToTile={AssignWorker}/>
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Housing);