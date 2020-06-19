import React, { useState, useEffect } from 'react';
import "../styles/mining.scss";
import { connect } from "react-redux";
import { UpdateActivityTickers } from "./../Actions/Actions";
import { Container, Row, Col, ButtonGroup, Button } from "react-bootstrap";
import { Line } from "rc-progress";
import { GetImages } from "../ImageRepo";
import Timer from "../Objects/Timer";

const mapStateToProps = (...state) => { 
    return { 
        globalTicker: state[0].globalTicker,
        activityTickers: state[0].activityTickers
    }
}

const mapDispatchToProps = {
    UpdateActivityTickers,
}

export const Mining = (props) => {
    const images = GetImages(OreTypes);

    const [activityTickers] = useState(props.activityTickers);

    const [coalTicker, setCoalTicker] = useState(new Timer("Mining", "Coal"));
    const [copperTicker, setCopperTicker] = useState(new Timer("Mining", "Copper"));
    const [tinTicker, setTinTicker] = useState(new Timer("Mining", "Tin"));
    const [ironTicker, setIronTicker] = useState(new Timer("Mining", "Iron"));
    const [silverTicker, setSilverTicker] = useState(new Timer("Mining", "Silver"));
    const [goldTicker, setGoldTicker] = useState(new Timer("Mining", "Gold"));

    const [ores, setOres] = useState([
        {...coalTicker},
        {...copperTicker},
        {...tinTicker},
        {...ironTicker},
        {...silverTicker},
        {...goldTicker}
    ]);

    const [availableWorkers, setAvailableWorkers] = useState(5);

    useEffect(() => {
        if (activityTickers.some(item => item.activity === "Mining")) {
            console.log(activityTickers);
            activityTickers.map(ticker => {
                if (ticker.activeWorkers > 0) {
                    switch(ticker.extra) {
                        case "Coal": setCoalTicker({...ticker}); break;
                        case "Copper": setCopperTicker({...ticker}); break;
                        case "Tin": setTinTicker({...ticker}); break;
                        case "Iron": setIronTicker({...ticker}); break;
                        case "Silver": setSilverTicker({...ticker}); break;
                        case "Gold": setGoldTicker({...ticker}); break;
                        default: console.log("This item isnt a mining item"); return;
                    }
                }
            });
        }
    }, [activityTickers])

    useEffect(() => {
        if (coalTicker.activeWorkers < 1) {
            let updatedActs = props.activityTickers.filter(item => item.extra !== "Coal");
            props.UpdateActivityTickers(updatedActs);
        } else { 
            let oldActs = props.activityTickers.filter(item => item.extra !== "Coal");
            props.UpdateActivityTickers([...oldActs, coalTicker]);
        }
    }, [coalTicker]);

    useEffect(() => {
        if (copperTicker.activeWorkers < 1) {
            let updatedActs = props.activityTickers.filter(item => item.extra !== "Copper");
            props.UpdateActivityTickers(updatedActs);
        } else {
            let oldActs = props.activityTickers.filter(item => item.extra !== "Copper");
            props.UpdateActivityTickers([...oldActs, copperTicker]);
        }
    }, [copperTicker]);

    useEffect(() => {
        if (tinTicker.activeWorkers < 1) {
            let updatedActs = props.activityTickers.filter(item => item.extra !== "Tin");
            props.UpdateActivityTickers(updatedActs);
        } else {
            let oldActs = props.activityTickers.filter(item => item.extra !== "Tin");
            props.UpdateActivityTickers([...oldActs, tinTicker]);
        }
    }, [tinTicker]);

    useEffect(() => {
        if (ironTicker.activeWorkers < 1) {
            let updatedActs = props.activityTickers.filter(item => item.extra !== "Iron");
            props.UpdateActivityTickers(updatedActs);
        } else {
            let oldActs = props.activityTickers.filter(item => item.extra !== "Iron");
            props.UpdateActivityTickers([...oldActs, ironTicker]);
        }
    }, [ironTicker]);

    useEffect(() => {
        if (silverTicker.activeWorkers < 1) {
            let updatedActs = props.activityTickers.filter(item => item.extra !== "Silver");
            props.UpdateActivityTickers(updatedActs);
        } else {
            let oldActs = props.activityTickers.filter(item => item.extra !== "Silver");
            props.UpdateActivityTickers([...oldActs, silverTicker]);
        }
    }, [silverTicker]);

    useEffect(() => {
        if (goldTicker.activeWorkers < 1) {
            let updatedActs = props.activityTickers.filter(item => item.extra !== "Gold");
            props.UpdateActivityTickers(updatedActs);
        } else {
            let oldActs = props.activityTickers.filter(item => item.extra !== "Gold");
            props.UpdateActivityTickers([...oldActs, goldTicker]);
        }
    }, [goldTicker]);

    useEffect(() => {
        setOres([
            {...coalTicker},
            {...copperTicker},
            {...tinTicker},
            {...ironTicker},
            {...silverTicker},
            {...goldTicker}
        ]);
        console.log(coalTicker);
    }, [coalTicker, copperTicker, tinTicker, ironTicker, silverTicker, goldTicker, props.activityTickers])

    const HandleMinusClick = (ore) => {
        setAvailableWorkers(availableWorkers + 1);
        switch(ore) {
            case "Coal": return setCoalTicker({...coalTicker, activeWorkers: coalTicker.activeWorkers -= 1});
            case "Copper": return setCopperTicker({...copperTicker, activeWorkers: copperTicker.activeWorkers -= 1});
            case "Tin": return setTinTicker({...tinTicker, activeWorkers: tinTicker.activeWorkers -= 1});
            case "Iron": return setIronTicker({...ironTicker, activeWorkers: ironTicker.activeWorkers -= 1});
            case "Silver": return setSilverTicker({...silverTicker, activeWorkers: silverTicker.activeWorkers -= 1});
            case "Gold": return setGoldTicker({...goldTicker, activeWorkers: goldTicker.activeWorkers -= 1});
            default: console.log("THIS SHOULDNT HAPPEN REEEE"); return null;
        }
    }

    const HandlePlusClick = (ore) => {
        setAvailableWorkers(availableWorkers - 1);
        switch(ore) {
            case "Coal": return setCoalTicker({...coalTicker, activeWorkers: coalTicker.activeWorkers += 1});
            case "Copper": return setCopperTicker({...copperTicker, activeWorkers: copperTicker.activeWorkers += 1});
            case "Tin": return setTinTicker({...tinTicker, activeWorkers: tinTicker.activeWorkers += 1});
            case "Iron": return setIronTicker({...ironTicker, activeWorkers: ironTicker.activeWorkers += 1});
            case "Silver": return setSilverTicker({...silverTicker, activeWorkers: silverTicker.activeWorkers += 1});
            case "Gold": return setGoldTicker({...goldTicker, activeWorkers: goldTicker.activeWorkers += 1});
            default: console.log("THIS SHOULDNT HAPPEN REEEE"); return null;
        }
    }

    return(
        <Container fluid>
            <Row>
                <Col>
                    <h3>Available Miners: {availableWorkers}</h3>
                </Col>
            </Row>
            <Row>
            {images.map((ore, key) => (
                <Col key={key} md={4}>
                    <div className="card">
                        <Row className="justify-content-center">
                            <Col md={12}>
                                <h5>
                                    {ore.ImageName}
                                </h5>
                            </Col>
                            <Col md={12}>
                                <img src={ore.ImageUrl} alt={ore.ImageName} />
                            </Col>
                            <Col md={12}>
                                <ButtonGroup className="w-100 px-2 pb-2">
                                    <Button variant="danger" disabled={availableWorkers < 1 && ores.find(x => x.extra === ore.ImageName).activeWorkers > 1 ? "" : true ? availableWorkers < 1 ? true : ores.find(x => x.extra === ore.ImageName).activeWorkers < 1 ? true : "" : "" } onClick={() => HandleMinusClick(ore.ImageName)}>Remove</Button>
                                    <Button variant="success" disabled={availableWorkers < 1 ? true : "" } onClick={() => HandlePlusClick(ore.ImageName)}>Add</Button>
                                </ButtonGroup>
                            </Col>
                            <Col md={12}>
                                <p>Current workers: {ores.find(x => x.extra === ore.ImageName).activeWorkers}</p>
                            </Col>
                            <Col md={10}>
                                <div style={{height: "30px"}}>
                                    <Line percent={ores.find(x => x.extra === ore.ImageName).tick} strokeWidth="2" strokeColor="brown"/>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>                
            ))}
            </Row>
        </Container>
    );
}

const OreTypes = [
    "Coal", "Copper", "Tin", "Iron", "Silver", "Gold"
];

export default connect(mapStateToProps, mapDispatchToProps)(Mining);