import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import Info from "./Components/Info";
import Explore from "./Components/Explore";
import Counter from "./Components/Counter";

const App = () => {
    return (
        <HashRouter>
            <Header />
            <Counter />
            <div class="content">
                <Route exact path="/" component={Home}/>
                <Route path="/Info" component={Info}/>
                <Route path="/Explore" component={Explore}/>
            </div>
            <Footer />
        </HashRouter>
    );
}

export default App;