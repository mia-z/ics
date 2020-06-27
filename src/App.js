import React, { useState } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Header from "./Components/Header";
import Home from "./Components/Home";
import Info from "./Components/Info";
import Explore from "./Components/Explore";
import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import Status from "./Components/Status";
import Mining from "./Components/Mining";
import { Container, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { ExploreLocation , ChangeActivity, ToggleTimer, AssignTimerId, ResetTimer, TickTimer, UpdateActivityTickers } from "./Actions/Actions";
import useInterval from "./Hooks/useTimeout";
import { RewardBroker } from "./RewardBroker";
import "./styles/base.scss";

const mapStateToProps = (state) => {
    return { 
        globalTicker: state.globalTicker,
        activityTickers: state.activityTickers
    }
}

const mapDispatchToProps = {
    ChangeActivity,
    ExploreLocation,
    ToggleTimer,
    AssignTimerId,
    TickTimer,
    ResetTimer,
    UpdateActivityTickers
}

const App = (props) => {
    useInterval(() => {
        console.log(props.activityTickers);
        if (props.activityTickers.length !== 0) {
            props.TickTimer();
            let tickActs = props.activityTickers.filter(timer => {
                let newActState;
                if (timer.tick >= timer.resetTick) {
                    console.log(timer.extra);
                    RewardBroker(timer.activity, { modifiers: { ...timer } });
                    return newActState = {...timer, tick: timer.tick = 0};
                } else newActState = {...timer, tick: timer.tick += 1 }
                return newActState;
            }); 
            props.UpdateActivityTickers(tickActs);
            console.log("ticking in main");
            if (props.globalTicker.tick >= 100) {
                props.ResetTimer();
                console.log("completed this round of tick", props.activityTickers);
            }
        }
    }, 600);

    return (
        <HashRouter>
            <Container>
                <Row className="stretch" noGutters>
                    <Col md={3} className="left-column"> {/*LEFT COLUMN*/}
                        <Row id="banner" className="no-gutters">
                            <Col>
                                <Banner /> {/*BANNER SECTION*/}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                 <Status /> {/*STATUS SECTION*/}
                            </Col>
                        </Row>
                        <Row className="h-75">
                            <Col>
                                <Route exact path="*" render={(params) => <Navbar routeParams={params}/>}/> {/*NAVBAR COLUMN*/}
                            </Col>
                        </Row>
                    </Col>
                    <Col md={9} className="right-column"> {/*RIGHT COLUMN*/}
                        <Row> {/*TOP HEADER ROW*/}
                            <Col>
                                <Header /> 
                            </Col>
                        </Row>
                        <Row> {/*CONTENT ROW*/}
                            <Col>
                                <Route exact path="/" component={Home} />
                                <Route path="/Home" component={Home} />
                                <Route path="/Info" component={Info} />
                                <Route path="/Mining" render={(params) => <Mining routeParams={params} />}/>
                                <Route path="/Explore" render={(params) => <Explore routeParams={params} />}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </HashRouter>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);