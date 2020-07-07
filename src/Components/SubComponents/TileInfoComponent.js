import React from "react";
import { Col, Row, Button } from "react-bootstrap";

export const TileInfoComponent = (props) => {
    if (props.tileInfo) {
        switch (props.tileInfo.state) {
            case "UNPURCHASED":
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
                                    onClick={() => props.purchaseThisTile(props.tileInfo.x, props.tileInfo.y)}
                                    block>
                                    Purchase tile
                                </Button>
                            </Col>
                        </Row>
                    </div>
                );

            case "PURCHASED":
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

export default TileInfoComponent;