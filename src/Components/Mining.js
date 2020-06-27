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

    const [tickers, setTickers] = useState({
        "availableWorkers": 5,
        "Coal": new Timer("Mining", "Coal"),
        "Copper": new Timer("Mining", "Copper"),
        "Tin": new Timer("Mining", "Tin"),
        "Iron": new Timer("Mining", "Iron"),
        "Silver": new Timer("Mining", "Silver"),
        "Gold": new Timer("Mining", "Gold")
    });

    useEffect(() => {
        console.log("ticked in this one lol");
        if (activityTickers.some(item => item.activity === "Mining")) {
            let activeMinersInBackground = props.activityTickers.filter(item => {
                if (item.activity === "Mining") 
                    return item;
            });
            
            let updatedLocalContext = tickers;

            if (activeMinersInBackground.some(ticker => ticker.extra === "Coal"))
                updatedLocalContext = {...updatedLocalContext, "Coal": { ...activeMinersInBackground.find(name => name.extra === "Coal")}};

            if (activeMinersInBackground.some(ticker => ticker.extra === "Copper"))
                updatedLocalContext = {...updatedLocalContext, "Copper": { ...activeMinersInBackground.find(name => name.extra === "Copper")}};

            if (activeMinersInBackground.some(ticker => ticker.extra === "Tin"))
                updatedLocalContext = {...updatedLocalContext, "Tin": { ...activeMinersInBackground.find(name => name.extra === "Tin")}};

            if (activeMinersInBackground.some(ticker => ticker.extra === "Iron"))
                updatedLocalContext = {...updatedLocalContext, "CopIronper": { ...activeMinersInBackground.find(name => name.extra === "Iron")}};

            if (activeMinersInBackground.some(ticker => ticker.extra === "Silver"))
                updatedLocalContext = {...updatedLocalContext, "Silver": { ...activeMinersInBackground.find(name => name.extra === "Silver")}};

            if (activeMinersInBackground.some(ticker => ticker.extra === "Gold"))
                updatedLocalContext = {...updatedLocalContext, "Gold": { ...activeMinersInBackground.find(name => name.extra === "Gold")}};

            setTickers({...updatedLocalContext});

        }
    }, [activityTickers])

    useEffect(() => {
        let activeMiners = [];

        if (tickers["Coal"].activeWorkers > 0) { 
            activeMiners.push(tickers.Coal);
        }

        if (tickers["Copper"].activeWorkers > 0) { 
            activeMiners.push(tickers.Copper);
        }

        if (tickers["Tin"].activeWorkers > 0) { 
            activeMiners.push(tickers.Tin);
        }

        if (tickers["Iron"].activeWorkers > 0) { 
            activeMiners.push(tickers.Iron);
        }

        if (tickers["Silver"].activeWorkers > 0) { 
            activeMiners.push(tickers.Silver);
        }

        if (tickers["Gold"].activeWorkers > 0) { 
            activeMiners.push(tickers.Gold);
        }

        let removedOldMiners = activityTickers.filter(ticker => ticker.activity !== "Mining");
        props.UpdateActivityTickers([...removedOldMiners, ...activeMiners])

    }, [tickers]);

    const HandleMinusClick = (ore) => {
        switch(ore) {
            case "Coal": return setTickers({...tickers, availableWorkers: tickers.availableWorkers + 1, ore: {...tickers[ore], activeWorkers: tickers[ore].activeWorkers -= 1}});
            case "Copper": return setTickers({...tickers, availableWorkers: tickers.availableWorkers + 1, ore: {...tickers[ore], activeWorkers: tickers[ore].activeWorkers -= 1}});
            case "Tin": return setTickers({...tickers, availableWorkers: tickers.availableWorkers + 1, ore: {...tickers[ore], activeWorkers: tickers[ore].activeWorkers -= 1}});
            case "Iron": return setTickers({...tickers, availableWorkers: tickers.availableWorkers + 1, ore: {...tickers[ore], activeWorkers: tickers[ore].activeWorkers -= 1}});
            case "Silver": return setTickers({...tickers, availableWorkers: tickers.availableWorkers + 1, ore: {...tickers[ore], activeWorkers: tickers[ore].activeWorkers -= 1}});
            case "Gold": return setTickers({...tickers, availableWorkers: tickers.availableWorkers + 1, ore: {...tickers[ore], activeWorkers: tickers[ore].activeWorkers -= 1}});
            default: console.log("THIS SHOULDNT HAPPEN REEEE"); return null;
        }
    }

    const HandlePlusClick = (ore) => {
        switch(ore) {
            case "Coal": return setTickers({...tickers, availableWorkers: tickers.availableWorkers - 1, ore: {...tickers[ore], activeWorkers: tickers[ore].activeWorkers += 1}});
            case "Copper": return setTickers({...tickers, availableWorkers: tickers.availableWorkers - 1, ore: {...tickers[ore], activeWorkers: tickers[ore].activeWorkers += 1}});
            case "Tin": return setTickers({...tickers, availableWorkers: tickers.availableWorkers - 1, ore: {...tickers[ore], activeWorkers: tickers[ore].activeWorkers += 1}});
            case "Iron": return setTickers({...tickers, availableWorkers: tickers.availableWorkers - 1, ore: {...tickers[ore], activeWorkers: tickers[ore].activeWorkers += 1}});
            case "Silver": return setTickers({...tickers, availableWorkers: tickers.availableWorkers - 1, ore: {...tickers[ore], activeWorkers: tickers[ore].activeWorkers += 1}});
            case "Gold": return setTickers({...tickers, availableWorkers: tickers.availableWorkers - 1, ore: {...tickers[ore], activeWorkers: tickers[ore].activeWorkers += 1}});
            default: console.log("THIS SHOULDNT HAPPEN REEEE"); return null;
        }
    }

    return(
        <Container fluid>
            <Row>
                <Col>
                    <h3>Available Miners: {tickers.availableWorkers}</h3>
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
                                    <Button variant="danger" disabled={tickers.availableWorkers < 1 && tickers[ore.ImageName].activeWorkers > 1 ? "" : true ? tickers.availableWorkers < 1 ? true : tickers[ore.ImageName].activeWorkers < 1 ? true : "" : "" } onClick={() => HandleMinusClick(ore.ImageName)}>Remove</Button>
                                    <Button variant="success" disabled={tickers.availableWorkers < 1 ? true : "" } onClick={() => HandlePlusClick(ore.ImageName)}>Add</Button>
                                </ButtonGroup>
                            </Col>
                            <Col md={12}>
                                <p>Current workers: {tickers[ore.ImageName].activeWorkers}</p>
                            </Col>
                            <Col md={10}>
                                <div style={{height: "30px"}}>
                                    <Line percent={tickers[ore.ImageName].tick} strokeWidth="2" strokeColor="brown"/>
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