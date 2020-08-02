import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Header from "./Components/Header";
import Home from "./Components/Home";
import Stats from "./Components/Stats";
import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import Inventory from "./Components/Inventory";
import Status from "./Components/Status";
import Exploration from "./Components/Exploration";
import Gathering from "./Components/Gathering";
import ActivityProgressDisplay from "./Components/SubComponents/ActivityProgressDisplay";
import { Container, Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import "./styles/base.scss";

const App = (props) => {
    return (
        <HashRouter>
            <Container>
                <Row className="stretch" noGutters>
                    <Col md={3} className="left-column"> {/*LEFT COLUMN*/}
                        <div id="banner" className="no-gutters">
                            <Banner />
                        </div>
                        <Status />
                        <Route exact path="*" render={(params) => <Navbar routeParams={params}/>}/>
                        <ActivityProgressDisplay />
                    </Col>
                    <Col md={9} className="right-column"> {/*RIGHT COLUMN*/}
                        <Row>
                            <Col>
                                <Header />
                            </Col>
                        </Row>
                        <Row id="content-right">
                            <Col>
                                <Route exact path="/" component={Home} />
                                <Route path="/Home" component={Home} />
                                <Route path="/Stats" component={Stats} />
                                <Route path="/Inventory" render={(params) => <Inventory routeParams={params}/>}/>
                                <Route path="/Exploration" render={(params) => <Exploration routeParams={params} />}/>
                                <Route path="/Gathering" render={(params) => <Gathering routeParams={params} />}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </HashRouter>
    );
}



export default connect()(App);