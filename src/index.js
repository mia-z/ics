import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Provider } from "react-redux";
import store from "./store";
import { GameEngine } from "react-game-engine";
import { TickSystem } from "./Systems/TickSystem";

ReactDOM.render(
    <Provider store={store}>
        <GameEngine
            systems={[TickSystem]}
            >
                <App />
        </GameEngine>
    </Provider>,
    document.getElementById('root')
);