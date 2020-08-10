import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Provider } from "react-redux";
import store from "./store";
import { GameLoop } from "react-game-engine";
import { TickSystem } from "./Systems/TickSystem";
import ParallaxBg from "./Components/SubComponents/ParallaxBg";
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from "react-alert-template-basic";

const options = {
    position: positions.TOP_CENTER,
    timeout: 2500,
    offset: '10px',
    transition: transitions.FADE
}

ReactDOM.render(
    <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...options}>
            <ParallaxBg />
            <GameLoop
                onUpdate={TickSystem}
                >
                    <App />
            </GameLoop>
        </AlertProvider>
    </Provider>,
    document.getElementById('root')
);