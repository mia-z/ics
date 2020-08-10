import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Header from "./Components/Header";
import Home from "./Components/Home";
import Stats from "./Components/Stats";
import Navbar from "./Components/Navbar";
import Banner from "./Components/Banner";
import Inventory from "./Components/Inventory";
import Exploration from "./Components/Exploration";
import Gathering from "./Components/Gathering";
import ActivityProgressDisplay from "./Components/SubComponents/ActivityProgressDisplay";
import { connect } from "react-redux";
import "./styles/base.scss";

const App = () => {
    return (
        <HashRouter>
            <div className={"root-container"}>
                <div className="left header">
                    <Banner />
                </div>
                <div className="right header">
                    <Header />
                </div>
                <div className="left content">
                    <Route exact path="*" render={(params) => <Navbar routeParams={params}/>}/>
                    <ActivityProgressDisplay />
                </div>
                <div className="right content">
                    <Route exact path="/" component={Home} />
                    <Route path="/Home" component={Home} />
                    <Route path="/Stats" component={Stats} />
                    <Route path="/Inventory" render={(params) => <Inventory routeParams={params}/>}/>
                    <Route path="/Exploration" render={(params) => <Exploration routeParams={params} />}/>
                    <Route path="/Gathering" render={(params) => <Gathering routeParams={params} />}/>
                </div>
            </div>
        </HashRouter>
    );
}

export default connect()(App);