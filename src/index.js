import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Provider } from "react-redux";
import store from "./store";
import { GameEngine } from "react-game-engine";
import { TickSystem } from "./Systems/TickSystem";
import ParallaxBg from "./Components/SubComponents/ParallaxBg";

ReactDOM.render(
    <Provider store={store}>
        <ParallaxBg />
        <GameEngine
            systems={[TickSystem]}
            >
                <App />
        </GameEngine>
    </Provider>,
    document.getElementById('root')
);