import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Header from "./Components/Header";
import Home from "./Components/Home";
import Info from "./Components/Info";
import Explore from "./Components/Explore";
import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import Status from "./Components/Status";
import Mining from "./Components/Mining";
import Housing from "./Components/Housing";
import Woodcutting from "./Components/Woodcutting";
import { Container, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { ResetTimer, TickTimer, UpdateActivityTickers } from "./Actions/Actions";
import "./styles/base.scss";

const mapStateToProps = (state) => {
    return { 
        globalTicker: state.globalTicker,
        activityTickers: state.activityTickers
    }
}

const mapDispatchToProps = {
    TickTimer,
    ResetTimer,
    UpdateActivityTickers
}

const App = (props) => {
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
                                <Route path="/Housing" render={(params) => <Housing routeParams={params} />}/>
                                <Route path="/Woodcutting" render={(params) => <Woodcutting routeParams={params} />}/>
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