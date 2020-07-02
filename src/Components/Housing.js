import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { UpdateHousingGrid, SelectTile, PurchaseTile, UnselectTile } from "../Actions/HousingStateActions";
import { Col, Row, Container, Button, FormControl, FormLabel } from "react-bootstrap";
import Tile, { RefreshGrid } from "../Objects/Tile";
import "../styles/housing.scss";

const mapStateToProps = (state) => { 
    return { 
        housing: state.HousingState.housingState,
        prevCoords: state.HousingState.selectedTileCoords,
        selectedTile: state.HousingState.housingState.flat(1).find(x => x.selected) || null
    }
}

const mapDispatchToProps = {
    UpdateHousingGrid,
    SelectTile,
    PurchaseTile,
    UnselectTile
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
        <TileInfoComponent tileInfo={props.selectedTile} purchaseThisTile={PurchaseTile}/>
        </>
    );
}

const TileComponent = (props) => {
    const [mouseOver, setMouseOver] = useState(false);
    const initialStyle = {
        height: "40px",
        width: "40px",
        transition: "0.1s"
    }; 
    
    const SetStyle = () => {
        if (mouseOver) {
            if (props.selected) return {...initialStyle, backgroundColor: "lightblue"};
            switch(props.state) {
                case "UNAVAILABLE": return {...initialStyle, backgroundColor: "none"};
                case "PURCHASED": return {...initialStyle, backgroundColor: "lightgreen"};
                case "UNPURCHASED": return {...initialStyle, backgroundColor: "yellow"};
                default: return {...initialStyle, backgroundColor: "whitesmoke"};
            }
        }
        if(!mouseOver) {
            if (props.selected) return {...initialStyle, backgroundColor: "blue"};
            switch(props.state) {
                case "UNAVAILABLE": return {...initialStyle, backgroundColor: "none"};
                case "PURCHASED": return {...initialStyle, backgroundColor: "green"};
                case "UNPURCHASED": return {...initialStyle, backgroundColor: "yellowgreen"};
                default: return {...initialStyle, backgroundColor: "white"};
            }
        }
    }

    return(
        <div style={SetStyle()} 
            onClick={() => props.click(props.coords.x, props.coords.y)}
            onMouseOver={() => setMouseOver(true)}
            onMouseOut={() => setMouseOver(false)}
        >

        </div>
    );
}

const TileInfoComponent = (props) => {
    if (props.tileInfo) return (
        <div>
            <Row>
                <Col>
                    <h4>{props.tileInfo.state}</h4>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col md={3}>
                    <Button disabled={props.tileInfo.state === "PURCHASED" ? true : ""} onClick={() => props.purchaseThisTile(props.tileInfo.x, props.tileInfo.y)} block>Purchase tile</Button>
                </Col>
            </Row>
        </div>
    ); else return (
        <div>
            <Row>
                <Col>
                    <h4>Select a tile to see more info</h4>
                </Col>
            </Row>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Housing);